import { StyleSheet, View, TextInput, Text } from "react-native"
import { theme } from "../theme";

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
        borderColor: theme.light.colors.primary,
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    label: {
      color: theme.light.colors.primary,
      marginBottom: 8,
      fontSize: 20,
    }
})

export default LabelInput;