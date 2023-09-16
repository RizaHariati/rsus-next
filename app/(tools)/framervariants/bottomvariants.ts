export const popBottomVariant = {
  initial: { y: "100%", bottom: 24 },
  animate: {
    y: "0%",
    bottom: 80,
    transition: {
      duration: 0.05,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 30,
    },
  },
  exit: {
    y: "100%",
    bottom: 24,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 30,
    },
  },
};
