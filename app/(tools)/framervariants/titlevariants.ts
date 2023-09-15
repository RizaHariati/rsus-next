export const enterTitleVariants = {
  initial: { letterSpacing: "12px", opacity: 0.5 },
  animate: {
    letterSpacing: "7px",
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 30,
    },
  },
};
