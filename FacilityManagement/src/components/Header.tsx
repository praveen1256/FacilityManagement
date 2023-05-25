import { StyleSheet, Text, View } from "react-native"
import FM_Colors from "../constants/FM_Colors";

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
    backgroundColor: FM_Colors.FM_GREY_BG,
    height:40,
  },
  text: {
    color: FM_Colors.FM_WHITE_TEXT,
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