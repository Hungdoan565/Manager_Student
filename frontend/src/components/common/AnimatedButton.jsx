import { motion } from 'motion/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AnimatedButton = ({ 
  children, 
  to, 
  variant = 'primary', 
  delay = 0,
  className = '',
  onClick
}) => {
  // Base pill layout (no overlay). On hover, padding shifts to push the label.
  const baseClasses = "relative group inline-flex items-center justify-start overflow-hidden min-h-[52px] pl-6 pr-14 hover:pl-10 hover:pr-8 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 ease-in-out";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground border-2 border-transparent shadow-md hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    secondary: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  };

  const rightIconColor =
    variant === 'secondary'
      ? 'text-primary group-hover:text-white'
      : 'text-primary-foreground dark:group-hover:text-white';
  const leftIconColor =
    variant === 'secondary' ? 'text-white' : 'text-primary-foreground dark:group-hover:text-white';
  const textHoverClass = variant === 'secondary' ? 'group-hover:text-white' : 'dark:group-hover:text-white';

  const content = (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Right arrow slides out */}
      <span className="absolute right-0 pr-5 duration-200 ease-out group-hover:translate-x-12">
        <ArrowRight className={`w-5 h-5 ${rightIconColor}`} />
      </span>

      {/* Left arrow slides in */}
      <span className="absolute left-0 pl-3 -translate-x-12 duration-200 ease-out group-hover:translate-x-0">
        <ArrowRight className={`w-5 h-5 ${leftIconColor}`} />
      </span>

      {/* Label (will shift due to padding change) */}
      <span className={`relative w-full text-left transition-colors duration-200 ease-in-out ${textHoverClass}`}>{children}</span>
    </motion.button>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return content;
};

export default AnimatedButton;
