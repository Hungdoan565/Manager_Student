import { motion } from 'motion/react';
import React from 'react';
import { cn } from '../../utils/cn';

const Badge = React.forwardRef(({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}, ref) => {
  // Base classes from design.json
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  // Variant classes based on design.json
  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border-border"
  };
  
  // Size variants
  const sizeClasses = {
    default: "px-2.5 py-0.5 text-xs",
    sm: "px-2 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm"
  };
  
  const badgeClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );
  
  return (
    <motion.div
      ref={ref}
      className={badgeClasses}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Badge.displayName = 'Badge';

export default Badge;
