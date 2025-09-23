import { motion } from 'motion/react';
import React from 'react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  // Base classes
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";
  
  // Variant classes based on design.json
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive",
    outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground focus:ring-ring",
    ghost: "hover:bg-accent hover:text-accent-foreground focus:ring-ring",
    link: "text-primary underline-offset-4 hover:underline focus:ring-ring"
  };
  
  // Size classes based on design.json
  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm", 
    lg: "h-11 px-8 text-base",
    icon: "h-10 w-10 p-0"
  };
  
  // Loading spinner component
  const LoadingSpinner = () => (
    <motion.div
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
  
  // Icon component
  const IconComponent = ({ icon: Icon, position }) => {
    if (!Icon) return null;
    
    return (
      <Icon 
        className={cn(
          "flex-shrink-0",
          size === 'sm' ? "w-4 h-4" : "w-4 h-4",
          position === 'left' ? "mr-2" : "ml-2"
        )} 
      />
    );
  };
  
  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );
  
  return (
    <motion.button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.15, ease: "easeOut" }}
      {...props}
    >
      {/* Loading overlay */}
      {loading && (
        <motion.div
          className="absolute inset-0 bg-current/20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          <LoadingSpinner />
        </motion.div>
      )}
      
      {/* Content */}
      <div className={cn("flex items-center", loading && "opacity-0")}>
        {icon && iconPosition === 'left' && (
          <IconComponent icon={icon} position="left" />
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && (
          <IconComponent icon={icon} position="right" />
        )}
      </div>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-current/10 rounded-md"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
