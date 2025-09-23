import { motion } from 'motion/react';
import React, { useState } from 'react';

const BenefitCard = ({
  icon,
  title,
  description,
  delay = 0,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`group bg-background p-8 rounded-2xl border border-border hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-2 hover:border-primary/20 ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        scale: 1.02,
        rotateY: 5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Icon */}
      <motion.div
        className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10"
        animate={{
          rotate: isHovered ? 360 : 0
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {icon}
        
        {/* Icon Shadow */}
        <motion.div
          className="absolute inset-0 text-primary/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          {icon}
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <motion.h3
          className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300"
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 border-2 border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner Accent */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: isHovered ? 1.5 : 1,
          rotate: isHovered ? 180 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default BenefitCard;
