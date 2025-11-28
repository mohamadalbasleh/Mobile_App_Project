import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Device type detection
export const isTablet = width > 600;
export const isSmallPhone = width < 350;

// Responsive scaling function
export const RFValue = (value) => {
  const baseWidth = 375; // iPhone 8 width
  const scale = width / baseWidth;
  return Math.round(value * scale);
};

// Responsive font sizes
export const fontSizes = {
  xs: RFValue(10),
  sm: RFValue(12),
  base: RFValue(14),
  lg: RFValue(16),
  xl: RFValue(18),
  xxl: RFValue(20),
  xxxl: RFValue(26),
  huge: RFValue(32),
};

// Responsive spacing
export const spacing = {
  xs: RFValue(4),
  sm: RFValue(8),
  md: RFValue(12),
  lg: RFValue(16),
  xl: RFValue(20),
  xxl: RFValue(24),
  xxxl: RFValue(32),
};

// Responsive dimensions
export const dimensions = {
  screenWidth: width,
  screenHeight: height,
  isLandscape: width > height,
};

// Common responsive sizes
export const sizes = {
  imageSmall: RFValue(80),
  imageMedium: RFValue(120),
  imageLarge: RFValue(200),
  buttonHeight: RFValue(48),
  statusBarHeight: Platform.OS === 'ios' ? 44 : 24,
};

// Responsive container padding
export const getPadding = (percentage = 0.05) => {
  return width * percentage;
};

// Responsive width for flexible layouts
export const getFlexWidth = (percentage = 1) => {
  return width * percentage;
};

// Responsive height for flexible layouts
export const getFlexHeight = (percentage = 1) => {
  return height * percentage;
};

// Safe area considerations
export const safeAreaPadding = Platform.OS === 'ios' ? spacing.xl : spacing.lg;
