import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

//  horizontalScale   : width, marginLeft, marginRight, marginHorizontal, paddingLeft, paddingRight, paddingHorizontal, likewise
const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;

//  verticalScale     : height, marginTop, marginBottom, marginVertical, line-height, paddingTop, paddingBottom, paddingVertical, likewise
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

//  moderateScale     : font-size, borderRadius, likewise
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;


export { horizontalScale, verticalScale, moderateScale };