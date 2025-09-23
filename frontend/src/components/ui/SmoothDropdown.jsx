import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const SmoothDropdown = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Chọn...", 
  icon: Icon,
  className = "",
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.value === value) || null
  )
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    onChange(option.value)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <motion.button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full 
          focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
          transition-all duration-300 appearance-none bg-white text-left
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-emerald-400'}
        `}
        whileHover={!disabled ? { scale: 1.01 } : {}}
        whileTap={!disabled ? { scale: 0.99 } : {}}
      >
        {/* Icon */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}

        {/* Selected Value */}
        <span className={`${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Dropdown Arrow */}
        <motion.div
          className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </motion.div>
      </motion.button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
          >
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => handleOptionClick(option)}
                className={`
                  w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors duration-200
                  ${selectedOption?.value === option.value ? 'bg-emerald-100 text-emerald-700' : 'text-gray-900'}
                  ${index === 0 ? 'rounded-t-xl' : ''}
                  ${index === options.length - 1 ? 'rounded-b-xl' : ''}
                `}
                whileHover={{ backgroundColor: '#f0fdf4' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SmoothDropdown
