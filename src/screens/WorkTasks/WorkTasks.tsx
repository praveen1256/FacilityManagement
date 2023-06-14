import { StyleSheet, View, Dimensions, ScrollView, TextInput, FlatList, Pressable } from "react-native";
import { Card, Text } from "react-native-paper";
import React, { useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Dropdown } from "react-native-element-dropdown";
import { connect } from "react-redux";

import { AppThunkDispatch, RootState, WorkTasks } from "../../store";

const windowWidth = Dimensions.get("window").width / 6;
const windowHeight = Dimensions.get("window").height / 12;

// const LeafShape = (props: any) => <View style={[styles.square, props.style]}>{props.children}</View>;

interface WorkTasksScreenProps {
    isAuthStateInitialized?: boolean;
    // onPressContinue: () => void;
}

const WorkTasksScreenView: React.FunctionComponent<WorkTasksScreenProps> = () => {
    // type Mode = "elevated" | "outlined" | "contained";
    // const [selectedMode, setSelectedMode] = React.useState("elevated" as Mode);
    // const [modalVisible, setModalVisible] = useState(false);
    // const [searchText, setSearchText] = useState("");

    const data = [
        { label: "Sort By Location", value: "1" },
        { label: "Sort By ID", value: "2" },
        { label: "Sort By Priority", value: "3" },
        { label: "Sort By Due Date", value: "4" },
        { label: "Sort By Status", value: "5" },
    ];

    type ItemProps = {
        priority: string;
        title: string;
        info1: string;
        info2: string;
        info3: string;
        data1: string;
        data2: string;
        data3: string;
    };

    const Item = ({ priority, title, info1, info2, info3, data1, data2, data3 }: ItemProps) => (
        <Card style={[styles.itemCardStyle]}>
            <Text style={styles.itemPriority}>{priority}</Text>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemInfo1}>{info1}</Text>
            <Text style={styles.itemInfo2}>{info2}</Text>
            <Text style={styles.itemInfo3}>{info3}</Text>
            <Text style={styles.itemInfo4}>{data1}</Text>
            <Text style={styles.itemInfo5}>{data2}</Text>
            <Text style={styles.itemInfo6}>{data3}</Text>
        </Card>
    );

    const [value, setValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flatListData: any = [
        {
            id: "1",
            priority: "P3",
            title: "SR-10286097",
            info1: "HVAC",
            info2: "AREA",
            info3: "USE FOR VZW MOBILE EQPT A. || 20000003839 || BASKING RIDGE || NJ",
            data1: "05/17/2023, 14:45:48",
            data2: "test spot cooler",
            data3: "Corrective",
        },
        {
            id: "2",
            priority: "P3",
            title: "SR-10286097",
            info1: "HVAC",
            info2: "AREA",
            info3: "USE FOR VZW MOBILE EQPT A. || 20000003839 || BASKING RIDGE || NJ",
            data1: "05/17/2023, 14:45:48",
            data2: "test spot cooler",
            data3: "Corrective",
        },
        {
            id: "3",
            priority: "P3",
            title: "SR-10286097",
            info1: "HVAC",
            info2: "AREA",
            info3: "USE FOR VZW MOBILE EQPT A. || 20000003839 || BASKING RIDGE || NJ",
            data1: "05/17/2023, 14:45:48",
            data2: "test spot cooler",
            data3: "Corrective",
        },
    ];

    // const [workTasksData, setWorkTasksData] = useState([]);

    // const filterData = () => {
    //     // if (searchData.length == 0) setWorkTasksData(flatListData);
    // };

    return (
        <View style={styles.workTaskContainer}>
            {/* <Text>{JSON.stringify(tasks)}</Text> */}
            <View style={styles.headingContainer}>
                <View style={styles.leftHeading}>
                    <Text style={styles.headerText}>VERIZON</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.subHeaderText}>My Work Tasks</Text>
                    <Text style={styles.techNameText}>Tech Name</Text>
                </View>
            </View>
            <TextInput
                style={styles.textInputStyle}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
                // onChangeText={(textEntered) => {
                //     setSearchText(textEntered);
                // }}
                // onEndEditing={() => {
                //     filterData();
                // }}
            />
            <View style={styles.flexRow}>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    mode="modal"
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "Select item" : "..."}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    // renderLeftIcon={() => (
                    //     <AntDesign
                    //         style={styles.icon}
                    //         color={isFocus ? 'blue' : 'black'}
                    //         name="Safety"
                    //         size={20}
                    //     />
                    // )}
                />
                <View style={styles.flexRow}>
                    <Text style={styles.allStyle}>All</Text>
                    <Text style={styles.cmStyle}>CM</Text>
                    <Text style={styles.pmStyle}>PM</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Card style={[styles.cardStyle, styles.card1_Bg]}>
                        <Text style={styles.paragraph}>Active P1</Text>
                        <Text style={styles.paragraph}>0</Text>
                    </Card>
                    <Card style={[styles.cardStyle, styles.card1_Bg]}>
                        <Text style={styles.paragraph}>Active P2-P7</Text>
                        <Text style={styles.paragraph}>0</Text>
                    </Card>
                    {/* </View>

                    <View style={styles.view1}> */}

                    <Card style={[styles.cardStyle, styles.card3_Bg]}>
                        <Text style={styles.paragraph}>Completed</Text>
                        <Text style={styles.paragraph}>0</Text>
                    </Card>
                    <Card style={[styles.cardStyle, styles.card2_Bg]}>
                        <Text style={styles.paragraph}>OverDue</Text>
                        <Text style={styles.paragraph}>0</Text>
                    </Card>
                    <Card style={[styles.cardStyle, styles.card4_Bg]}>
                        <Text style={styles.paragraph}>Due Today</Text>
                        <Text style={styles.paragraph}>0</Text>
                    </Card>
                </View>
            </View>
            <ScrollView horizontal={false}>
                <View style={styles.taskContainer}>
                    <FlatList
                        data={flatListData}
                        renderItem={({ item }) => (
                            <Pressable
                            // onPress={props.onPress}
                            >
                                <Item
                                    title={item.title}
                                    priority={item.priority}
                                    info1={item.info1}
                                    info2={item.info2}
                                    info3={item.info3}
                                    data1={item.data1}
                                    data2={item.data2}
                                    data3={item.data3}
                                />
                            </Pressable>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    workTaskContainer: {
        width: "100%",
        height: "100%",
        // backgroundColor: "#222D32",
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
        fontSize: 10,
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
    allStyle: {
        backgroundColor: "#FF0000",
        width: 70,
        height: 35,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        textAlignVertical: "center",
        textAlign: "center",
    },
    cmStyle: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 1,
        width: 70,
        height: 35,
        textAlignVertical: "center",
        textAlign: "center",
    },
    pmStyle: {
        backgroundColor: "#FFFFFF",
        width: 70,
        height: 35,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        textAlignVertical: "center",
        textAlign: "center",
    },
    itemCardStyle: {
        margin: 10,
        padding: 15,
        backgroundColor: "#FFFFFF",
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    button: {
        width: 100,
        margin: 5,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#222D32",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    headerText: {
        color: "#222D32",
        fontWeight: "bold",
        fontSize: 25,
        marginVertical: 10,
    },
    subHeaderText: {
        flex: 1,
        color: "#222D32",
        fontWeight: "bold",
        fontSize: 16,
        marginHorizontal: 10,
    },
    techNameText: {
        color: "#222D32",
        fontWeight: "bold",
        fontSize: 16,
        justifyContent: "flex-end",
        marginHorizontal: 10,
    },
    headingContainer: {
        flexDirection: "column",
        display: "flex",
        marginBottom: 10,
    },
    leftHeading: {
        color: "#222D32",
        fontSize: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    flexRow: {
        flexDirection: "row",
    },
    textInputStyle: {
        height: "5%",
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: "#222D32",
        backgroundColor: "#FFFFFF",
    },
    dropdown: {
        width: 165,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginHorizontal: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    item: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    itemPriority: {
        fontSize: 14,
        alignSelf: "flex-end",
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    itemInfo1: {
        fontSize: 14,
    },
    itemInfo2: {
        fontSize: 14,
        fontWeight: "bold",
    },
    itemInfo3: {
        fontSize: 12,
    },
    itemInfo4: {
        fontSize: 14,
        fontWeight: "bold",
    },
    itemInfo5: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemInfo6: {
        fontSize: 14,
        alignSelf: "flex-end",
    },
});

const HeaderOptions: NativeStackHeaderProps["options"] = {
    headerShown: true,
};

// const mapDispatch = (dispatch: AppThunkDispatch<AppState.ActionInterfaces>) => ({
//     onPressContinue: () => console.log("pressContinue!!"),
// });

// const mapState = (state: RootState) => ({
//     isAuthStateInitialized: state.auth.isIntialized,
// });

// const connector = connect(mapState, mapDispatch);

// export const WorkTasksScreen = connector(WorkTasksScreenView);

const mapDispatch = (dispatch: AppThunkDispatch<WorkTasks.ActionInterfaces>) => ({
    onPressWorkTaks: (isOnlyCount: boolean) => dispatch(WorkTasks.Actions.workTasksAndCount(isOnlyCount)),
});

const mapState = (state: RootState) => ({
    tasks: state.worktasks.tasks,
});

const connector = connect(mapState, mapDispatch);

export const WorkTasksScreen = connector(WorkTasksScreenView);
export const WorkTasksScreenHeaderOptions = HeaderOptions;
export const WorkTasksScreenName = "WorkTasksScreen";
