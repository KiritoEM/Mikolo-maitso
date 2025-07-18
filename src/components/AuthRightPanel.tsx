import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AuthRightPanel: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative p-8">
      {/* Background shapes */}
      <motion.div
        className="absolute top-[-2%] right-[-9%] w-80 h-80 rounded-full bg-[#9ae14a] opacity-40"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-[50%] right-[-30%] w-80 h-80 rounded-full bg-[#9Ae14a] opacity-40"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-[75%] right-[-10%] w-80 h-40 rounded-full bg-[#9Ae14a] opacity-40"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-[75%] right-[65%] w-80 h-80 rounded-full bg-[#9Ae14a] opacity-40"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-[-15%] right-[65%] w-80 h-80 rounded-full bg-[#9Ae14a] opacity-40"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-[40%] left-[13%] w-44 h-44 rounded-full bg-[#9Ae14a] opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      {/* Avocado illustration */}
      <div className="relative w-80 h-80">
        <DotLottieReact
          src="https://lottie.host/7839a49e-4c62-4b6e-bbfe-4b81797f269d/OwXLpeiNE0.lottie"
          loop
          autoplay
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      {/* Text */}
      <div className="absolute bottom-20 left-20 right-20 text-white">
        <h2 className="text-5xl font-bold mb-3">Vos plantes optimisées</h2>
        <p className="text-xl">
          Un système intelligent qui automatise l'irrigation et la surveillance
          des plantes pour un entretien optimisé.
        </p>
      </div>
    </div>
  );
};

export default AuthRightPanel;
