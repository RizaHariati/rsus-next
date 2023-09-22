export const inpatientvariant = {
  initial: { opacity: 0, y: "100px" },
  animate: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 100,
    },
  },
};

export const inpatientvariantChildren = {
  initial: { opacity: 0, y: "40px" },

  animate: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,

      type: "spring",
      stiffness: 100,
    },
  },
};
