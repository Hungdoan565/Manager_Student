import { motion } from 'motion/react';
import React, { useState } from 'react';

const TiltedCard = ({
  icon: Icon,
  title,
  description,
  color = 'text-primary',
  delay = 0,
  rotateAmplitude = 12,
  scaleOnHover = 1.03,
  className = '',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`group bg-card p-8 rounded-2xl border border-border hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        scale: scaleOnHover,
        rotateY: rotateAmplitude,
        rotateX: rotateAmplitude * 0.5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Background Gradient Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Icon Container */}
      <motion.div
        className={`w-16 h-16 ${color} mb-6 relative z-10`}
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {Icon && <Icon className="w-full h-full" />}
        
        {/* Icon Glow Effect */}
        <motion.div
          className={`absolute inset-0 ${color.replace('text-', 'bg-')} rounded-full blur-md opacity-0`}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <motion.h3
          className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300"
          animate={{
            y: isHovered ? -2 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300"
          animate={{
            y: isHovered ? -2 : 0
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Hover Border Effect */}
      <motion.div
        className="absolute inset-0 border-2 border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Particles Effect */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              initial={{
                x: Math.random() * 300,
                y: Math.random() * 200,
                opacity: 0
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TiltedCard;
