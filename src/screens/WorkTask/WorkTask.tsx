import React, { useEffect } from "react";
import { LayoutAnimation, Platform, RefreshControl, ScrollView, StyleSheet, UIManager, View } from "react-native";
import { List, Text, ActivityIndicator, HelperText, Avatar, Card } from "react-native-paper";
import { NativeStackHeaderProps, NativeStackScreenProps } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FlipCard from "react-native-flip-card";
import Toast from "react-native-toast-message";

import { useAppTheme } from "../../theme";
import { RootStackParamList } from "../../Navigator";
import { AppThunkDispatch, RootState, WorkTask } from "../../store";
import { ChildTask, EventLog, FullWorkTask, TimeLogCategory, TimeLogExtended } from "../../store/WorkTask/reducer";

import TimeLogs from "./components/TimeLogs";
import CardLabelValue from "./components/CardLabelValue";
import GeneralCard from "./components/GeneralCard";
import EventLogCard from "./components/EventLog";
import CompletitionForm from "./components/CompletitionForm";
import CreateCommentForm from "./components/CreateCommentForm";
import CreateTimeLogModal from "./components/CreateTimeLogModal";
import BottomBar from "./components/BottomBar";

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
    workTaskLoading: boolean;
    isRefreshing: boolean;
    // Child work tasks
    childWorkTasks: ChildTask[];
    childWorkTasksLoading: boolean;
    childWorkTasksError: string | null;
    // Completion Form
    onCompleteFormSubmit: (...args: Parameters<typeof WorkTask.Actions.workTaskComplete>) => void;
    isCompleteWorkTaskLoading: boolean;
    completeWorkTaskError: string | null;
    completionDependencies: RootState["workTask"]["completionDependencies"];
    completeWorkTaskSuccess: boolean;
    onCompleteDone: () => void;
    onCommentCreate: (...args: Parameters<typeof WorkTask.Actions.postComment>) => void;
    onCommentCreateDone: () => void;
    commentPostLoading: boolean;
    commentPostError: string | null;
    commentPostSuccess: boolean;
} & NativeStackScreenProps<RootStackParamList, "WorkTaskScreen">;

const WorkTaskScreenView: React.FunctionComponent<WorkTaskScreenViewProps> = (props) => {
    const {
        timeLogs,
        timeLogsLoading,
        timeLogsError,
        onTimeLogDelete,
        timeLogCategories,
        onTimeLogCreate,
        onTimeLogCancelRetry,
        workTask,
        eventLogs,
        eventLogsError,
        eventLogsLoading,
        isRefreshing,
        initializeState,
        initializeSRDependentState,
        completeWorkTaskError,
        isCompleteWorkTaskLoading,
        onCompleteFormSubmit,
        childWorkTasks,
        childWorkTasksLoading,
        completionDependencies,
        completeWorkTaskSuccess,
        onCompleteDone,
        workTaskLoading,
        onCommentCreate,
        onCommentCreateDone,
        commentPostError,
        commentPostLoading,
        commentPostSuccess,
    } = props;

    const { workTaskId } = props.route.params;

    useEffect(() => {
        // debounce the initializeState call
        if (!workTaskLoading) {
            initializeState(workTaskId);
            console.log("workTaskId", workTaskId);
        }
    }, [initializeState, workTaskId]);

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
    const [completitionFormOpen, setCompletitionFormOpen] = React.useState(false);
    const [createCommentFormOpen, setCreateCommentFormOpen] = React.useState(false);
    const [createTimeLogModalOpen, setCreateTimeLogModalOpen] = React.useState(false);

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

    if (workTaskLoading || !workTask) {
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
        <>
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
                                        <Card.Content>
                                            <Text variant="labelMedium">Resources</Text>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    // backgroundColor: "lightgrey",
                                                }}
                                            >
                                                {[{ name: "Gary Bray" }, { name: "Gary Bray" }].map(
                                                    (person, idx, arr) => {
                                                        return (
                                                            <View
                                                                key={`${person.name}-${idx}`}
                                                                style={{
                                                                    // backgroundColor: "aqua",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    marginRight: idx === arr.length - 1 ? 0 : 8,
                                                                }}
                                                            >
                                                                <Avatar.Text size={24} label={person.name[0]} />
                                                                <Text variant="bodySmall">{person.name}</Text>
                                                            </View>
                                                        );
                                                    },
                                                )}
                                            </View>
                                            <Text variant="labelMedium">Responsible:</Text>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    // backgroundColor: "lightgrey",
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        // backgroundColor: "aqua",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Avatar.Text size={24} label={workTask.respperson[0]} />
                                                    <Text variant="bodySmall">{workTask.respperson}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Text variant="labelMedium">Service Request</Text>
                                                <Text variant="bodySmall">SR123456 | Electrical | Ray White</Text>
                                            </View>
                                            <View>
                                                <Text variant="labelMedium">Parent Task</Text>
                                                <Text variant="bodySmall">SR123456 | Electrical | Ray White</Text>
                                            </View>
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
                            right={
                                eventLogsLoading ? () => <ActivityIndicator animating={eventLogsLoading} /> : undefined
                            }
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
                            right={
                                timeLogsLoading ? () => <ActivityIndicator animating={timeLogsLoading} /> : undefined
                            }
                        >
                            <TimeLogs
                                timeLogs={timeLogs}
                                timeLogsLoading={timeLogsLoading}
                                timeLogsError={timeLogsError}
                                onTimeLogDelete={onTimeLogDelete}
                                workTaskId={workTaskId}
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
                                        // color: theme.colors?.primary,
                                        // disabled color
                                        color:
                                            childWorkTasksLoading || childWorkTasks.length > 0
                                                ? theme.colors?.primary
                                                : "#999999",
                                    }}
                                >
                                    Child Work Tasks
                                </Text>
                            }
                            id="child-work-tasks"
                            right={
                                childWorkTasksLoading
                                    ? () => <ActivityIndicator animating={childWorkTasksLoading} />
                                    : childWorkTasks.length > 0
                                    ? undefined
                                    : () => <Icon name="cancel" />
                            }
                            onPress={() =>
                                (!childWorkTasksLoading || childWorkTasks.length > 0) &&
                                handleAccordianPress("child-work-tasks")
                            }
                            expanded={expandedAccordians.includes("child-work-tasks")}
                        >
                            {childWorkTasks.map((childWorkTask) => (
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

                        {/* Building Equipment & Refirgerant */}
                    </View>
                </ScrollView>
                {/* Escape the bottom action bar */}
                <BottomBar
                    onCompletitionPress={() => {
                        if (timeLogs.length === 0)
                            return Toast.show({
                                type: "error",
                                text1: "Time log Needed!",
                                text2: "Please add a time log to complete the work task.",
                                position: "top",
                            });
                        setCompletitionFormOpen(true);
                    }}
                    onCommentPress={() => {
                        setCreateCommentFormOpen(true);
                    }}
                    onTimeSlotPress={() => {
                        setCreateTimeLogModalOpen(true);
                    }}
                />
            </View>
            <CreateCommentForm
                isOpen={createCommentFormOpen}
                onCancel={() => setCreateCommentFormOpen(false)}
                onDone={() => {
                    setCreateCommentFormOpen(false);
                    onCommentCreateDone();
                }}
                onSubmit={(data) => {
                    onCommentCreate(workTaskId, {
                        comment: data.comment,
                        image: data.image || "",
                    });
                }}
                isLoading={commentPostLoading}
                error={commentPostError}
                success={commentPostSuccess}
            />
            <CompletitionForm
                isOpen={completitionFormOpen}
                onCancel={() => setCompletitionFormOpen(false)}
                onSubmit={(data) => {
                    onCompleteFormSubmit(workTaskId, {
                        ...data,
                        serviceRequestNumber: workTask.ID,
                    });
                }}
                error={completeWorkTaskError}
                isLoading={isCompleteWorkTaskLoading}
                completionDependendies={completionDependencies}
                completionSuccess={completeWorkTaskSuccess}
                onCompleteDone={() => {
                    setCompletitionFormOpen(false);
                    onCompleteDone();
                }}
            />

            <CreateTimeLogModal
                isOpen={createTimeLogModalOpen}
                onClose={() => setCreateTimeLogModalOpen(false)}
                timeLogCategories={timeLogCategories}
                onSubmit={(data) => {
                    setCreateTimeLogModalOpen(false);
                    onTimeLogCreate(workTaskId, workTask.ID, {
                        ...data,
                    });
                }}
            />
        </>
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
        dispatch(WorkTask.Actions.loadWorkTaskCompletionDependencies());
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
    onCompleteFormSubmit: (...args: Parameters<typeof WorkTask.Actions.workTaskComplete>) =>
        dispatch(WorkTask.Actions.workTaskComplete(...args)),
    onCompleteDone: () => dispatch(WorkTask.Actions.onWorkTaskCompleteDone()),
    onCommentCreate: (...args: Parameters<typeof WorkTask.Actions.postComment>) =>
        dispatch(WorkTask.Actions.postComment(...args)),
    onCommentCreateDone: () => dispatch(WorkTask.Actions.commentPostDone()),
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
    // Child Work Tasks
    childWorkTasks: state.workTask.childTasks,
    childWorkTasksLoading: state.workTask.childTasksLoading,
    childWorkTasksError: state.workTask.childTasksError,
    // Completion form
    isCompleteWorkTaskLoading: state.workTask.workTaskCompleteLoading,
    completeWorkTaskError: state.workTask.workTaskCompleteError,
    completeWorkTaskSuccess: state.workTask.workTaskCompleteSuccess,
    completionDependencies: state.workTask.completionDependencies,
    // Comment Stuff
    commentPostLoading: state.workTask.commentPostLoading,
    commentPostError: state.workTask.commentPostError,
    commentPostSuccess: state.workTask.commentPostSuccess,
});

const connector = connect(mapState, mapDispatch);

export const WorkTaskScreen = connector(WorkTaskScreenView);
export const WorkTaskScreenHeaderOptions = HeaderOptions;
export const WorkTaskScreenName = "WorkTaskScreen";
