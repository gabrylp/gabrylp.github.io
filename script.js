document.addEventListener("DOMContentLoaded", () => {

  // -- typewriter --
  const nameEl = document.querySelector(".name-block h1");
  if (nameEl) {
    const fullName = nameEl.textContent.trim();
    nameEl.textContent = "";
    let i = 0;
    const type = () => {
      if (i < fullName.length) {
        nameEl.textContent += fullName[i++];
        setTimeout(type, 70);
      }
    };
    type();
  }

  // -- tech stack --
  const quips = [
    "v*be coding", "adapt adapt adapt", "still learning tbh",
    "emerging tech", "used it once, counts", "momentum engineer",
    "peak tool", "can't live without it", "built diff"
  ];

  document.querySelectorAll(".tech-item").forEach(item => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      item.classList.remove("tech-bounce");
      void item.offsetWidth;
      item.classList.add("tech-bounce");

      const existing = item.querySelector(".tech-quip");
      if (existing) existing.remove();

      const quip = document.createElement("span");
      quip.className = "tech-quip";
      quip.textContent = quips[Math.floor(Math.random() * quips.length)];
      item.appendChild(quip);

      setTimeout(() => quip.remove(), 1400);
    });
  });

  // -- soft skills --
  document.querySelectorAll(".skills-grid li").forEach(li => {
    li.addEventListener("mouseenter", () => li.classList.add("skill-wiggle"));
    li.addEventListener("animationend", () => li.classList.remove("skill-wiggle"));
  });

  // -- achievements --
  const achievementQuips = [
    "the first time was so nice, so we had to do it twice. see you in 2027 🏆",
    "made it to usc's main web page 🔥",
    "home court advantage? nah, just built different at USC 💪",
    "secondplacerphobic🥉",
    "podium finish. we take those 🥉",
  ];

  document.querySelectorAll(".achievements-list li").forEach((li, index) => {
    li.style.cursor = "pointer";
    li.addEventListener("click", (e) => {
      spawnConfetti(e.clientX, e.clientY);

      const existing = li.querySelector(".achievement-quip");
      if (existing) existing.remove();

      const quip = document.createElement("span");
      quip.className = "achievement-quip";
      quip.textContent = achievementQuips[index] ?? "let's gooo 🎉";
      li.appendChild(quip);

      setTimeout(() => quip.remove(), 3000);
    });
  });

  // -- scroll fade-in --
  const titles = document.querySelectorAll(".section-title");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("title-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  titles.forEach(t => {
    t.classList.add("title-hidden");
    observer.observe(t);
  });

});

// -- confetti --
function spawnConfetti(x, y) {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = 9999;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const colors = ["#6c8c3a", "#a8c96e", "#f4c542", "#e87d3e", "#5ba4cf", "#c678dd"];
  const pieces = Array.from({ length: 30 }, () => ({
    x, y,
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 2.5) * 6,
    size: Math.random() * 7 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: 1,
    rot: Math.random() * Math.PI * 2,
  }));

  let frame;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25;
      p.alpha -= 0.022;
      p.rot += 0.08;
      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });
    if (alive) frame = requestAnimationFrame(draw);
    else { cancelAnimationFrame(frame); canvas.remove(); }
  };
  draw();
}
