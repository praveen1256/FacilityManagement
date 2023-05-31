import { StyleSheet, Text, View } from "react-native"
import { theme } from "../theme";

const Header = () => {
  return (
    <View style={styles.headerBackground}>
      <Text style={styles.text}>VERIZON</Text>
      <View style={styles.greyLine}/>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    backgroundColor: theme.light.colors.primary,
    height:40,
  },
  text: {
    color: theme.light.colors.white,
    fontSize: 35,
  },
  greyLine: {
    borderWidth: 0.5,
    borderColor:'grey',
    width: "100%",
    marginTop: 15,
  }
})

export default Header;