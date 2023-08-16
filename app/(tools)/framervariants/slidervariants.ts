export const sliderVariants = {
  initial: (amount: number) => {
    return { opacity: 0, x: amount > 0 ? -200 : 200, z: 0 };
  },
  animate: {
    opacity: 1,
    x: 0,
    z: 10,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 30,
    },
  },
  exit: (amount: number) => {
    return {
      opacity: 0,
      x: amount > 0 ? 200 : -200,
      z: 0,
      transition: {
        duration: 0.5,
        stiffness: 30,
      },
    };
  },
};
