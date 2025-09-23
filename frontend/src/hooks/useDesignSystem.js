// src/hooks/useDesignSystem.js
import { useMemo } from 'react';
import designSystem from '../utils/designSystem';

/**
 * Hook to access design system tokens
 */
export const useDesignSystem = (mode = 'light') => {
  return useMemo(() => ({
    // Color utilities
    getColor: (path) => designSystem.getColor(path, mode),
    getColorVar: (path) => designSystem.getColorVar(path, mode),
    
    // Typography utilities
    getFontSize: (size) => designSystem.getTypography('fontSize', size),
    getFontFamily: (family) => designSystem.getTypography('fontFamily', family),
    getFontWeight: (weight) => designSystem.getTypography('fontWeight', weight),
    getLineHeight: (height) => designSystem.getTypography('lineHeight', height),
    
    // Spacing utilities
    getSpacing: (size) => designSystem.getSpacing(size),
    
    // Border utilities
    getBorderRadius: (size) => designSystem.getBorderRadius(size),
    
    // Shadow utilities
    getShadow: (size) => designSystem.getShadow(size),
    
    // Component utilities
    getComponent: (name) => designSystem.getComponent(name),
    
    // Animation utilities
    getAnimation: (name) => designSystem.getAnimation(name),
    
    // Layout utilities
    getLayout: (element) => designSystem.getLayout(element),
    getBreakpoint: (size) => designSystem.getBreakpoint(size),
    
    // Validation utilities
    validateToken: (category, value) => designSystem.validateToken(category, value),
    getAvailableTokens: (category) => designSystem.getAvailableTokens(category),
    
    // Current mode
    mode,
    
    // All colors for current mode
    colors: designSystem.generateColorVariables(mode),
  }), [mode]);
};

/**
 * Hook to get component-specific styles
 */
export const useComponentStyles = (componentName, variant = 'default', size = 'md') => {
  return useMemo(() => {
    const component = designSystem.getComponent(componentName);
    if (!component) return {};

    const baseStyles = component.base || {};
    const variantStyles = component.variants?.[variant] || {};
    const sizeStyles = component.sizes?.[size] || {};

    return {
      ...baseStyles,
      ...variantStyles,
      ...sizeStyles,
    };
  }, [componentName, variant, size]);
};

/**
 * Hook to get responsive breakpoints
 */
export const useBreakpoints = () => {
  return useMemo(() => ({
    sm: designSystem.getBreakpoint('sm'),
    md: designSystem.getBreakpoint('md'),
    lg: designSystem.getBreakpoint('lg'),
    xl: designSystem.getBreakpoint('xl'),
    '2xl': designSystem.getBreakpoint('2xl'),
  }), []);
};

/**
 * Hook to get animation styles
 */
export const useAnimation = (animationName) => {
  return useMemo(() => {
    const animation = designSystem.getAnimation(animationName);
    if (!animation) return {};

    return {
      animation: `${animationName} ${animation.duration} ${animation.easing}`,
      '@keyframes': {
        [animationName]: {
          from: animation.from,
          to: animation.to,
        },
      },
    };
  }, [animationName]);
};

/**
 * Hook to get color palette
 */
export const useColorPalette = (mode = 'light') => {
  return useMemo(() => {
    const colors = designSystem.generateColorVariables(mode);
    return {
      primary: colors['--color-primary'],
      secondary: colors['--color-secondary'],
      background: colors['--color-background'],
      foreground: colors['--color-foreground'],
      card: colors['--color-card'],
      muted: colors['--color-muted'],
      accent: colors['--color-accent'],
      destructive: colors['--color-destructive'],
      border: colors['--color-border'],
      input: colors['--color-input'],
      ring: colors['--color-ring'],
      chart: {
        '1': colors['--color-chart-1'],
        '2': colors['--color-chart-2'],
        '3': colors['--color-chart-3'],
        '4': colors['--color-chart-4'],
        '5': colors['--color-chart-5'],
      },
      sidebar: {
        background: colors['--color-sidebar-background'],
        foreground: colors['--color-sidebar-foreground'],
        primary: colors['--color-sidebar-primary'],
        accent: colors['--color-sidebar-accent'],
        border: colors['--color-sidebar-border'],
      },
    };
  }, [mode]);
};

/**
 * Hook to get typography scale
 */
export const useTypography = () => {
  return useMemo(() => ({
    fontSizes: designSystem.config.typography.fontSize,
    fontFamilies: designSystem.config.typography.fontFamily,
    fontWeights: designSystem.config.typography.fontWeight,
    lineHeights: designSystem.config.typography.lineHeight,
  }), []);
};

/**
 * Hook to get spacing scale
 */
export const useSpacing = () => {
  return useMemo(() => ({
    values: designSystem.config.spacing,
    get: (size) => designSystem.getSpacing(size),
  }), []);
};

export default useDesignSystem;
