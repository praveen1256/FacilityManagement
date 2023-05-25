import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { FM_Header, Header, LabelInput, Button } from './components';
import { FM_Colors } from './constants';

function App(): JSX.Element {
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
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 2,
    backgroundColor: FM_Colors.FM_GREY_BG
  },
  form: {
    flex: 1,
    marginTop: 10,
    backgroundColor: FM_Colors.FM_WHITE_TEXT
  },
  verticalSpacing: {
    marginVertical: 12
  },
});

export default App;
