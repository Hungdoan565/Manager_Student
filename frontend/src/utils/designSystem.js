// src/utils/designSystem.js
import designConfig from '../../design.json';

/**
 * Design System Utility
 * Provides access to design tokens and configuration
 */
class DesignSystem {
  constructor(config) {
    this.config = config;
  }

  /**
   * Get color by path (e.g., 'light.primary', 'dark.background')
   */
  getColor(path, mode = 'light') {
    const keys = path.split('.');
    let value = this.config.colors[mode];
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value;
  }

  /**
   * Get CSS custom property for color
   */
  getColorVar(path, mode = 'light') {
    const color = this.getColor(path, mode);
    return color ? `var(--color-${path.replace('.', '-')})` : null;
  }

  /**
   * Get typography value
   */
  getTypography(category, value) {
    return this.config.typography[category]?.[value];
  }

  /**
   * Get spacing value
   */
  getSpacing(size) {
    return this.config.spacing[size];
  }

  /**
   * Get border radius value
   */
  getBorderRadius(size) {
    return this.config.borderRadius[size];
  }

  /**
   * Get shadow value
   */
  getShadow(size) {
    return this.config.shadows[size];
  }

  /**
   * Get component configuration
   */
  getComponent(componentName) {
    return this.config.components[componentName];
  }

  /**
   * Get animation configuration
   */
  getAnimation(animationName) {
    return this.config.animations[animationName];
  }

  /**
   * Get layout configuration
   */
  getLayout(element) {
    return this.config.layout[element];
  }

  /**
   * Get breakpoint value
   */
  getBreakpoint(size) {
    return this.config.layout.breakpoints[size];
  }

  /**
   * Generate CSS custom properties for colors
   */
  generateColorVariables(mode = 'light') {
    const colors = this.config.colors[mode];
    const variables = {};

    const flattenColors = (obj, prefix = '') => {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
          flattenColors(value, `${prefix}${key}-`);
        } else {
          variables[`--color-${prefix}${key}`] = value;
        }
      }
    };

    flattenColors(colors);
    return variables;
  }

  /**
   * Generate Tailwind CSS configuration
   */
  generateTailwindConfig() {
    return {
      theme: {
        extend: {
          colors: {
            background: 'var(--color-background)',
            foreground: 'var(--color-foreground)',
            card: {
              DEFAULT: 'var(--color-card)',
              foreground: 'var(--color-card-foreground)',
            },
            popover: {
              DEFAULT: 'var(--color-popover)',
              foreground: 'var(--color-popover-foreground)',
            },
            primary: {
              DEFAULT: 'var(--color-primary)',
              foreground: 'var(--color-primary-foreground)',
            },
            secondary: {
              DEFAULT: 'var(--color-secondary)',
              foreground: 'var(--color-secondary-foreground)',
            },
            muted: {
              DEFAULT: 'var(--color-muted)',
              foreground: 'var(--color-muted-foreground)',
            },
            accent: {
              DEFAULT: 'var(--color-accent)',
              foreground: 'var(--color-accent-foreground)',
            },
            destructive: {
              DEFAULT: 'var(--color-destructive)',
              foreground: 'var(--color-destructive-foreground)',
            },
            border: 'var(--color-border)',
            input: 'var(--color-input)',
            ring: 'var(--color-ring)',
            chart: {
              '1': 'var(--color-chart-1)',
              '2': 'var(--color-chart-2)',
              '3': 'var(--color-chart-3)',
              '4': 'var(--color-chart-4)',
              '5': 'var(--color-chart-5)',
            },
            sidebar: {
              DEFAULT: 'var(--color-sidebar-background)',
              foreground: 'var(--color-sidebar-foreground)',
              primary: 'var(--color-sidebar-primary)',
              'primary-foreground': 'var(--color-sidebar-primary-foreground)',
              accent: 'var(--color-sidebar-accent)',
              'accent-foreground': 'var(--color-sidebar-accent-foreground)',
              border: 'var(--color-sidebar-border)',
              ring: 'var(--color-sidebar-ring)',
            },
          },
          fontFamily: {
            sans: this.config.typography.fontFamily.sans,
            serif: this.config.typography.fontFamily.serif,
            mono: this.config.typography.fontFamily.mono,
          },
          fontSize: this.config.typography.fontSize,
          spacing: this.config.spacing,
          borderRadius: this.config.borderRadius,
          boxShadow: this.config.shadows,
          animation: {
            'fade-in': 'fadeIn 0.3s ease-in-out',
            'slide-in': 'slideIn 0.3s ease-out',
            'slide-up': 'slideUp 0.3s ease-out',
            'slide-down': 'slideDown 0.3s ease-out',
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0', transform: 'translateY(10px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            slideIn: {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(0)' },
            },
            slideUp: {
              '0%': { transform: 'translateY(100%)' },
              '100%': { transform: 'translateY(0)' },
            },
            slideDown: {
              '0%': { transform: 'translateY(-100%)' },
              '100%': { transform: 'translateY(0)' },
            },
          },
        },
      },
    };
  }

  /**
   * Validate design token
   */
  validateToken(category, value) {
    const validCategories = ['colors', 'typography', 'spacing', 'borderRadius', 'shadows'];
    if (!validCategories.includes(category)) {
      throw new Error(`Invalid category: ${category}`);
    }
    
    return this.config[category]?.[value] !== undefined;
  }

  /**
   * Get all available tokens for a category
   */
  getAvailableTokens(category) {
    return Object.keys(this.config[category] || {});
  }

  /**
   * Export design system as CSS variables
   */
  exportAsCSS(mode = 'light') {
    const variables = this.generateColorVariables(mode);
    const css = Object.entries(variables)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n');
    
    return `:root {\n${css}\n}`;
  }
}

// Create singleton instance
const designSystem = new DesignSystem(designConfig);

export default designSystem;

// Export individual utilities
export const {
  getColor,
  getColorVar,
  getTypography,
  getSpacing,
  getBorderRadius,
  getShadow,
  getComponent,
  getAnimation,
  getLayout,
  getBreakpoint,
  generateColorVariables,
  generateTailwindConfig,
  validateToken,
  getAvailableTokens,
  exportAsCSS
} = designSystem;
