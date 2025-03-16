
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  location: string;
}

const PageTransition = ({ children, location }: PageTransitionProps) => {
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    // Skip animation on initial render
    if (initialRender) {
      setInitialRender(false);
    }
  }, [initialRender]);

  if (initialRender) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ 
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
