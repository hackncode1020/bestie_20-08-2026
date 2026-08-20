import { motion } from 'motion/react';

const ICONS = ['🧿', '💙', '🩵', '🎂', '✨', '👑', '🎉', '🧿', '⭐', '🎈'];

export default function FloatingParticles() {
  const particles = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    icon: ICONS[i % ICONS.length],
    startX: (i * 7.5) % 100,
    duration: 16 + (i % 5) * 4,
    delay: (i * 1.5) % 8,
    size: 20 + (i % 4) * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: '110vh',
            x: `${p.startX}vw`,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.45, 0.45, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{ fontSize: `${p.size}px` }}
          className="absolute"
        >
          {p.icon}
        </motion.div>
      ))}
    </div>
  );
}
