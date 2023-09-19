export const enterRightVariant = {
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

export const enterRightVariantChild = {
  initial: { x: "50%", opacity: 0 },
  animate: {
    x: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};

export const enterMiddleVariant = {
  initial: { x: "50%", y: "-50%", opacity: 0 },
  animate: {
    x: "0%",
    y: "-50%",
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};

export const enterOpacity = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 30,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      stiffness: 30,
    },
  },
};

export const enterOpacityChildren = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

export const enterLeftVariant = {
  initial: { x: "-100%" },
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
    x: "-100%",
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 30,
    },
  },
};

export const enterLeftVariantChild = {
  initial: { x: "-50%", opacity: 0 },
  animate: {
    x: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};

export const enterMiddleVariantLeft = {
  initial: { x: "0", y: "-50%", opacity: 0 },
  animate: {
    x: "50%",
    y: "-50%",
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 50,
    },
  },
};

export const enterMiddleVariantLeftChildren = {
  initial: { x: "-10%", opacity: 0 },
  animate: {
    x: "0%",
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const enterTop = {
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
  exit: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 30,
    },
  },
};

export const enterTopChildren = {
  initial: { opacity: 0, y: "-100%" },
  animate: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 30,
    },
  },
};

export const enterTopChildrenCenter = {
  initial: { opacity: 0, y: "-100%", x: "50%" },
  animate: {
    opacity: 1,
    y: "0%",
    x: "50%",
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 30,
    },
  },
};
