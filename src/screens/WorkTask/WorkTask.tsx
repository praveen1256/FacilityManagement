import React, { useEffect } from "react";
import { LayoutAnimation, Platform, RefreshControl, ScrollView, StyleSheet, UIManager, View } from "react-native";
import { List, Text, IconButton, ActivityIndicator, HelperText, Avatar, Card } from "react-native-paper";
import { NativeStackHeaderProps, NativeStackScreenProps } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FlipCard from "react-native-flip-card";

import { useAppTheme } from "../../theme";
import { RootStackParamList } from "../../Navigator";
import { AppThunkDispatch, RootState, WorkTask } from "../../store";
import { EventLog, FullWorkTask, TimeLogCategory, TimeLogExtended } from "../../store/WorkTask/reducer";

import TimeLogs from "./components/TimeLogs";
import CardLabelValue from "./components/CardLabelValue";
import GeneralCard from "./components/GeneralCard";
import EventLogCard from "./components/EventLog";

// TODO: move this to the App.tsx file, since its better to define this only once instead of many places!!
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type WorkTaskScreenViewProps = {
    initializeState: (workTaskId: string, refresh?: boolean) => void;
    initializeSRDependentState: (workTaskId: string, serviceRequestID: string) => void;
    timeLogs: TimeLogExtended[];
    timeLogsLoading: boolean;
    timeLogsError: string | null;
    onTimeLogDelete: (...args: Parameters<typeof WorkTask.Actions.deleteTimeLog>) => void;
    // TimeLog Dependencies
    timeLogCategories: TimeLogCategory[];
    timeLogCategoriesLoading: boolean;
    timeLogCategoriesError: string | null;
    onTimeLogCreate: (...args: Parameters<typeof WorkTask.Actions.createTimeLog>) => void;
    onTimeLogCancelRetry: (...args: Parameters<typeof WorkTask.Actions.onTimeLogCancelRetry>) => void;
    eventLogs: EventLog[];
    eventLogsLoading: boolean;
    eventLogsError: string | null;
    workTask: FullWorkTask | null;
    isRefreshing: boolean;
} & NativeStackScreenProps<RootStackParamList, "WorkTaskScreen">;

const WorkTaskScreenView: React.FunctionComponent<WorkTaskScreenViewProps> = (props) => {
    const {
        timeLogs,
        timeLogsLoading,
        timeLogsError,
        onTimeLogDelete,
        timeLogCategories,
        timeLogCategoriesLoading,
        timeLogCategoriesError,
        onTimeLogCreate,
        onTimeLogCancelRetry,
        workTask,
        eventLogs,
        eventLogsError,
        eventLogsLoading,
        isRefreshing,
        initializeState,
        initializeSRDependentState,
    } = props;

    const { workTaskId } = props.route.params;

    useEffect(() => {
        initializeState(workTaskId);
    }, [initializeState]);

    useEffect(() => {
        if (workTask) {
            props.navigation.setOptions({
                headerTitle: workTask.ID,
            });

            if (workTask.ID) {
                initializeSRDependentState(workTask.ID, workTask.ID);
            }
        }
    }, [workTask]);

    const [expandedAccordians, setExpandedAccordians] = React.useState<(string | number)[]>([]);

    const theme = useAppTheme();

    const handleAccordianPress = (id: string | number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        // LayoutAnimation.configureNext(LayoutAnimation.create(200, "linear", "scaleY"));
        setExpandedAccordians((prevExpandedAccordians) => {
            if (prevExpandedAccordians.includes(id)) {
                return prevExpandedAccordians.filter((accordianId) => accordianId !== id);
            } else {
                return [...prevExpandedAccordians, id];
            }
        });
    };

    if (!workTask) {
        // Loading
        return (
            <View
                style={[
                    styles.layoutContainer,
                    {
                        width: "100%",
                        height: "100%",
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
    }

    return (
        <View style={styles.layoutContainer}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => {
                            initializeState(workTaskId, true);
                        }}
                    />
                }
            >
                {/* <Header /> */}
                <View style={styles.form}>
                    {/* Header */}
                    <FlipCard flipHorizontal={true} flipVertical={false}>
                        {/* Frontside */}
                        <GeneralCard
                            workTask={workTask}
                            style={{
                                marginBottom: 8,
                            }}
                        />
                        {/* Backside */}
                        <View style={{ padding: 8 }}>
                            <View
                                style={
                                    {
                                        // opacity: 0,
                                    }
                                }
                            >
                                {/* <GeneralCard
                                    workTask={workTask}
                                    style={{
                                        marginBottom: 8,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    // justifyContent: "center",
                                    // alignItems: "center",
                                }}
                            > */}
                                <Card>
                                    <Card.Title title="Gary Bray" left={() => <Avatar.Text size={24} label="GB" />} />
                                    <Card.Content>
                                        <Text variant="labelMedium">Service Request</Text>
                                        <Text variant="bodySmall">SR123456</Text>
                                    </Card.Content>
                                </Card>
                            </View>
                        </View>
                    </FlipCard>

                    {/* </List.Accordion> */}
                    {/* -------EVENT LOGS------- */}
                    <List.Accordion
                        title={
                            <Text
                                variant="headlineSmall"
                                style={{
                                    color: theme.colors?.primary,
                                }}
                            >
                                Events Logs
                            </Text>
                        }
                        id="events"
                        right={eventLogsLoading ? () => <ActivityIndicator animating={eventLogsLoading} /> : undefined}
                        expanded={expandedAccordians.includes("events")}
                        // expanded
                        onPress={() => handleAccordianPress("events")}
                    >
                        <View>
                            {eventLogsLoading && <ActivityIndicator animating={true} />}
                            {eventLogsError && (
                                <HelperText type="error" visible={true}>
                                    {eventLogsError}
                                </HelperText>
                            )}
                            {eventLogs.map((eventLog) => (
                                <EventLogCard eventLog={eventLog} key={eventLog._id} />
                            ))}
                        </View>
                    </List.Accordion>
                    {/* TIMELOG Section!! */}
                    <List.Accordion
                        title={
                            <Text
                                variant="headlineSmall"
                                style={{
                                    color: theme.colors?.primary,
                                }}
                            >
                                Time Log
                            </Text>
                        }
                        id="timelog"
                        onPress={() => handleAccordianPress("timelog")}
                        expanded={expandedAccordians.includes("timelog")}
                        right={timeLogsLoading ? () => <ActivityIndicator animating={timeLogsLoading} /> : undefined}
                    >
                        <TimeLogs
                            timeLogs={timeLogs}
                            timeLogsLoading={timeLogsLoading}
                            timeLogsError={timeLogsError}
                            onTimeLogDelete={onTimeLogDelete}
                            workTaskId={workTaskId}
                            timeLogCategories={timeLogCategories}
                            timeLogCategoriesLoading={timeLogCategoriesLoading}
                            timeLogCategoriesError={timeLogCategoriesError}
                            onTimeLogCreate={onTimeLogCreate}
                            // FIXME: take service request id from the work task
                            serviceRequestId={workTask.ID}
                            onCancelRetry={onTimeLogCancelRetry}
                        />
                    </List.Accordion>

                    {/* Child Work Tasks */}
                    {/* Data example
                    {
                        "ParentID": "SR-10248438",
                        "Status": "Draft",
                        "RequestClass": "",
                        "Priority": "",
                        "TaskType": "Corrective",
                        "_id": "1858328993",
                        "ID": "13596935"
                    }
                    */}
                    <List.Accordion
                        title={
                            <Text
                                variant="headlineSmall"
                                style={{
                                    color: theme.colors?.primary,
                                }}
                            >
                                Child Work Tasks
                            </Text>
                        }
                        id="child-work-tasks"
                        // right={childWorkTasksLoading ? () => <ActivityIndicator animating={childWorkTasksLoading} /> : undefined}
                        onPress={() => handleAccordianPress("child-work-tasks")}
                        expanded={expandedAccordians.includes("child-work-tasks")}
                    >
                        {[
                            {
                                ParentID: "SR-10248438",
                                Status: "Draft",
                                RequestClass: "",
                                Priority: "",
                                TaskType: "Corrective",
                                _id: "1858328993",
                                ID: "13596935",
                            },
                        ].map((childWorkTask) => (
                            <CardLabelValue
                                key={`child-work-task-${childWorkTask._id}`}
                                id={childWorkTask._id}
                                items={[
                                    {
                                        label: "ID",
                                        value: childWorkTask.ID,
                                    },
                                    {
                                        label: "Task Type",
                                        value: childWorkTask.TaskType,
                                    },
                                    {
                                        label: "Request Class",
                                        value: childWorkTask.RequestClass,
                                    },
                                    {
                                        label: "Priority",
                                        value: childWorkTask.Priority,
                                    },
                                    {
                                        label: "Status",
                                        value: childWorkTask.Status,
                                    },
                                ]}
                            />
                        ))}
                    </List.Accordion>

                    {/*  Parent Work Task */}
                    {/* Data Example
                     {
                        "Status": "Completed",
                        "ChildID": "SR-10000015",
                        "Priority": "P2",
                        "_id": "1375091588",
                        "ID": "SR-10000013"
                    }
         */}
                    <List.Accordion
                        title={
                            <Text
                                variant="headlineSmall"
                                style={{
                                    color: theme.colors?.primary,
                                }}
                            >
                                Parent Work Task
                            </Text>
                        }
                        id="parent-work-task"
                        // right={parentWorkTaskLoading ? () => <ActivityIndicator animating={parentWorkTaskLoading} /> : undefined}
                        onPress={() => handleAccordianPress("parent-work-task")}
                        expanded={expandedAccordians.includes("parent-work-task")}
                    >
                        {[
                            {
                                Status: "Completed",
                                ChildID: "SR-10000015",
                                Priority: "P2",
                                _id: "1375091588",
                                ID: "SR-10000013",
                            },
                        ].map((parentWorkTask) => (
                            <CardLabelValue
                                key={`parent-work-task-${parentWorkTask._id}`}
                                id={parentWorkTask._id}
                                items={[
                                    {
                                        label: "ID",
                                        value: parentWorkTask.ID,
                                    },
                                    {
                                        label: "Priority",
                                        value: parentWorkTask.Priority,
                                    },
                                    {
                                        label: "Child ID",
                                        value: parentWorkTask.ChildID,
                                    },
                                    {
                                        label: "Status",
                                        value: parentWorkTask.Status,
                                    },
                                ]}
                            />
                        ))}
                    </List.Accordion>

                    {/* Building Equipment & Refirgerant */}
                </View>
            </ScrollView>
            {/* Escape the bottom action bar */}
            <View
                style={{
                    paddingBottom: 64,
                }}
            />
            <View
                style={{
                    // backgroundColor: "grey",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderRadius: 20,
                    height: 64,
                    padding: 10,
                    marginHorizontal: 10,
                    marginBottom: 10,
                    // Flexbox
                    flex: 1,
                    flexDirection: "row",
                    display: "flex",
                    // justifyContent: "flex-end",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "grey",
                        // borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        //
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        flex: 1,
                    }}
                >
                    {/* Comment Icon */}
                    <IconButton
                        icon={"comment"}
                        // size={20}
                        onPress={() => console.log("Pressed")}
                        iconColor="white"
                        style={{
                            backgroundColor: theme.colors?.primary,
                        }}
                    />
                    <IconButton
                        // icon={"account-clock"}
                        icon={() => <AntDesignIcon name="checkcircle" size={20} color="white" />}
                        // size={20}
                        onPress={() => console.log("Pressed")}
                        iconColor="white"
                        style={{
                            backgroundColor: theme.colors?.primary,
                        }}
                    />

                    {/* TimeSlot icon */}
                    <IconButton
                        icon={"account-clock"}
                        // size={20}
                        onPress={() => console.log("Pressed")}
                        iconColor="white"
                        style={{
                            backgroundColor: theme.colors?.primary,
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    layoutContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#f6f6f6",
        // paddingVertical: 20,
        flex: 1,
    },
    form: {
        flex: 1,
        marginTop: 20,
    },
});

const HeaderOptions: NativeStackHeaderProps["options"] = {
    headerShown: true,
    headerTitle: "Work Task",
};

const mapDispatch = (dispatch: AppThunkDispatch<WorkTask.ActionInterfaces>) => ({
    initializeState: (workTaskId: string, refresh?: boolean) => {
        dispatch(WorkTask.Actions.loadWorkTask(workTaskId, refresh));
        dispatch(WorkTask.Actions.loadEvents(workTaskId));
        dispatch(WorkTask.Actions.loadTimeLogs(workTaskId));
        dispatch(WorkTask.Actions.loadServiceRequest(workTaskId));
        dispatch(WorkTask.Actions.loadTimeLogCategories());
    },
    initializeSRDependentState: (workTaskId: string, serviceRequestId: string) => {
        dispatch(WorkTask.Actions.loadChildWorkTasks(serviceRequestId, workTaskId));
    },
    onTimeLogDelete: (workTaskId: string, timeLogId: string) =>
        dispatch(WorkTask.Actions.deleteTimeLog(workTaskId, timeLogId)),
    onTimeLogCreate: (...args: Parameters<typeof WorkTask.Actions.createTimeLog>) =>
        dispatch(WorkTask.Actions.createTimeLog(...args)),
    onTimeLogCancelRetry: (...args: Parameters<typeof WorkTask.Actions.onTimeLogCancelRetry>) =>
        dispatch(WorkTask.Actions.onTimeLogCancelRetry(...args)),
});

const mapState = (state: RootState) => ({
    workTask: state.workTask.workTask,
    workTaskLoading: state.workTask.loading,
    workTaskError: state.workTask.error,
    // Timelog categories
    timeLogCategories: state.workTask.timeLogCategories,
    timeLogCategoriesLoading: state.workTask.timeLogCategoriesLoading,
    timeLogCategoriesError: state.workTask.timeLogCategoriesError,
    // timeLogs
    timeLogs: state.workTask.timeLogs,
    timeLogsLoading: state.workTask.timeLogsLoading,
    timeLogsError: state.workTask.timeLogsError,
    // Event logs
    eventLogs: state.workTask.eventLogs,
    eventLogsLoading: state.workTask.eventLogsLoading,
    eventLogsError: state.workTask.eventLogsError,
    isRefreshing: !!state.workTask.refreshing,
});

const connector = connect(mapState, mapDispatch);

export const WorkTaskScreen = connector(WorkTaskScreenView);
export const WorkTaskScreenHeaderOptions = HeaderOptions;
export const WorkTaskScreenName = "WorkTaskScreen";
