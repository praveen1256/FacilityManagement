import { StyleSheet, Text, View } from "react-native"
import { theme } from "../theme";

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
    backgroundColor: theme.light.colors.primary,
  },
  facilityColor: {
    color: theme.light.colors.secondary,
    fontSize: 25,
    marginVertical: 5,
  },
  textWhite: {
    color: theme.light.colors.white,
    fontSize: 25,
  },
  everyWhereBg: {
    fontSize: 20,
    marginVertical: 15,
    backgroundColor: theme.light.colors.secondary,
    width: '50%'
  },
  everyWhereText: {
    color: theme.light.colors.white,
    fontSize: 18,
    padding: 4,
    alignSelf:'flex-end',
    fontWeight: 'bold'
  }

})

export default FM_Header;