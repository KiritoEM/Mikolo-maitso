import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SplitLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

const SplitLayout: React.FC<SplitLayoutProps> = ({ left, right }) => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8"
      >
        <div className="w-full max-w-md">
          {left}
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex md:w-1/2 bg-primary-green relative overflow-hidden"
      >
        {right}
      </motion.div>
    </div>
  );
};

export default SplitLayout;