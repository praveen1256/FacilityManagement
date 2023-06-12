import { StyleSheet, View, Dimensions, ScrollView, Pressable } from "react-native";
import { Card, Text } from "react-native-paper";
import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { container } from "tsyringe";

import FM_Header from "../../components/FM_Header";
import Header from "../../components/Header";
import { NavigationService } from "../../services/Navigation.Service";
import { WorkTasksScreenName } from "../WorkTasks";

const windowWidth = Dimensions.get("window").width / 4.5;
const windowHeight = Dimensions.get("window").height / 12;

const LeafShape = (props: any) => <View style={[styles.square, props.style]}>{props.children}</View>;

interface HomeScreenProps {
    isAuthStateInitialized?: boolean;
    // onPressContinue: () => void;
}

const HomeScreenView: React.FunctionComponent<HomeScreenProps> = () => {
    // type Mode = "elevated" | "outlined" | "contained";
    // const [selectedMode, setSelectedMode] = React.useState("elevated" as Mode);

    return (
        <ScrollView>
            <View style={styles.homeContainer}>
                <Header />
                <FM_Header />
                <View style={styles.container}>
                    <View style={styles.view1}>
                        <Card style={[styles.cardStyle, styles.card1_Bg]}>
                            <Text style={styles.paragraph}>P1</Text>
                            <Text style={styles.paragraph}>0</Text>
                        </Card>
                        <Card style={[styles.cardStyle, styles.card2_Bg]}>
                            <Text style={styles.paragraph}>OverDue</Text>
                            <Text style={styles.paragraph}>0</Text>
                        </Card>
                        {/* </View>

                <View style={styles.view1}> */}
                        <Card style={[styles.cardStyle, styles.card3_Bg]}>
                            <Text style={styles.paragraph}>P2-P7</Text>
                            <Text style={styles.paragraph}>0</Text>
                        </Card>

                        <Card style={[styles.cardStyle, styles.card4_Bg]}>
                            <Text style={styles.paragraph}>Today</Text>
                            <Text style={styles.paragraph}>0</Text>
                        </Card>
                    </View>
                </View>
                <View style={styles.taskContainer}>
                    <View style={styles.taskListCol1}>
                        <Pressable
                            onPress={() => {
                                // eslint-disable-next-line no-console
                                console.log("My Tasks");
                                const navigationContainer = container.resolve(NavigationService);
                                navigationContainer.navigate(WorkTasksScreenName, undefined);
                            }}
                        >
                            <LeafShape style={styles.leafBorder}>
                                <Text style={styles.taskTitle}>My Tasks</Text>
                                <Text style={styles.taskDescription}>Select this option to find your Work Tasks</Text>
                            </LeafShape>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                // eslint-disable-next-line no-console
                                console.log("My Responsible Tasks");
                            }}
                        >
                            <LeafShape style={styles.leafBorder}>
                                <Text style={styles.taskTitle}>My Responsible Tasks</Text>
                                <Text style={styles.taskDescription}>
                                    Select this option to find your Responsible Tasks
                                </Text>
                            </LeafShape>
                        </Pressable>
                    </View>
                    <View style={styles.taskListCol2}>
                        <Pressable
                            onPress={() => {
                                // eslint-disable-next-line no-console
                                console.log("My Location Taks");
                            }}
                        >
                            <LeafShape style={styles.leafBorder}>
                                <Text style={styles.taskTitle}>My Location Tasks</Text>
                                <Text style={styles.taskDescription}>
                                    Select this option to find your Location Tasks
                                </Text>
                            </LeafShape>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                // eslint-disable-next-line no-console
                                console.log("Service Request");
                            }}
                        >
                            <LeafShape style={styles.leafBorder}>
                                <Text style={styles.taskTitle}>Service Request</Text>
                                <Text style={styles.taskDescription}>Submit a new Service Request</Text>
                            </LeafShape>
                        </Pressable>
                    </View>
                </View>
                <Card style={[styles.customerCardStyle, styles.customerCardBg]}>
                    <Text style={styles.customerCareInfo}>
                        For all critical requests, please contact the GRE Customer Experience Team at
                    </Text>
                    <Text style={styles.customerCareCall}>+1-(888) 696-3973</Text>
                    <Text style={styles.customerCareInfo}>
                        You will need to select the correct line of business from the IVR.
                    </Text>
                    <Text style={styles.customerCareInfo}>
                        For International Peoperties, if you need further assistance, please call your Local Facilities
                        Contact.
                    </Text>
                </Card>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    homeContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#222D32",
    },
    tasks: {
        flex: 1,
        marginTop: 10,
        backgroundColor: "#FFFFFF",
    },
    container: {
        justifyContent: "flex-start",
        backgroundColor: "#FFFFFF",
    },
    paragraph: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginTop: 10,
    },
    customerCareInfo: {
        fontSize: 16,
        color: "#FFFFFF",
        textAlign: "center",
        marginTop: 10,
    },
    customerCareCall: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ED7000",
        textAlign: "center",
        marginTop: 10,
    },
    taskTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#D52818",
        textAlign: "center",
        marginTop: 10,
    },
    taskDescription: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#222D32",
        textAlign: "center",
        marginTop: 10,
    },
    cardStyle: {
        width: windowWidth,
        height: windowHeight,
        margin: 6,
    },
    customerCardStyle: {
        alignSelf: "center",
        width: "95%",
        marginVertical: 10,
        padding: 15,
    },
    view1: {
        flexDirection: "row",
        justifyContent: "center",
        margin: 4,
    },
    card1_Bg: {
        backgroundColor: "#D52818",
    },
    card2_Bg: {
        backgroundColor: "#ED7000",
    },
    card3_Bg: {
        backgroundColor: "#1FA09E",
    },
    card4_Bg: {
        backgroundColor: "#0277B4",
    },
    customerCardBg: {
        backgroundColor: "#384247",
    },
    taskListCol1: {
        flexDirection: "column",
        justifyContent: "center",
        margin: 4,
    },
    taskListCol2: {
        flexDirection: "column",
        justifyContent: "center",
        margin: 4,
    },
    taskContainer: {
        backgroundColor: "#FFFFFF",
        paddingTop: 10,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        alignSelf: "flex-start",
        flexDirection: "row",
    },
    leafBorder: {
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: "#222D32",
    },
    square: {
        width: 150,
        height: 150,
        padding: 5,
        justifyContent: "center",
        marginBottom: 20,
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
    },
});

const HeaderOptions: NativeStackHeaderProps["options"] = {
    headerShown: false,
};

// const mapDispatch = (dispatch: AppThunkDispatch<AppState.ActionInterfaces>) => ({
//     onPressContinue: () => console.log("pressContinue!!"),
// });

// const mapState = (state: RootState) => ({
//     isAuthStateInitialized: state.auth.isIntialized,
// });

// const connector = connect(mapState, mapDispatch);

// export const HomeScreen = connector(HomeScreenView);
export const HomeScreenHeaderOptions = HeaderOptions;
export const HomeScreenName = "HomeScreen";
export const HomeScreen = HomeScreenView;
