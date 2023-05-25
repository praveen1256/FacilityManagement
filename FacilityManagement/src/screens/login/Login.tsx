import { StyleSheet, Text, View } from "react-native"

const Login = ({ }) => {
  return (
    <View style={styles.headerBackground}>
      <Text style={styles.text}>VERIZON</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#222d32',
    height:40,
  },
  text: {
    color:'#FFFFFF',
    fontSize: 25,
  }

})

export default Login;