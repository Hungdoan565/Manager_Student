import { motion } from 'motion/react';
import React from 'react';
import { faqConfig, faqItems } from '../../data/faqData';

const FAQItem = ({ item, index }) => {
  const config = faqConfig;
  const transformVariant = config.transforms.variants[item.transformVariant];
  const gradientVariant = config.animations.gradient.variants[item.gradientVariant];
  
  return (
    <motion.div 
      className={config.styles.card.base}
      initial={config.animations.card.initial}
      whileInView={config.animations.card.animate}
      transition={{ 
        ...config.animations.card.transition, 
        delay: item.delay 
      }}
      whileHover={{ 
        ...config.animations.card.hover,
        ...transformVariant
      }}
      style={{ perspective: config.transforms.perspective }}
    >
      {/* Hover Background Gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradientVariant} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <motion.h3 
          className={config.styles.card.title}
          whileHover={config.animations.content.title.hover}
          transition={config.animations.content.title.transition}
        >
          {item.question}
        </motion.h3>
        <motion.p 
          className={config.styles.card.description}
          whileHover={config.animations.content.description.hover}
          transition={config.animations.content.description.transition}
        >
          {item.answer}
        </motion.p>
      </div>
    </motion.div>
  );
};

const FAQSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Câu hỏi thường gặp
          </h2>
          <p className="text-xl text-gray-600">
            Những câu hỏi phổ biến về hệ thống điểm danh sinh viên
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqItems.map((item, index) => (
            <FAQItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
