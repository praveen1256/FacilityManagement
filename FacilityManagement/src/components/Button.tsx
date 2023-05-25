import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { FM_Colors } from '../constants';

const Button = () => {
  return (
    <TouchableOpacity style={[styles.button, { borderColor: FM_Colors.FM_GREY_BG }]}>
      <Text style={[{ color: FM_Colors.FM_WHITE_TEXT }]}>LOGIN</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FM_Colors.FM_RED,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 5,
    borderWidth: 1,
    padding: 20,
  },
});

// Button.propTypes = {
//   style: PropTypes.object,
//   textStyle: PropTypes.object,
//   title: PropTypes.string.isRequired,
// };

// Button.defaultProps = {
//   style: null,
//   textStyle: null,
// };

export default Button;