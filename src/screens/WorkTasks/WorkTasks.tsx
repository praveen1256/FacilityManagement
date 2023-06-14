import { StyleSheet, View, Dimensions, TextInput, FlatList, Pressable } from "react-native";
import { Card, Text } from "react-native-paper";
import React, { useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Dropdown } from "react-native-element-dropdown";
import { connect } from "react-redux";

import { AppThunkDispatch, RootState, WorkTasks } from "../../store";

const windowWidth = Dimensions.get("window").width / 6;
const windowHeight = Dimensions.get("window").height / 12;

interface WorkTasksScreenProps {
    tasks: {
        Building: string;
        Description: string;
        Address: string;
        TaskPriority: string;
        ModifiedDateTime: string;
        SRCreatedDateTime: string;
        LegacyGLC: null;
        ServiceClass: string;
        ResourceAssignmentStatus: string;
        PlannedEnd: string;
        TaskReIssueReason: string;
        Currency: string;
        TaskType: string;
        SRRecordID: string;
        ID: string;
        SRDescription: string;
        SRID: string;
        EquipmentAlias: null;
        Status: string;
        CreatedFromMobile: string;
        RequestClass: string;
        PlannedStart: string;
        LocationCode: string;
        SRServiceRequested: string;
        ResolutionType: string;
        City: string;
        TaskName: string;
        State: string;
        _id: string;
        PrimaryWorkLocation: string;
        CreatedDateTime: string;
    }[];
    // onPressWorkTaks: (isOnlyCount: boolean) => void;
}

const WorkTasksScreenView: React.FunctionComponent<WorkTasksScreenProps> = (tasks) => {
    const data = [
        { label: "Sort By Location", value: "1" },
        { label: "Sort By ID", value: "2" },
        { label: "Sort By Priority", value: "3" },
        { label: "Sort By Due Date", value: "4" },
        { label: "Sort By Status", value: "5" },
    ];

    type ItemProps = {
        srid: string;
        priority: string;
        address: string;
        city: string;
        description: string;
        createdDateTime: string;
        taskReIssueReason: string;
        taskType: string;
    };

    const Item = ({
        srid,
        priority,
        address,
        city,
        description,
        createdDateTime,
        taskReIssueReason,
        taskType,
    }: ItemProps) => (
        <Card style={[styles.itemCardStyle]}>
            <Text style={styles.itemPriority}>{priority}</Text>
            <Text style={styles.itemTitle}>{srid}</Text>
            <Text style={styles.itemInfo1}>{address}</Text>
            <Text style={styles.itemInfo2}>{city}</Text>
            <Text style={styles.itemInfo3}>{description}</Text>
            <Text style={styles.itemInfo4}>{createdDateTime}</Text>
            <Text style={styles.itemInfo5}>{taskReIssueReason}</Text>
            <Text style={styles.itemInfo6}>{taskType}</Text>
        </Card>
    );

    const [value, setValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={styles.workTaskContainer}>
            <View style={styles.headingContainer}>
                <View style={styles.leftHeading}>
                    <Text style={styles.headerText}>VERIZON</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.subHeaderText}>My Work Tasks</Text>
                    <Text style={styles.techNameText}>Tech Name</Text>
                </View>
            </View>
            <TextInput style={styles.textInputStyle} underlineColorAndroid="transparent" placeholder="Search Here" />
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
            <View style={styles.taskContainer}>
                <FlatList
                    data={tasks.tasks}
                    renderItem={({ item }) => (
                        <Pressable
                        // onPress={props.onPress}
                        >
                            <Item
                                srid={item.SRID}
                                priority={item.TaskPriority}
                                address={item.Address}
                                city={item.City}
                                description={item.Description}
                                createdDateTime={item.CreatedDateTime}
                                taskReIssueReason={item.TaskReIssueReason}
                                taskType={item.TaskType}
                            />
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.ID}
                />
            </View>
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
