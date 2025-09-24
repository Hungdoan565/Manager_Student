import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

const GooeyNav = ({ 
  items = [], 
  initialActiveIndex = 0,
  className = "",
  onItemClick = null
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    
    // Use custom click handler if provided
    if (onItemClick) {
      onItemClick(index, item);
      return;
    }
    
    // Default navigation behavior
    if (item.href) {
      if (item.href.startsWith('#')) {
        // Scroll to section
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        // Navigate to page
        window.location.href = item.href;
      }
    }
  };

  return (
    <div className={`gooey-nav-container ${className}`}>
      <div className="flex items-center space-x-1">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;
          
          return (
              <motion.button
              key={index}
              onClick={() => handleItemClick(index, item)}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-muted text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              whileHover={{ 
                scale: 1.02,
                y: -1,
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.03,
                ease: "easeOut"
              }}
            >
              {/* Active indicator */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.15,
                      ease: "easeOut"
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Icon */}
              <motion.div
                animate={isActive ? { 
                  scale: 1.05,
                } : { scale: 1 }}
                transition={{ 
                  duration: 0.2,
                  ease: "easeOut"
                }}
              >
                <Icon className="w-4 h-4" />
              </motion.div>

              {/* Label */}
              <motion.span
                className="relative z-10 text-sm whitespace-nowrap"
                animate={isActive ? { 
                  fontWeight: 600,
                } : { fontWeight: 500 }}
                transition={{ 
                  duration: 0.15,
                  ease: "easeOut"
                }}
              >
                {item.name}
              </motion.span>

              {/* Subtle glow effect for active state */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-lg border border-primary/20"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ 
                      scale: 1,
                      opacity: 0.3
                    }}
                    exit={{ 
                      scale: 0.95, 
                      opacity: 0 
                    }}
                    transition={{ 
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default GooeyNav;
