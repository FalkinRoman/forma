/** Токены движения FORMA. 150–250 мс — микровзаимодействия, 250–400 мс — переходы карты. */
export const ease = [0.2, 0.8, 0.2, 1] as const;

export const duration = {
  fast: 0.15,
  base: 0.2,
  slow: 0.25,
  map: 0.35,
} as const;

export const spring = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease } },
};

export const stagger = (step = 0.05, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});
