import { StyleSheet, Text, View } from "react-native"
import { FM_Colors } from "../constants";

const FM_Header = ({ }) => {
  return (
    <View style={styles.headerBackground}>
      <Text style={styles.facilityColor}>Facility</Text>
      <Text style={styles.textWhite}>Management</Text>
      <View style={styles.everyWhereBg}>
        <Text style={styles.everyWhereText}>EveryWhere</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBackground: {
    alignItems: 'flex-start',
    paddingStart: 10,
    paddingBottom: 10,
    marginVertical: 5,
    backgroundColor: FM_Colors.FM_GREY_BG,
  },
  facilityColor: {
    color: FM_Colors.FM_RED,
    fontSize: 25,
    marginVertical: 5,
  },
  textWhite: {
    color: FM_Colors.FM_WHITE_TEXT,
    fontSize: 25,
  },
  everyWhereBg: {
    fontSize: 20,
    marginVertical: 15,
    backgroundColor: FM_Colors.FM_RED,
    width: '50%'
  },
  everyWhereText: {
    color: FM_Colors.FM_WHITE_TEXT,
    fontSize: 18,
    padding: 4,
    alignSelf:'flex-end',
    fontWeight: 'bold'
  }

})

export default FM_Header;