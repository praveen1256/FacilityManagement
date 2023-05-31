import { StyleSheet, Text, View } from "react-native"
import { theme } from "../../theme";
import { Button, FM_Header, Header, LabelInput } from "../../components";
import Config from "react-native-config";

const Login = () => {
  return (
    <View style={styles.loginContainer}>
      <Header/>
      <FM_Header/>
      <View style={styles.form}>
        <View style={styles.verticalSpacing}>
          <LabelInput label='UserId'/>
        </View>
        <View style={styles.verticalSpacing}>
          <LabelInput label='Password'/>
        </View>
        <View style={styles.verticalSpacing}>
          <Button/>
        </View>
      </View>
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
  fontColorSet: {
    fontSize: 12,
    color: '#FFFFFF'
  },
});

export default Login