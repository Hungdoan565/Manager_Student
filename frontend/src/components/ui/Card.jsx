import { motion } from 'motion/react';
import React from 'react';
import { cn } from '../../utils/cn';

const Card = React.forwardRef(({
  className = '',
  children,
  ...props
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

const CardHeader = React.forwardRef(({
  className = '',
  children,
  ...props
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({
  className = '',
  children,
  ...props
}, ref) => {
  return (
    <motion.h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.15 }}
      {...props}
    >
      {children}
    </motion.h3>
  );
});

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({
  className = '',
  children,
  ...props
}, ref) => {
  return (
    <motion.p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
      {...props}
    >
      {children}
    </motion.p>
  );
});

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({
  className = '',
  children,
  ...props
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({
  className = '',
  children,
  ...props
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };

