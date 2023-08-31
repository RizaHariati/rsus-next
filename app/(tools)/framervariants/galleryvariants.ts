export const galleryTop = {
  initial: { opacity: 0, y: "-100%" },
  animate: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 30,
    },
  },
};

export const galleryRightVariant = {
  initial: { x: "50%" },
  animate: {
    x: "0%",
    transition: {
      duration: 0.5,
      delayChildren: 0.1,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 30,
    },
  },
};
export const galleryLeftVariant = {
  initial: { x: "-50%" },
  animate: {
    x: "0%",
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 30,
    },
  },
  exit: {
    x: "-50%",
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 30,
    },
  },
};

export const galleryBottom = {
  initial: { opacity: 0, y: "100%" },
  animate: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 1,
      staggerChildren: 0.3,
      type: "spring",
      stiffness: 30,
    },
  },
};
