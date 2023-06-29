import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { locationzedStrings } from "../localization/Localizaton";

interface MyComponentProps {
    loginPage: boolean;
    loggedInUserName: string;
}

const Header: React.FunctionComponent<MyComponentProps> = () => {
    // const [visible, setVisible] = useState(false);
    // const options = [
    //     {
    //         title: "Help",
    //         action: () => console.log("Help"),
    //     },
    //     {
    //         title: "LogOut",
    //         action: () => console.log("LogOut"),
    //     },
    // ];
    return (
        <View style={styles.flexColumn}>
            <View style={styles.flexRowDirection}>
                {/* {loginPage ? <View style={styles.view1} /> : <></>} */}
                <View style={styles.view2}>
                    <Text style={styles.textCenter}>{locationzedStrings.header.headerVerizon}</Text>
                    <FontAwesome5 style={styles.checkIcon} name="check" size={20} />
                    {/* {!loginPage ? (
                        <>
                            <View>
                                <Text style={styles.loggedInUserName}>{locationzedStrings.header.headerWelcome}</Text>
                                <Text style={styles.loggedInUserName}>{loggedInUserName}</Text>
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={styles.textCenter}>{locationzedStrings.header.headerVerizon}</Text>
                            <FontAwesome5 style={styles.checkIcon} name="check" size={20} />
                        </>
                    )} */}
                </View>
                {/* <View style={styles.view3}>
                    {!loginPage ? (
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <FontAwesome5 style={styles.ellipsisIcon} name="ellipsis-v" size={25} />
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                    {!loginPage ? (
                        <Modal transparent visible={visible}>
                            <SafeAreaView style={{ flex: 1 }} onTouchStart={() => setVisible(false)}>
                                <View style={styles.popup}>
                                    {options.map((option, i) => (
                                        <Pressable
                                            key={i}
                                            style={styles.flexRow}
                                            onPress={() => {
                                                console.log("Menu Option Clicked");
                                                option.action;
                                            }}
                                        >
                                            <FontAwesome5 style={styles.popUpIcon} name="check" size={20} />
                                            <Text>{option.title}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </SafeAreaView>
                        </Modal>
                    ) : (
                        <></>
                    )}
                </View> */}
            </View>
            <View style={styles.greyLine} />
        </View>
    );
};

const styles = StyleSheet.create({
    greyLine: {
        borderWidth: 0.5,
        borderColor: "grey",
        width: "100%",
    },
    flexRow: {
        flexDirection: "row",
        padding: 15,
    },
    flexColumn: {
        flexDirection: "column",
        marginBottom: 15,
    },
    checkIcon: {
        alignSelf: "center",
        marginHorizontal: 5,
        marginBottom: 10,
        color: "#D52818",
    },
    popUpIcon: {
        alignSelf: "center",
        marginHorizontal: 5,
        color: "#D52818",
    },
    ellipsisIcon: {
        color: "#D52818",
        marginEnd: 15,
    },
    flexRowDirection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    textCenter: {
        color: "#FFFFFF",
        fontSize: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
    },
    loggedInUserName: {
        color: "#FFFFFF",
        fontSize: 15,
        alignSelf: "flex-start",
        marginStart: 15,
    },
    view1: {
        paddingVertical: 15,
        flex: 1,
    },
    view2: {
        flex: 1,
        paddingVertical: 15,
        flexDirection: "row",
    },
    view3: {
        flex: 1,
        paddingVertical: 15,
        alignItems: "flex-end",
    },
    popup: {
        borderRadius: 8,
        borderColor: "#333",
        borderWidth: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 10,
        position: "absolute",
        top: 50,
        right: 15,
    },
});

export default Header;
