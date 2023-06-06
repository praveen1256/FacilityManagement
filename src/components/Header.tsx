import { StyleSheet, Text, View } from "react-native"

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
    marginVertical: 15,
    backgroundColor: "#222D32",
    height:40,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 25,
  },
  greyLine: {
    borderWidth: 0.5,
    borderColor:'grey',
    width: "100%",
    marginTop: 15,
  }
})

export default Header;