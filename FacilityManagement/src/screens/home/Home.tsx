import { StyleSheet, Text, View } from "react-native"
import { theme } from "../../theme";

const Home = ({ }) => {
  return (
    <View style={styles.loginContainer}>
      <Text>Home Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: theme.light.colors.primary
  },
  form: {
    flex: 1,
    marginTop: 10,
    backgroundColor: theme.light.colors.white
  },
  verticalSpacing: {
    marginVertical: 12
  },
});

export default Home