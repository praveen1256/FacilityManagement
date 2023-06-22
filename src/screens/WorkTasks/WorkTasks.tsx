import { StyleSheet, View, Dimensions, TextInput, FlatList, Pressable } from "react-native";
import { Card, Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import SwitchSelector from "react-native-switch-selector";

import { AppThunkDispatch, RootState, WorkTasks } from "../../store";
import { WorkTask as IWorkTask } from "../../store/WorkTasks/reducer";

const windowWidth = Dimensions.get("window").width / 6;
const windowHeight = Dimensions.get("window").height / 12;

interface WorkTaskInterface {
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
}

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
    onSelectWorkTask: (task: IWorkTask) => void;
}

const WorkTasksScreenView: React.FunctionComponent<WorkTasksScreenProps> = ({ tasks, onSelectWorkTask }) => {
    const [tasksList, _setTasksList] = useState(tasks);
    const [switchSelectorList, setSwitchSelectorList] = useState(tasks);
    const [filteredList, setFilteredList] = useState(tasks);

    const [filter, setFilter] = useState("all");
    const [value, setValue] = useState("");

    const [isFocus, setIsFocus] = useState(false);
    const [searchText, setSearchText] = useState("");

    const switchoptions = [
        { label: "All", value: "all" },
        { label: "CM", value: "cm" },
        { label: "PM", value: "pm" },
    ];

    const data = [
        { label: "Sort By Location", value: "sortByLocation" },
        { label: "Sort By ID", value: "sortById" },
        { label: "Sort By Priority", value: "sortByPriority" },
        { label: "Sort By Due Date", value: "sortByDueDate" },
    ];

    useEffect(() => {
        filterTasks();
        sortData();
        handleTextChange();
    }, [filter, value, searchText]);

    useEffect(() => {
        setFilteredList(switchSelectorList);
    }, [switchSelectorList]);

    type ItemProps = {
        srid: string;
        priority: string;
        requestClass: string;
        address: string;
        building: string;
        locationCode: string;
        city: string;
        state: string;
        description: string;
        plannedEnd: string;
        taskType: string;
    };

    const Item = ({
        srid,
        priority,
        requestClass,
        address,
        building,
        locationCode,
        city,
        state,
        description,
        plannedEnd,
        taskType,
    }: ItemProps) => (
        <Card style={[styles.itemCardStyle]}>
            <View style={styles.flexRow}>
                <MaterialIcon style={styles.settingIcon} name="settings" size={30} />
                <View style={styles.paramsView}>
                    <Text style={[styles.itemPriority, styles.circleShape]}>{priority}</Text>
                    <Text style={styles.itemTitle}>{srid}</Text>
                    <Text style={styles.itemInfo1}>{requestClass}</Text>
                    <Text style={styles.itemInfo2}>{address}</Text>
                    <Text style={styles.itemInfo3}>{building}</Text>
                    <Text style={styles.itemInfo4}>
                        {locationCode} | {city} | {state}
                    </Text>
                    <Text style={styles.itemInfo5}>{plannedEnd}</Text>
                    <Text style={styles.itemInfo5}>{description}</Text>
                    <Text style={styles.itemInfo6}>{taskType}</Text>
                </View>
            </View>
            <View style={styles.line} />
        </Card>
    );

    const alphanumericComparator = (a: string, b: string) => {
        const numRegex = /[0-9]+/;
        const aNumMatch = a.match(numRegex);
        const bNumMatch = b.match(numRegex);

        if (aNumMatch && bNumMatch) {
            const aNum = parseInt(aNumMatch[0]);
            const bNum = parseInt(bNumMatch[0]);
            if (aNum !== bNum) {
                return bNum - aNum;
            }
        }

        return a.localeCompare(b);
    };

    /*
        filterTaks function is to filter based on All, CM, PM
    */
    function filterTasks() {
        if (filter == "cm") {
            const cmArray: WorkTaskInterface[] = tasksList.filter((item) => {
                return item.TaskType == "Corrective";
            });
            setSwitchSelectorList(cmArray);
            setFilteredList(cmArray);
        } else if (filter == "pm") {
            const pmArray: WorkTaskInterface[] = tasksList.filter((item) => {
                return item.TaskType == "Preventive";
            });
            setSwitchSelectorList(pmArray);
            setFilteredList(pmArray);
        } else {
            const allArray = tasksList;
            setSwitchSelectorList(allArray);
            setFilteredList(allArray);
        }
    }

    /*
        sortData function is to sort based on the DropDown
    */
    function sortData() {
        switch (value) {
            case "sortByLocation":
                const sortByLocation: WorkTaskInterface[] = switchSelectorList.sort((location1, location2) =>
                    location1.Address.localeCompare(location2.Address),
                );
                setSwitchSelectorList(sortByLocation);
                setFilteredList(sortByLocation);
                break;
            case "sortById":
                const sortById: WorkTaskInterface[] = switchSelectorList.sort((id1, id2) =>
                    id1.ID.localeCompare(id2.ID),
                );
                setSwitchSelectorList(sortById);
                setFilteredList(sortById);
                break;
            case "sortByPriority":
                const sortByPriority: WorkTaskInterface[] = switchSelectorList.sort((priority1, priority2) =>
                    alphanumericComparator(priority1.TaskPriority, priority2.TaskPriority),
                );
                setSwitchSelectorList(sortByPriority);
                setFilteredList(sortByPriority);
                break;
            case "sortByDueDate":
                const sortByDueDate: WorkTaskInterface[] = switchSelectorList.sort((plannedEnd1, plannedEnd2) => {
                    const dateA = new Date(plannedEnd1.PlannedEnd);
                    const dateB = new Date(plannedEnd2.PlannedEnd);
                    return dateA.getTime() - dateB.getTime();
                });
                setSwitchSelectorList(sortByDueDate);
                setFilteredList(sortByDueDate);
                break;
            default:
            // setSwitchSelectorList(tasks.tasks);
        }
    }

    /*
        handleTextChange function is to filter based on the User Search Text
    */
    const handleTextChange = () => {
        if (searchText.length == 0) {
            setFilteredList(switchSelectorList);
            return;
        }
        const filteredResults = switchSelectorList.filter((obj) => {
            return obj.Address.includes(searchText) || obj.SRID?.includes(searchText);
        });
        setFilteredList(filteredResults);
    };

    const renderEmptyList = () => {
        return (
            <View>
                <Text style={styles.noDataAvailable}>No data available</Text>
            </View>
        );
    };

    return (
        <View style={styles.workTaskContainer}>
            <SwitchSelector
                buttonColor="#384247"
                selectedColor="#FFFFFF"
                borderColor="#384247"
                textColor="#384247"
                fontSize={16}
                style={styles.switchSelectorStyle}
                options={switchoptions}
                initial={0}
                onPress={(value: string) => {
                    setFilter(value);
                }}
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
                    }}
                />
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={setSearchText}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here"
                    value={searchText}
                />
            </View>
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Card style={[styles.cardStyle, styles.card1_Bg]}>
                        <Text style={styles.paragraph}>Active P1</Text>
                        <Text style={styles.paragraph}>0</Text>
                    </Card>
                    <Card style={[styles.cardStyle, styles.card2_Bg]}>
                        <Text style={styles.paragraph}>Active P2-P7</Text>
                        <Text style={styles.paragraph}>0</Text>
                    </Card>
                    <Card style={[styles.cardStyle, styles.card3_Bg]}>
                        <Text style={styles.paragraph}>Completed</Text>
                        <Text style={styles.paragraph}>0</Text>
                    </Card>
                    <Card style={[styles.cardStyle, styles.card4_Bg]}>
                        <Text style={styles.paragraph}>OverDue</Text>
                        <Text style={styles.paragraph}>0</Text>
                    </Card>
                    <Card style={[styles.cardStyle, styles.card5_Bg]}>
                        <Text style={styles.paragraph}>Due Today</Text>
                        <Text style={styles.paragraph}>0</Text>
                    </Card>
                </View>
            </View>
            <View style={styles.taskContainer}>
                <FlatList
                    data={filteredList}
                    extraData={filteredList}
                    ListEmptyComponent={renderEmptyList}
                    renderItem={({ item }) => (
                        <Pressable
                            // onPress={props.onPress}
                            onPress={() => onSelectWorkTask(item)}
                        >
                            <Item
                                srid={item.SRID}
                                priority={item.TaskPriority}
                                requestClass={item.RequestClass}
                                address={item.Address}
                                building={item.Building}
                                locationCode={item.LocationCode}
                                city={item.City}
                                state={item.State}
                                description={item.Description}
                                plannedEnd={item.PlannedEnd}
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
    // container: {
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     paddingTop: 50,
    //     backgroundColor: "#ecf0f1",
    // },
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
        backgroundColor: "#D52818",
        width: 70,
        height: 35,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        textAlignVertical: "center",
        textAlign: "center",
    },
    tagStyle: {
        backgroundColor: "#FFFFFF",
        textAlign: "center",
        borderRadius: 10,
        paddingHorizontal: 23,
        paddingVertical: 20,
    },
    tagTextStyle: {
        color: "#222D32",
    },
    cmStyle: {
        backgroundColor: "#FFFFFF",
        textAlign: "center",
        paddingHorizontal: 23,
        paddingVertical: 12,
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
    switchSelectorStyle: {
        margin: 5,
        borderRadius: 0,
    },
    itemCardStyle: {
        margin: 10,
        paddingHorizontal: 5,
        paddingTop: 15,
        paddingBottom: 1,
        backgroundColor: "#FFFFFF",
    },
    settingIcon: {
        alignSelf: "center",
        margin: 10,
        color: "#D52818",
    },
    paramsView: {
        flex: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
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
        backgroundColor: "#1FA09E",
    },
    card3_Bg: {
        backgroundColor: "#006600",
    },
    card4_Bg: {
        backgroundColor: "#ED7000",
    },
    card5_Bg: {
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
        flex: 1,
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
    noDataAvailable: {
        color: "#222D32",
        fontWeight: "bold",
        display: "flex",
        flex: 1,
        fontSize: 24,
        // justifyContent: "center",
        // alignItems: "center",
        alignSelf: "center",
        marginHorizontal: 10,
    },
    headingContainer: {
        flexDirection: "column",
        display: "flex",
        marginVertical: 10,
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
        flex: 1,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: "#222D32",
        backgroundColor: "#FFFFFF",
    },
    dropdown: {
        flex: 0.5,
        width: 165,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginHorizontal: 5,
        marginVertical: 5,
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
        paddingHorizontal: 15,
        paddingVertical: 5,
        color: "#FFFFFF",
        alignSelf: "flex-end",
        borderRadius: 15,
        backgroundColor: "#1FA09E",
    },
    circleShape: {
        // width: 50,
        // borderRadius: 50 / 2,
        // backgroundColor: "#1FA09E",
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
    line: {
        height: 2,
        backgroundColor: "#D52818",
        borderRadius: 5,
        flex: 1,
    },
});

const HeaderOptions: NativeStackHeaderProps["options"] = {
    headerShown: true,
};

const mapDispatch = (dispatch: AppThunkDispatch<WorkTasks.ActionInterfaces>) => ({
    onPressWorkTaks: (isOnlyCount: boolean) => dispatch(WorkTasks.Actions.workTasksAndCount(isOnlyCount)),
    onSelectWorkTask: (workTask: IWorkTask) => dispatch(WorkTasks.Actions.navigateToWorkTask(workTask._id)),
});

const mapState = (state: RootState) => ({
    tasks: state.worktasks.tasks,
});

const connector = connect(mapState, mapDispatch);

export const WorkTasksScreen = connector(WorkTasksScreenView);
export const WorkTasksScreenHeaderOptions = HeaderOptions;
export const WorkTasksScreenName = "My Work Tasks";
