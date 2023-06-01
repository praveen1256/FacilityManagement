import { StyleSheet, Text, View } from "react-native"
import { theme } from "../../theme";
import { Button, FM_Header, Header, LabelInput } from "../../components";
import { baseURL, buildVariant } from "../../networking/config";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { axiosClient } from "../../networking";
import { routes } from "../../networking/routes";

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // dispatch(loginAction(username, password));
    axiosClient.request({
      method: 'GET',
      url: routes.authentication.login,
      data: { username, password },
    });
  };

  useEffect(()=>{
    handleSubmit();
  },[])

  return (
    <View style={styles.loginContainer}>
      {/* <Text>{baseURL}</Text>
      <Text>{buildVariant}</Text> */}
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