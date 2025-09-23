import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

const BlurText = ({ 
  text, 
  delay = 0, 
  animateBy = 'words', 
  direction = 'top', 
  onAnimationComplete,
  className = '',
  duration = 0.6,
  stagger = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'top':
        return { y: -50, opacity: 0 };
      case 'bottom':
        return { y: 50, opacity: 0 };
      case 'left':
        return { x: -50, opacity: 0 };
      case 'right':
        return { x: 50, opacity: 0 };
      default:
        return { y: -50, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case 'top':
        return { y: 0, opacity: 1 };
      case 'bottom':
        return { y: 0, opacity: 1 };
      case 'left':
        return { x: 0, opacity: 1 };
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  const renderText = () => {
    if (animateBy === 'words') {
      return text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          initial={getInitialPosition()}
          animate={isVisible ? getFinalPosition() : getInitialPosition()}
          transition={{
            duration: duration,
            delay: index * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
            onComplete: index === text.split(' ').length - 1 ? onAnimationComplete : undefined
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ));
    } else if (animateBy === 'letters') {
      return text.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={getInitialPosition()}
          animate={isVisible ? getFinalPosition() : getInitialPosition()}
          transition={{
            duration: duration,
            delay: index * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
            onComplete: index === text.length - 1 ? onAnimationComplete : undefined
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ));
    } else {
      return (
        <motion.span
          initial={getInitialPosition()}
          animate={isVisible ? getFinalPosition() : getInitialPosition()}
          transition={{
            duration: duration,
            ease: [0.25, 0.46, 0.45, 0.94],
            onComplete: onAnimationComplete
          }}
        >
          {text}
        </motion.span>
      );
    }
  };

  return (
    <div className={className}>
      {renderText()}
    </div>
  );
};

export default BlurText;
