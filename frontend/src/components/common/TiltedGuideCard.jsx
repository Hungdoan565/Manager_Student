import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef, useState } from 'react';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedGuideCard({
  stepNumber,
  icon: Icon,
  title,
  description,
  delay = 0,
  scaleOnHover = 1.03,
  rotateAmplitude = 8,
  showMobileWarning = false
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateNumber = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });
  const rotateIcon = useSpring(0, {
    stiffness: 300,
    damping: 25,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateNumber.set(-velocityY * 0.4);
    rotateIcon.set(velocityY * 0.3);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateNumber.set(0);
    rotateIcon.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d] bg-white rounded-xl border border-border p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
        style={{
          rotateX,
          rotateY,
          scale
        }}
      >
        {/* Step Number */}
        <motion.div 
          className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4"
          style={{
            rotate: rotateNumber
          }}
        >
          {stepNumber}
        </motion.div>
        
        {/* Icon */}
        <motion.div 
          className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{
            rotate: rotateIcon
          }}
        >
          <Icon className="w-8 h-8 text-primary" />
        </motion.div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block shadow-sm border"
        style={{
          x,
          y,
          opacity
        }}
      >
        {title}
      </motion.div>
    </motion.div>
  );
}
