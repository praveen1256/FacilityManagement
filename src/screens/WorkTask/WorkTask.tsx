import React, { useEffect } from "react";
import { Platform, ScrollView, StyleSheet, UIManager, View } from "react-native";
import { List, Text, Button, IconButton, ActivityIndicator, HelperText } from "react-native-paper";
import { NativeStackHeaderProps, NativeStackScreenProps } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import dayjs from "dayjs";

import { useAppTheme } from "../../theme";
import { RootStackParamList } from "../../Navigator";
import { AppThunkDispatch, RootState, WorkTask } from "../../store";
import { EventLog, FullWorkTask, TimeLogCategory, TimeLogExtended } from "../../store/WorkTask/reducer";

import TimeLogs from "./components/TimeLogs";
import CardLabelValue from "./components/CardLabelValue";

// TODO: move this to the App.tsx file, since its better to define this only once instead of many places!!
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type WorkTaskScreenViewProps = {
    initializeState: (workTaskId: string) => void;
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
    } = props;

    const { workTaskId } = props.route.params;

    const { initializeState } = props;
    useEffect(() => {
        initializeState(workTaskId);
    }, [initializeState]);

    const [expandedAccordians, setExpandedAccordians] = React.useState<(string | number)[]>([]);

    const theme = useAppTheme();

    const handleAccordianPress = (id: string | number) => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
            <ScrollView>
                {/* <Header /> */}
                <View style={styles.form}>
                    {/* Header */}
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text variant="headlineLarge">{workTask.ID}</Text>
                    </View>

                    <List.Accordion
                        title={
                            <Text
                                variant="headlineMedium"
                                style={{
                                    color: theme.colors?.primary,
                                }}
                            >
                                General
                            </Text>
                        }
                        id="general"
                        expanded={true}
                        right={() => <></>}
                    >
                        <View
                            style={{
                                marginHorizontal: 16,
                            }}
                        >
                            {[
                                {
                                    label: "Request Class",
                                    value: workTask.RequestClass.value,
                                },
                                {
                                    label: "Description",
                                    value: workTask.Description,
                                },
                                {
                                    label: "Address",
                                    value: workTask.Address,
                                },
                                {
                                    label: "City",
                                    value: workTask.City,
                                },
                                {
                                    label: "Buildind Name",
                                    value: workTask.Building,
                                },
                                {
                                    label: "State",
                                    value: workTask.StateProvince,
                                },
                                {
                                    label: "Requested By",
                                    // FIXME: this should be the name of the user
                                    // This should be pulled from the api - Single Work Task Details(Postman)
                                    value: workTask.RequestedByFullName,
                                },
                                {
                                    label: "Requested For",
                                    // FIXME: this should be the name of the user
                                    // This should be pulled from the api - Single Work Task Details(Postman)
                                    value: workTask.RequestedForFullName,
                                },
                            ].map((item, idx) => (
                                <View
                                    style={{
                                        flexDirection: "row",
                                    }}
                                    key={`${workTask._id}-${idx}`}
                                >
                                    <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>
                                        {item.label} :{" "}
                                    </Text>
                                    <Text
                                        variant="bodyMedium"
                                        style={{
                                            flex: 1,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {item.value}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </List.Accordion>
                    {/* -------EVENT LOGS------- */}
                    <List.Accordion
                        title={
                            <Text
                                variant="headlineMedium"
                                style={{
                                    color: theme.colors?.primary,
                                }}
                            >
                                Events Logs
                            </Text>
                        }
                        id="events"
                        right={eventLogsLoading ? () => <ActivityIndicator animating={eventLogsLoading} /> : undefined}
                    >
                        {eventLogsLoading && <ActivityIndicator animating={true} />}
                        {eventLogsError && (
                            <HelperText type="error" visible={true}>
                                {eventLogsError}
                            </HelperText>
                        )}

                        {eventLogs.map((eventLog) => (
                            <CardLabelValue
                                key={eventLog._id}
                                id={eventLog._id}
                                items={[
                                    {
                                        label: "Comment",
                                        value: eventLog.Comment,
                                    },
                                    {
                                        label: "Date",
                                        value: dayjs(eventLog.ModifiedDateTime).format("MM/DD/YYYY"),
                                    },
                                ]}
                            />
                        ))}
                    </List.Accordion>
                    {/* TIMELOG Section!! */}
                    <List.Accordion
                        title={
                            <Text
                                variant="headlineMedium"
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
                                variant="headlineMedium"
                                style={{
                                    color: theme.colors?.primary,
                                }}
                            >
                                Child Work Tasks
                            </Text>
                        }
                        id="child-work-tasks"
                        // right={childWorkTasksLoading ? () => <ActivityIndicator animating={childWorkTasksLoading} /> : undefined}
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
                                variant="headlineMedium"
                                style={{
                                    color: theme.colors?.primary,
                                }}
                            >
                                Parent Work Task
                            </Text>
                        }
                        id="parent-work-task"
                        // right={parentWorkTaskLoading ? () => <ActivityIndicator animating={parentWorkTaskLoading} /> : undefined}
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

                    {/* Service Requests */}
                    {/* Data Example
                    {
                        "Building": "TELOPS HEADQUARTERS",
                        "Space": null,
                        "Floor": null,
                        "Description": "bob lola",
                        "ServiceRequested": "ELECTRICAL",
                        "Address": "600-700 HIDDEN RIDGE",
                        "Priority": "P2",
                        "StateProvince": "TX",
                        "RequiredPropertyUse": "ADMINISTRATIVE",
                        "LocationCode": "329568",
                        "City": "IRVING",
                        "PRDispatch": "Y",
                        "AssignToMe": "FALSE",
                        "SpecificLocation": "Office 2B",
                        "BestReachedAt": "555-1212",
                        "Country": "UNITED STATES",
                        "FMVendor": "CVT",
                        "_id": "1856911090",
                        "ID": "SR-10248438",
                        "RequestedBy": "RAY TRIPAMER",
                        "RequestedFor": "RAY TRIPAMER"
                    }
                */}
                    <List.Accordion
                        title={
                            <Text
                                variant="headlineMedium"
                                style={{
                                    color: theme.colors?.primary,
                                }}
                            >
                                Service Requests
                            </Text>
                        }
                        id="service-requests"
                        // right={serviceRequestsLoading ? () => <ActivityIndicator animating={serviceRequestsLoading} /> : undefined}
                    >
                        {[
                            {
                                Building: "TELOPS HEADQUARTERS",
                                Space: null,
                                Floor: null,
                                Description: "bob lola",
                                ServiceRequested: "ELECTRICAL",
                                Address: "600-700 HIDDEN RIDGE",
                                Priority: "P2",
                                StateProvince: "TX",
                                RequiredPropertyUse: "ADMINISTRATIVE",
                                LocationCode: "329568",
                                City: "IRVING",
                                PRDispatch: "Y",
                                AssignToMe: "FALSE",
                                SpecificLocation: "Office 2B",
                                BestReachedAt: "555-1212",
                                Country: "UNITED STATES",
                                FMVendor: "CVT",
                                _id: "1856911090",
                                ID: "SR-10248438",
                                RequestedBy: "RAY TRIPAMER",
                                RequestedFor: "RAY TRIPAMER",
                            },
                        ].map((serviceRequest) => (
                            <CardLabelValue
                                key={`service-request-${serviceRequest._id}`}
                                id={serviceRequest._id}
                                items={[
                                    {
                                        label: "ID",
                                        value: serviceRequest.ID,
                                    },
                                    {
                                        label: "Description",
                                        value: serviceRequest.Description,
                                    },
                                    {
                                        label: "Service Requested",
                                        value: serviceRequest.ServiceRequested,
                                    },
                                    {
                                        label: "Priority",
                                        value: serviceRequest.Priority,
                                    },
                                    {
                                        label: "Requested For",
                                        value: serviceRequest.RequestedFor,
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
                    backgroundColor: "grey",
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
                }}
            >
                {/* TimeSlot icon */}
                <Button
                    icon={"clock"}
                    mode="contained"
                    onPress={() => {
                        console.log("Pressed");
                    }}
                    textColor="white"
                >
                    Add Time Slot
                </Button>
                <IconButton
                    icon="clock"
                    size={20}
                    onPress={() => console.log("Pressed")}
                    iconColor="white"
                    style={{
                        backgroundColor: theme.colors?.primary,
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    layoutContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#f8f8f8",
        paddingVertical: 20,
        flex: 1,
    },
    form: {
        flex: 1,
        marginTop: 0,
        backgroundColor: "#FFFFFF",
    },
});

const HeaderOptions: NativeStackHeaderProps["options"] = {
    headerShown: true,
    headerTitle: "Work Task",
};

const mapDispatch = (dispatch: AppThunkDispatch<WorkTask.ActionInterfaces>) => ({
    initializeState: (workTaskId: string) => {
        dispatch(WorkTask.Actions.loadWorkTask(workTaskId));
        dispatch(WorkTask.Actions.loadEvents(workTaskId));
        dispatch(WorkTask.Actions.loadTimeLogs(workTaskId));
        dispatch(WorkTask.Actions.loadTimeLogCategories());
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
});

const connector = connect(mapState, mapDispatch);

export const WorkTaskScreen = connector(WorkTaskScreenView);
export const WorkTaskScreenHeaderOptions = HeaderOptions;
export const WorkTaskScreenName = "WorkTaskScreen";
