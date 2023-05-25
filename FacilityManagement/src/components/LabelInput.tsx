import { StyleSheet, View, TextInput, Text } from "react-native"
import { FM_Colors } from "../constants";

interface Props {
  label: string;
}

const LabelInput : React.FC<Props> = ({ label }) => {
  return (
    <View style= {styles.container}>
      <Text style= {styles.label}>{label}</Text>
      <TextInput style= {styles.input}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        marginHorizontal: 20
    },
    input: {
        borderColor: FM_Colors.FM_GREY_BG,
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    label: {
      color: FM_Colors.FM_GREY_BG,
      marginBottom: 8,
      fontSize: 20,
    }
})

export default LabelInput;