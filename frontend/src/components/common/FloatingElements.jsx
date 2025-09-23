import { BarChart3, Calendar, GraduationCap, Users } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

const FloatingElements = () => {
  const elements = [
    {
      icon: Users,
      position: { top: '10%', left: '10%' },
      delay: 0,
      duration: 3,
      color: 'text-blue-500/20'
    },
    {
      icon: GraduationCap,
      position: { top: '20%', right: '15%' },
      delay: 0.5,
      duration: 4,
      color: 'text-green-500/20'
    },
    {
      icon: BarChart3,
      position: { bottom: '30%', left: '20%' },
      delay: 1,
      duration: 3.5,
      color: 'text-purple-500/20'
    },
    {
      icon: Calendar,
      position: { bottom: '20%', right: '10%' },
      delay: 1.5,
      duration: 4.5,
      color: 'text-orange-500/20'
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color}`}
            style={element.position}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-16 h-16" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingElements;
