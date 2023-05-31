import { StyleSheet } from 'react-native';
import { moderateScale } from './Matrics';

export const typography = StyleSheet.create({
  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: '400',
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  error: {
    fontSize: moderateScale(14),
    fontWeight: '400',
  },
});
