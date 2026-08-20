import confetti from 'canvas-confetti';

export function fireBirthdayConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#0284c7', '#38bdf8', '#7dd3fc', '#ffffff', '#fbbf24', '#60a5fa'],
  });

  fire(0.2, {
    spread: 60,
    colors: ['#0369a1', '#0ea5e9', '#38bdf8', '#fbbf24', '#ffffff'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#1d4ed8', '#2563eb', '#60a5fa', '#93c5fd', '#38bdf8'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#1e40af', '#3b82f6', '#93c5fd', '#f59e0b'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#0284c7', '#bae6fd', '#ffffff', '#38bdf8'],
  });
}

export function fireEvilEyeBlueBurst(originX = 0.5, originY = 0.5) {
  confetti({
    particleCount: 80,
    spread: 360,
    startVelocity: 35,
    origin: { x: originX, y: originY },
    colors: ['#1e3a8a', '#1d4ed8', '#0284c7', '#38bdf8', '#bae6fd', '#ffffff', '#fbbf24'],
    shapes: ['circle', 'square'],
    scalar: 1.1,
    zIndex: 9999,
  });
}

export function fireFireworks() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#0284c7', '#38bdf8', '#60a5fa', '#ffffff', '#fbbf24'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#1d4ed8', '#38bdf8', '#bae6fd', '#e0f2fe', '#fbbf24'],
    });
  }, 250);
}
