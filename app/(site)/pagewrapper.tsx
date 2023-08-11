"use client";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  const path = usePathname();

  return <div>{children}</div>;
};

export default PageWrapper;

//  <>
//       <AnimatePresence mode="wait">
//         {/* <motion.div key={path}> */}
//         <motion.div
//           key={path}
//           initial={{ opacity: 0, backgroundColor: "pink", x: "-100vw" }}
//           animate={{ opacity: 1, backgroundColor: "red", x: "0vw" }}s
//           exit={{ opacity: 0, backgroundColor: "black", x: "-100vw" }}
//           transition={{ duration: 2 }}
//         >
//           {children}

//           {/* </motion.div> */}
//         </motion.div>
//       </AnimatePresence>
//     </>
//   );
