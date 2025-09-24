import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';

const TestimonialCard = ({
  name,
  role,
  quote,
  rating,
  avatar,
  delay = 0,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`group bg-card p-8 rounded-2xl border border-border hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-2 hover:border-primary/20 ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        scale: 1.02,
        rotateY: 3,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Quote Icon */}
      <motion.div
        className="absolute top-4 left-4 text-primary/20 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? 15 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        "
      </motion.div>

      {/* Avatar and Info */}
      <div className="flex items-center mb-6 relative z-10">
        <motion.div
          className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg mr-4 group-hover:scale-110 transition-transform duration-300"
          animate={{
            rotate: isHovered ? 360 : 0
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {avatar}
          
          {/* Avatar Glow */}
          <motion.div
            className="absolute inset-0 bg-primary/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
        </motion.div>
        
        <div>
          <motion.h4
            className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h4>
          <motion.p
            className="text-sm text-muted-foreground"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {role}
          </motion.p>
        </div>
      </div>

      {/* Quote */}
      <motion.p
        className="text-muted-foreground italic mb-4 leading-relaxed group-hover:text-foreground transition-colors duration-300 relative z-10"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        "{quote}"
      </motion.p>

      {/* Rating Stars */}
      <motion.div
        className="flex text-yellow-400 relative z-10"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {[...Array(rating)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 360 : 0
            }}
            transition={{
              duration: 0.3,
              delay: i * 0.1
            }}
          >
            <Star className="w-5 h-5 fill-current" />
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-4 right-4 w-8 h-8 border-2 border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? 180 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Quote Marks */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/10 text-4xl"
              initial={{
                x: Math.random() * 200,
                y: Math.random() * 150,
                opacity: 0,
                rotate: Math.random() * 360
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            >
              "
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TestimonialCard;
