import { motion } from 'motion/react';
import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({
  className = '',
  type = 'text',
  placeholder = '',
  disabled = false,
  error = false,
  errorMessage = '',
  label = '',
  helperText = '',
  icon = null,
  iconPosition = 'left',
  size = 'md',
  variant = 'default',
  ...props
}, ref) => {
  // Base classes from design.json
  const baseClasses = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  
  // Size variants
  const sizeClasses = {
    sm: "h-8 px-2 text-xs",
    md: "h-10 px-3 text-sm",
    lg: "h-12 px-4 text-base"
  };
  
  // Error state
  const errorClasses = error ? "border-destructive focus-visible:ring-destructive" : "";
  
  // Icon component
  const IconComponent = ({ icon: Icon, position }) => {
    if (!Icon) return null;
    
    return (
      <Icon 
        className={cn(
          "flex-shrink-0 text-muted-foreground",
          size === 'sm' ? "w-4 h-4" : "w-4 h-4",
          position === 'left' ? "mr-2" : "ml-2"
        )} 
      />
    );
  };
  
  const inputClasses = cn(
    baseClasses,
    sizeClasses[size],
    errorClasses,
    icon && iconPosition === 'left' && "pl-10",
    icon && iconPosition === 'right' && "pr-10",
    className
  );
  
  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      {/* Input container */}
      <div className="relative">
        {/* Left icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <IconComponent icon={icon} position="left" />
          </div>
        )}
        
        {/* Input field */}
        <motion.input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          {...props}
        />
        
        {/* Right icon */}
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <IconComponent icon={icon} position="right" />
          </div>
        )}
        
        {/* Error indicator */}
        {error && (
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <svg className="w-4 h-4 text-destructive" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </motion.div>
        )}
      </div>
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <motion.p
          className={cn(
            "text-xs",
            error ? "text-destructive" : "text-muted-foreground"
          )}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {error ? errorMessage : helperText}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
