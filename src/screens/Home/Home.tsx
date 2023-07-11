import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Modal,
    SafeAreaView,
    TouchableOpacity,
    Animated,
    RefreshControl,
} from "react-native";
import { Card, Text, ActivityIndicator, Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import ColorfulCard from "react-native-colorful-card";

import FM_Header from "../../components/FM_Header";
// import Header from "../../components/Header";
import { AppThunkDispatch, Authentication, RootState, WorkTasks } from "../../store";
import { locationzedStrings } from "../../localization/Localizaton";

const windowWidth = Dimensions.get("window").width / 4.5;
const windowHeight = Dimensions.get("window").height / 12;

interface HomeScreenProps {
    isAuthStateInitialized?: boolean;
    isLoading?: boolean;
    error: string | null;
    userName: string;
    countP1: number;
    countP2P7: number;
    countOverDue: number;
    countDueToday: number;
    countCompleted: number;
    // tasks: {
    //     _id: number;
    // }[];
    // onPressWorkTaks: (isOnlyCount: boolean, selectedCard: number) => void;
    onPressLogout: () => void;
    getCountsOrTasks: (isOnlyCount: boolean, selectedCard: number) => void;
}

const HomeScreenView: React.FunctionComponent<HomeScreenProps> = ({
    // onPressWorkTaks,
    onPressLogout,
    getCountsOrTasks,
    userName,
    countP1,
    countP2P7,
    countOverDue,
    countDueToday,
    isLoading,
    error,
}) => {
    // const isLoginPage = false;
    console.log("error : ", error);
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const [visible, setVisible] = useState(false);
    const [refreshing, _setRefreshing] = React.useState(false);
    const options = [
        {
            title: "Help",
        },
        {
            title: "LogOut",
        },
    ];

    useEffect(() => {
        getCountsOrTasks(true, 0);
    }, []);

    if (isLoading)
        return (
            <View
                style={[
                    styles.layoutContainer,
                    {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    },
                ]}
            >
                <ActivityIndicator animating={true} />
                <Text>Loading...</Text>
            </View>
        );
    else if (error) {
        return (
            <View
                style={[
                    styles.layoutContainer,
                    {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    },
                ]}
            >
                <Text>{error}</Text>
                <Button
                    mode="contained"
                    onPress={() => getCountsOrTasks(true, 0)}
                    style={{
                        marginVertical: 10,
                    }}
                >
                    Retry
                </Button>
            </View>
        );
    } else
        return (
            <RefreshControl refreshing={refreshing} onRefresh={() => getCountsOrTasks(true, 0)}>
                <View style={styles.homeContainer}>
                    <View style={styles.flexRow}>
                        <View style={styles.flexRowPaddingVertical}>
                            <Text style={styles.textLeft}>V</Text>
                            <FontAwesome5 style={styles.checkIcon} name="check" size={20} />
                        </View>
                        <View style={styles.userName}>
                            <Text style={styles.loggedInUserName}>{userName}</Text>
                        </View>
                        <TouchableOpacity style={styles.optionIcon} onPress={() => setVisible(true)}>
                            <FontAwesome5 style={styles.ellipsisIcon} name="ellipsis-v" size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.greyLine} />
                    <ScrollView>
                        <View>
                            <FM_Header />
                            <View style={styles.container}>
                                <View style={styles.view1}>
                                    <AnimatedTouchable
                                        onPress={() => {
                                            getCountsOrTasks(false, 0);
                                        }}
                                    >
                                        <Card style={[styles.cardStyle, styles.card1_Bg]}>
                                            <Text style={styles.paragraph}>
                                                {locationzedStrings.home.card1_count_title}
                                            </Text>
                                            <Text style={styles.paragraph}>{countP1}</Text>
                                        </Card>
                                    </AnimatedTouchable>
                                    <AnimatedTouchable
                                        onPress={() => {
                                            getCountsOrTasks(false, 1);
                                        }}
                                    >
                                        <Card style={[styles.cardStyle, styles.card2_Bg]}>
                                            <Text style={styles.paragraph}>
                                                {locationzedStrings.home.card2_count_title}
                                            </Text>
                                            <Text style={styles.paragraph}>{countP2P7}</Text>
                                        </Card>
                                    </AnimatedTouchable>
                                    <AnimatedTouchable
                                        onPress={() => {
                                            getCountsOrTasks(false, 4);
                                        }}
                                    >
                                        <Card style={[styles.cardStyle, styles.card3_Bg]}>
                                            <Text style={styles.paragraph}>
                                                {locationzedStrings.home.card3_count_title}
                                            </Text>
                                            <Text style={styles.paragraph}>{countDueToday}</Text>
                                        </Card>
                                    </AnimatedTouchable>
                                    <AnimatedTouchable
                                        onPress={() => {
                                            getCountsOrTasks(false, 3);
                                        }}
                                    >
                                        <Card style={[styles.cardStyle, styles.card4_Bg]}>
                                            <Text style={styles.paragraph}>
                                                {locationzedStrings.home.card4_count_title}
                                            </Text>
                                            <Text style={styles.paragraph}>{countOverDue}</Text>
                                        </Card>
                                    </AnimatedTouchable>
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
                                            getCountsOrTasks(false, 0);
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
                                            console.log("Card 2 Selected");
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
                                            console.log("Card 3 Selected");
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
                                            console.log("Card 4 Selected");
                                        }}
                                    />
                                </View>
                            </View>
                            <Card style={[styles.customerCardStyle, styles.customerCardBg]}>
                                <View style={styles.criticalView}>
                                    <FontAwesome5 style={styles.callIcon} name="exclamation-triangle" size={30} />
                                    <Text style={styles.criticalCareInfo}>
                                        {locationzedStrings.home.critical_request}
                                    </Text>
                                </View>
                                <View style={styles.callView}>
                                    <MaterialIcon style={styles.callIcon} name="call" size={30} />
                                    <Text style={styles.customerCareCall}>
                                        {locationzedStrings.home.customercare_call}
                                    </Text>
                                </View>
                                <Text style={styles.customerCareInfo}>{locationzedStrings.home.ivr_message}</Text>
                                <Text style={styles.customerCareInfo}>{locationzedStrings.home.local_assistance}</Text>
                            </Card>
                        </View>
                    </ScrollView>
                    <Modal transparent visible={visible}>
                        <SafeAreaView style={{ flex: 1 }}>
                            <View style={styles.popup}>
                                {options.map((option, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.flexRow}
                                        onPress={() => {
                                            if (option.title == "Help") console.log("Menu Option Clicked 1");
                                            else onPressLogout();
                                            setVisible(false);
                                        }}
                                    >
                                        <FontAwesome5 style={styles.popUpIcon} name="check" size={20} />
                                        <Text>{option.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </SafeAreaView>
                    </Modal>
                </View>
            </RefreshControl>
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
        backgroundColor: "#1FA09E",
    },
    card3_Bg: {
        backgroundColor: "#0277B4",
    },
    card4_Bg: {
        backgroundColor: "#ED7000",
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
    popUpIcon: {
        alignSelf: "center",
        marginHorizontal: 5,
        color: "#D52818",
    },
    flexRow: {
        flexDirection: "row",
        padding: 15,
    },
    ellipsisIcon: {
        color: "#D52818",
        marginEnd: 15,
    },
    textLeft: {
        color: "#FFFFFF",
        fontSize: 25,
        width: "28%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    checkIcon: {
        marginStart: 5,
        color: "#D52818",
    },
    flexRowPaddingVertical: {
        flexDirection: "row",
        width: "15%",
    },
    userName: {
        width: "75%",
        justifyContent: "center",
        alignItems: "center",
    },
    optionIcon: {
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
    },
    greyLine: {
        borderWidth: 0.5,
        borderColor: "grey",
        width: "100%",
        marginBottom: 5,
    },
    loggedInUserName: {
        color: "#FFFFFF",
        fontSize: 15,
    },
    layoutContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#f8f8f8",
        paddingVertical: 20,
        flex: 1,
    },
});

const HeaderOptions: NativeStackHeaderProps["options"] = {
    headerShown: false,
};

const mapDispatch = (dispatch: AppThunkDispatch<WorkTasks.ActionInterfaces>) => ({
    // onPressWorkTaks: (isOnlyCount: boolean, selectedCard: number) =>
    //     dispatch(WorkTasks.Actions.getCountsAndTasks(isOnlyCount, selectedCard)),
    onPressLogout: () => dispatch(Authentication.Actions.logout()),
    getCountsOrTasks: (isOnlyCount: boolean, selectedCard: number) =>
        dispatch(WorkTasks.Actions.getCountsAndTasks(isOnlyCount, selectedCard)),
});

const mapState = (state: RootState) => ({
    isLoading: state.worktasks.loading,
    error: state.worktasks.error,
    userName: state.auth.loginUserName,
    countP1: state.worktasks.countP1,
    countP2P7: state.worktasks.countP2P7,
    countOverDue: state.worktasks.countOverDue,
    countDueToday: state.worktasks.countDueToday,
    countCompleted: state.worktasks.countCompleted,
});

const connector = connect(mapState, mapDispatch);

export const HomeScreen = connector(HomeScreenView);
export const HomeScreenHeaderOptions = HeaderOptions;
export const HomeScreenName = "HomeScreen";
