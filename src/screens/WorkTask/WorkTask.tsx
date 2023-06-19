/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { LayoutAnimation, Platform, ScrollView, StyleSheet, UIManager, View } from "react-native";
import { Card, List, Text, Button, Avatar, ActivityIndicator, HelperText, IconButton } from "react-native-paper";
import { NativeStackHeaderProps, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { connect } from "react-redux";

import { useAppTheme } from "../../theme";
import Header from "../../components/Header";
import { RootStackParamList } from "../../Navigator";
import { AppThunkDispatch, RootState, WorkTask } from "../../store";
import { TimeLogCategory, TimeLogExtended } from "../../store/WorkTask/reducer";

import TimeLogs from "./components/TimeLogs";

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

    return (
        <View style={styles.layoutContainer}>
            <ScrollView>
                {/* <Header /> */}
                <View style={styles.form}>
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
                        <Text>General Stuff!!</Text>
                        <Text>WorkTaskID: {workTaskId}</Text>
                    </List.Accordion>
                    <List.Accordion
                        title={
                            <Text
                                variant="headlineMedium"
                                style={{
                                    color: theme.colors?.primary,
                                }}
                            >
                                Events
                            </Text>
                        }
                        id="events"
                        right={() => <></>}
                        expanded
                    >
                        <Text>Events Stuff!!</Text>
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
                        />
                    </List.Accordion>
                </View>
            </ScrollView>
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
    headerShown: false,
};

const mapDispatch = (dispatch: AppThunkDispatch<WorkTask.ActionInterfaces>) => ({
    initializeState: (workTaskId: string) => {
        dispatch(WorkTask.Actions.loadTimeLogs(workTaskId));
        dispatch(WorkTask.Actions.loadTimeLogCategories());
    },
    onTimeLogDelete: (workTaskId: string, timeLogId: string) =>
        dispatch(WorkTask.Actions.deleteTimeLog(workTaskId, timeLogId)),
    onTimeLogCreate: (...args: Parameters<typeof WorkTask.Actions.createTimeLog>) =>
        dispatch(WorkTask.Actions.createTimeLog(...args)),
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
});

const connector = connect(mapState, mapDispatch);

export const WorkTaskScreen = connector(WorkTaskScreenView);
export const WorkTaskScreenHeaderOptions = HeaderOptions;
export const WorkTaskScreenName = "WorkTaskScreen";
