import {
    StyleSheet,
    View,
    Dimensions,
    TextInput,
    FlatList,
    Pressable,
    TouchableOpacity,
    ViewStyle,
    RefreshControl,
} from "react-native";
import { Card, Text, ActivityIndicator, Button } from "react-native-paper";
import React, { useEffect, useState, useRef } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import SwitchSelector from "react-native-switch-selector";

import { AppThunkDispatch, RootState, WorkTasks } from "../../store";
import { WorkTask } from "../../store/WorkTasks/reducer";
import { locationzedStrings } from "../../localization/Localizaton";

const windowWidth = Dimensions.get("window").width / 6;
const windowHeight = Dimensions.get("window").height / 12;

interface WorkTasksScreenProps {
    isLoading: boolean;
    selectedCard: number;
    error: string | null;
    countP1: number;
    countP2P7: number;
    countOverDue: number;
    countDueToday: number;
    countCompleted: number;
    countP1Tasks: WorkTask[];
    countP2P7Tasks: WorkTask[];
    countOverDueTasks: WorkTask[];
    countDueTodayTasks: WorkTask[];
    countCompletedTasks: WorkTask[];
    onSelectWorkTask: (task: WorkTask) => void;
    onRetry: (isOnlyCount: boolean, selectedCard: number) => void;
}

interface TaskCardProps {
    id: number;
    title: string;
    value: number;
    isSelected: boolean;
    onPress: (id: number) => void;
    cardStyle?: ViewStyle; // Add the style prop
    cardBdStyle?: ViewStyle;
}

const WorkTasksScreenView: React.FunctionComponent<WorkTasksScreenProps> = (props) => {
    const {
        onSelectWorkTask,
        isLoading,
        error,
        countP1,
        countP2P7,
        countOverDue,
        countDueToday,
        countCompleted,
        countP1Tasks,
        countP2P7Tasks,
        countCompletedTasks,
        countOverDueTasks,
        countDueTodayTasks,
        selectedCard,
        onRetry,
    } = props;

    const [tasksList, setTasksList] = useState([
        countP1Tasks,
        countP2P7Tasks,
        countCompletedTasks,
        countOverDueTasks,
        countDueTodayTasks,
    ]);

    const [flatListData, setFlatListData] = useState([
        countP1Tasks,
        countP2P7Tasks,
        countCompletedTasks,
        countOverDueTasks,
        countDueTodayTasks,
    ]);

    const filteredUseRef = useRef([
        countP1Tasks,
        countP2P7Tasks,
        countCompletedTasks,
        countOverDueTasks,
        countDueTodayTasks,
    ]);

    const [filter, setFilter] = useState("all");
    const [sortValue, setSortValue] = useState("");
    const [searchText, setSearchText] = useState("");
    const [refreshing, _setRefreshing] = React.useState(false);

    const [isFocus, setIsFocus] = useState(false);

    const [selectedTab, setSelectedTab] = useState(selectedCard);
    console.log("error : ", error);

    const [forceRender, setForceRender] = useState(false);

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
        setTasksList([countP1Tasks, countP2P7Tasks, countCompletedTasks, countOverDueTasks, countDueTodayTasks]);
        setSelectedTab(selectedCard);
        filteredUseRef.current = [
            countP1Tasks,
            countP2P7Tasks,
            countCompletedTasks,
            countOverDueTasks,
            countDueTodayTasks,
        ];
    }, [countP1Tasks, countP2P7Tasks, countOverDueTasks, countDueTodayTasks, countCompletedTasks, selectedCard]);

    useEffect(() => {
        if (isLoading) return;

        // setRefreshing(false);
        filterTasks();
        sortData();
        handleTextChange();
    }, [filter, sortValue, searchText, selectedTab]);

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
                    onPress={() => onRetry(false, selectedCard)}
                    style={{
                        marginVertical: 10,
                    }}
                >
                    Retry
                </Button>
            </View>
        );
    }

    const updateFilteredList = (arrayIndex: number, newArray: WorkTask[], updateUI: boolean) => {
        const updatedArrays = filteredUseRef.current;
        updatedArrays[arrayIndex] = newArray;
        filteredUseRef.current = updatedArrays;
        if (updateUI) {
            setFlatListData(filteredUseRef.current);
            setForceRender(!forceRender);
        }
    };

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
        <Card style={[styles.itemCardStyle, getCardBackgroundStyles()]}>
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

    const getCardBackgroundStyles = () => {
        if (selectedTab == 0) return styles.item1_Bg;
        else if (selectedTab == 1) return styles.item2_Bg;
        else if (selectedTab == 2) return styles.item3_Bg;
        else if (selectedTab == 3) return styles.item4_Bg;
        else return styles.item5_Bg;
    };

    const onRefresh = () => {
        onRetry(false, selectedCard);
    };

    /*
        filterTaks function is to filter based on All, CM, PM
    */
    function filterTasks() {
        if (filter == "cm") {
            const cm = tasksList[selectedTab].filter((item) => {
                return item.TaskType == "Corrective";
            });
            updateFilteredList(selectedTab, cm, false);
        } else if (filter == "pm") {
            const pm = tasksList[selectedTab].filter((item) => {
                return item.TaskType == "Preventive";
            });
            updateFilteredList(selectedTab, pm, false);
        } else {
            const all = tasksList[selectedTab];
            updateFilteredList(selectedTab, all, false);
        }
    }

    /*
        sortData function is to sort based on the DropDown
    */
    function sortData() {
        switch (sortValue) {
            case "sortByLocation":
                updateFilteredList(
                    selectedTab,
                    filteredUseRef.current[selectedTab].sort((location1, location2) =>
                        location1.Address.localeCompare(location2.Address),
                    ),
                    false,
                );
                break;
            case "sortById":
                updateFilteredList(
                    selectedTab,
                    filteredUseRef.current[selectedTab].sort((id1, id2) => id1.ID.localeCompare(id2.ID)),
                    false,
                );
                break;
            case "sortByPriority":
                updateFilteredList(
                    selectedTab,
                    filteredUseRef.current[selectedTab].sort((priority1, priority2) =>
                        alphanumericComparator(priority1.TaskPriority, priority2.TaskPriority),
                    ),
                    false,
                );
                break;
            case "sortByDueDate":
                updateFilteredList(
                    selectedTab,
                    filteredUseRef.current[selectedTab].sort((plannedEnd1, plannedEnd2) => {
                        const dateA = new Date(plannedEnd1.PlannedEnd);
                        const dateB = new Date(plannedEnd2.PlannedEnd);
                        return dateA.getTime() - dateB.getTime();
                    }),
                    false,
                );
                break;
        }
    }

    /*
        handleTextChange function is to filter based on the User Search Text
    */
    const handleTextChange = () => {
        if (searchText.length == 0) {
            updateFilteredList(selectedTab, filteredUseRef.current[selectedTab], true);
            return;
        }
        updateFilteredList(
            selectedTab,
            filteredUseRef.current[selectedTab].filter((obj) => {
                return obj.Address.includes(searchText) || obj.SRID?.includes(searchText);
            }),
            true,
        );
    };

    const renderEmptyList = () => {
        return (
            <Text
                style={[
                    styles.layoutContainer,
                    {
                        textAlign: "center",
                    },
                ]}
            >
                {locationzedStrings.workTasks.noDataAvailable}
            </Text>
        );
    };

    const TaskCardView: React.FC<TaskCardProps> = ({
        id,
        title,
        value,
        cardStyle,
        cardBdStyle,
        isSelected,
        onPress,
    }) => {
        return (
            <TouchableOpacity onPress={() => onPress(id)}>
                <Card style={[cardStyle, cardBdStyle, isSelected && styles.selectedCard]}>
                    <Text style={styles.paragraph}>{title}</Text>
                    <Text style={styles.paragraph}>{value}</Text>
                </Card>
            </TouchableOpacity>
        );
    };

    const handleCardPress = (cardId: number) => {
        setSelectedTab(cardId);
    };

    return (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
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
                        value={sortValue}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setSortValue(item.value);
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
                        <TaskCardView
                            id={0}
                            title="Active P1"
                            value={countP1}
                            isSelected={selectedTab === 0}
                            onPress={handleCardPress}
                            cardStyle={styles.cardStyle}
                            cardBdStyle={styles.card1_Bg}
                        />
                        <TaskCardView
                            id={1}
                            title="Active P2-P7"
                            value={countP2P7}
                            isSelected={selectedTab === 1}
                            onPress={handleCardPress}
                            cardStyle={styles.cardStyle}
                            cardBdStyle={styles.card2_Bg}
                        />
                        <TaskCardView
                            id={2}
                            title="Completed"
                            value={countCompleted}
                            isSelected={selectedTab === 2}
                            onPress={handleCardPress}
                            cardStyle={styles.cardStyle}
                            cardBdStyle={styles.card3_Bg}
                        />
                        <TaskCardView
                            id={3}
                            title="OverDue"
                            value={countOverDue}
                            isSelected={selectedTab === 3}
                            onPress={handleCardPress}
                            cardStyle={styles.cardStyle}
                            cardBdStyle={styles.card4_Bg}
                        />
                        <TaskCardView
                            id={4}
                            title="Due Today"
                            value={countDueToday}
                            isSelected={selectedTab === 4}
                            onPress={handleCardPress}
                            cardStyle={styles.cardStyle}
                            cardBdStyle={styles.card5_Bg}
                        />
                    </View>
                </View>
                <View style={styles.taskContainer}>
                    <FlatList
                        data={flatListData[selectedTab]}
                        extraData={flatListData[selectedTab]}
                        ListEmptyComponent={renderEmptyList}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => onSelectWorkTask(item)}>
                                <Item
                                    srid={item.ID}
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
                        keyExtractor={(item, idx) => `${item._id}-${item.SRID}-${idx}`}
                    />
                </View>
            </View>
        </RefreshControl>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        display: "flex",
        height: "100%",
        width: "100%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    cardContainer: {
        width: 350,
        height: 200,
    },
    card: {
        height: "100%",
        width: "100%",
        borderColor: "rgba(255,255,255,0.3)",
        borderRadius: 20,
        borderWidth: 2,
    },
    layoutContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#f8f8f8",
        paddingVertical: 20,
        flex: 1,
    },
    workTaskContainer: {
        width: "100%",
        height: "100%",
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
    selectedCard: {
        transform: [{ scale: 1.2 }], // Apply zoom effect to the selected card
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
        opacity: 40,
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
    item1_Bg: {
        backgroundColor: "#f7bcb7",
    },
    item2_Bg: {
        backgroundColor: "#abedec",
    },
    item3_Bg: {
        backgroundColor: "#aaf2aa",
    },
    item4_Bg: {
        backgroundColor: "#f0c7a3",
    },
    item5_Bg: {
        backgroundColor: "#a7d9f2",
    },
    glasscard: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
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
    onSelectWorkTask: (workTask: WorkTask) => dispatch(WorkTasks.Actions.navigateToWorkTask(workTask._id)),
    onRetry: (isOnlyCount: boolean, selectedCard: number) =>
        dispatch(WorkTasks.Actions.getCountsAndTasks(isOnlyCount, selectedCard)),
});

const mapState = (state: RootState) => ({
    isLoading: state.worktasks.loading,
    selectedCard: state.worktasks.selectedCard,
    error: state.worktasks.error,
    countP1: state.worktasks.countP1,
    countP2P7: state.worktasks.countP2P7,
    countOverDue: state.worktasks.countOverDue,
    countDueToday: state.worktasks.countDueToday,
    countCompleted: state.worktasks.countCompleted,
    countP1Tasks: state.worktasks.countP1Tasks,
    countP2P7Tasks: state.worktasks.countP2P7Tasks,
    countOverDueTasks: state.worktasks.countOverDueTasks,
    countDueTodayTasks: state.worktasks.countDueTodayTasks,
    countCompletedTasks: state.worktasks.countCompletedTasks,
});

const connector = connect(mapState, mapDispatch);

export const WorkTasksScreen = connector(WorkTasksScreenView);
export const WorkTasksScreenHeaderOptions = HeaderOptions;
export const WorkTasksScreenName = "My Work Tasks";
