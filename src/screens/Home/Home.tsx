import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";
import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import ColorfulCard from "react-native-colorful-card";

import FM_Header from "../../components/FM_Header";
import Header from "../../components/Header";
import { AppThunkDispatch, RootState, WorkTasks } from "../../store";
import { locationzedStrings } from "../../localization/Localizaton";

const windowWidth = Dimensions.get("window").width / 4.5;
const windowHeight = Dimensions.get("window").height / 12;

interface HomeScreenProps {
    isAuthStateInitialized?: boolean;
    isLoading?: boolean;
    error: string | null;
    // tasks: {
    //     _id: number;
    // }[];
    onPressWorkTaks: (isOnlyCount: boolean) => void;
}

const HomeScreenView: React.FunctionComponent<HomeScreenProps> = ({ onPressWorkTaks }) => {
    const isLoginPage = false;
    return (
        <View style={styles.homeContainer}>
            <Header loginPage={isLoginPage} />
            <ScrollView>
                <View>
                    <FM_Header />
                    <View style={styles.container}>
                        <View style={styles.view1}>
                            <Card style={[styles.cardStyle, styles.card1_Bg]}>
                                <Text style={styles.paragraph}>{locationzedStrings.home.card1_count_title}</Text>
                                <Text style={styles.paragraph}>0</Text>
                            </Card>
                            <Card style={[styles.cardStyle, styles.card2_Bg]}>
                                <Text style={styles.paragraph}>{locationzedStrings.home.card2_count_title}</Text>
                                <Text style={styles.paragraph}>0</Text>
                            </Card>
                            <Card style={[styles.cardStyle, styles.card3_Bg]}>
                                <Text style={styles.paragraph}>{locationzedStrings.home.card3_count_title}</Text>
                                <Text style={styles.paragraph}>0</Text>
                            </Card>

                            <Card style={[styles.cardStyle, styles.card4_Bg]}>
                                <Text style={styles.paragraph}>{locationzedStrings.home.card4_count_title}</Text>
                                <Text style={styles.paragraph}>0</Text>
                            </Card>
                        </View>
                    </View>
                    <View style={styles.taskContainer}>
                        <View style={styles.taskListCol1}>
                            <ColorfulCard
                                title={locationzedStrings.home.card1_title}
                                // iconImageStyle={styles.iconBackgroundStyle}
                                value=""
                                valuePostfix=""
                                footerTitle={locationzedStrings.home.card1_message}
                                footerValue=""
                                iconImageSource={require("../../assets/images/tasks.png")}
                                style={{ backgroundColor: "#e48058" }}
                                onPress={() => {
                                    onPressWorkTaks(false);
                                }}
                            />

                            <ColorfulCard
                                title={locationzedStrings.home.card2_title}
                                value=""
                                valuePostfix=""
                                footerTitle={locationzedStrings.home.card2_message}
                                footerValue=""
                                iconImageSource={require("../../assets/images/porfolios.png")}
                                style={{ backgroundColor: "#26AFE5", marginVertical: 10 }}
                                onPress={() => {
                                    // onPressWorkTaks(false);
                                }}
                            />
                        </View>
                        <View style={styles.taskListCol2}>
                            <ColorfulCard
                                title={locationzedStrings.home.card3_title}
                                value=""
                                valuePostfix=""
                                footerTitle={locationzedStrings.home.card3_message}
                                footerValue=""
                                iconImageSource={require("../../assets/images/alarm-clock.png")}
                                style={{ backgroundColor: "#515ae5" }}
                                onPress={() => {
                                    // onPressWorkTaks(false);
                                }}
                            />

                            <ColorfulCard
                                title={locationzedStrings.home.card4_title}
                                value=""
                                valuePostfix=""
                                footerTitle={locationzedStrings.home.card4_message}
                                footerValue=""
                                iconImageSource={require("../../assets/images/repair-tool.png")}
                                style={{ backgroundColor: "#87c43e", marginVertical: 10 }}
                                onPress={() => {
                                    // onPressWorkTaks(false);
                                }}
                            />
                        </View>
                    </View>
                    <Card style={[styles.customerCardStyle, styles.customerCardBg]}>
                        <View style={styles.criticalView}>
                            <FontAwesome5 style={styles.callIcon} name="exclamation-triangle" size={30} />
                            <Text style={styles.criticalCareInfo}>{locationzedStrings.home.critical_request}</Text>
                        </View>
                        <View style={styles.callView}>
                            <MaterialIcon style={styles.callIcon} name="call" size={30} />
                            <Text style={styles.customerCareCall}>{locationzedStrings.home.customercare_call}</Text>
                        </View>
                        <Text style={styles.customerCareInfo}>{locationzedStrings.home.ivr_message}</Text>
                        <Text style={styles.customerCareInfo}>{locationzedStrings.home.local_assistance}</Text>
                    </Card>
                </View>
            </ScrollView>
        </View>
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
    criticalCareInfo: {
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
        textAlignVertical: "center",
        marginTop: 10,
    },
    iconStyle: {
        alignSelf: "center",
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
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        margin: 6,
    },
    tasksCardStyle: {
        width: windowWidth * 2,
        height: windowHeight * 2,
        justifyContent: "center",
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        margin: 4,
    },
    customerCardStyle: {
        alignSelf: "center",
        width: "95%",
        marginVertical: 10,
        padding: 15,
    },
    criticalView: {
        flexDirection: "row",
        marginLeft: 10,
    },
    callView: {
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        margin: 4,
    },
    callIcon: {
        alignSelf: "center",
        marginTop: 10,
        marginRight: 10,
        color: "#ED7000",
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
    iconBackgroundStyle: {
        backgroundColor: "#fe8f62",
        padding: 30,
        borderTopLeftRadius: 150,
        borderBottomLeftRadius: 150,
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

const mapDispatch = (dispatch: AppThunkDispatch<WorkTasks.ActionInterfaces>) => ({
    onPressWorkTaks: (isOnlyCount: boolean) => dispatch(WorkTasks.Actions.workTasksAndCount(isOnlyCount)),
});

const mapState = (state: RootState) => ({
    isLoading: state.worktasks.loading,
    error: state.worktasks.error,
    // tasks: state.tasks.tasks,
});

const connector = connect(mapState, mapDispatch);

export const HomeScreen = connector(HomeScreenView);
export const HomeScreenHeaderOptions = HeaderOptions;
export const HomeScreenName = "HomeScreen";
