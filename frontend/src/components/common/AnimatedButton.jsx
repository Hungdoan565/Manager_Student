import { motion } from 'motion/react';
import React from 'react';
import { Link } from 'react-router-dom';

const AnimatedButton = ({ 
  children, 
  to, 
  variant = 'primary', 
  delay = 0,
  className = '',
  onClick
}) => {
  const baseClasses = "inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25",
    secondary: "border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-xl",
    white: "bg-white text-primary hover:bg-gray-100 hover:shadow-xl hover:shadow-white/25"
  };

  const ButtonContent = (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.button>
  );

  if (to) {
    return (
      <Link to={to}>
        {ButtonContent}
      </Link>
    );
  }

  return ButtonContent;
};

export default AnimatedButton;
