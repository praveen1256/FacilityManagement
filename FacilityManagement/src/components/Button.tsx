import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { theme } from '../theme';

const Button = () => {
  return (
    <TouchableOpacity style={[styles.button, { borderColor: theme.light.colors.primary }]}>
      <Text style={[{ color: theme.light.colors.white }]}>LOGIN</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.light.colors.primary,
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