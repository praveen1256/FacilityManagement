import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Card, HelperText, Text } from "react-native-paper";
import dayjs from "dayjs";

import { WorkTask } from "../../../store";
import { TimeLogExtended } from "../../../store/WorkTask/reducer";
import { useAppTheme } from "../../../theme";

type TimeLogsProps = {
    timeLogs: TimeLogExtended[];
    timeLogsLoading: boolean;
    timeLogsError: string | null;
    onTimeLogDelete: (...args: Parameters<typeof WorkTask.Actions.deleteTimeLog>) => void;
    workTaskId: string;
    serviceRequestId: string;
    // Timelog creation dependencies
    onTimeLogCreate: (...args: Parameters<typeof WorkTask.Actions.createTimeLog>) => void;
    onCancelRetry: (...args: Parameters<typeof WorkTask.Actions.onTimeLogCancelRetry>) => void;
};

const TimeLogs: React.FC<TimeLogsProps> = ({
    timeLogs,
    timeLogsLoading,
    timeLogsError,
    onTimeLogDelete,
    workTaskId,
    onTimeLogCreate,
    serviceRequestId,
    onCancelRetry,
}) => {
    return (
        <>
            <View
                style={{
                    paddingHorizontal: 20,
                }}
            >
                <ActivityIndicator animating={timeLogsLoading} />
                {timeLogsError && <HelperText type="error">{timeLogsError}</HelperText>}
                {timeLogs.length === 0 && !timeLogsLoading && (
                    <HelperText
                        type="info"
                        style={{
                            textAlign: "center",
                            marginBottom: 20,
                        }}
                    >
                        No time logs yet
                    </HelperText>
                )}
                {!timeLogsLoading &&
                    timeLogs.map((item, index) => (
                        <TimeLogCard
                            key={`${item._id}-${index}`}
                            id={item._id}
                            category={item.Category}
                            resourceType={item.ResourceType}
                            name={item.Name}
                            date={item.Date}
                            hours={item.Hours}
                            isLoading={item.isLoading || false}
                            onDelete={() => onTimeLogDelete(workTaskId, item._id)}
                            loadingMessage={item.loadingMessage || null}
                            errorMessage={item.error || null}
                            onRetry={() => {
                                if (item.errorMode === "DELETE") {
                                    onTimeLogDelete(workTaskId, item._id);
                                } else if (item.errorMode === "CREATE") {
                                    onTimeLogCreate(
                                        workTaskId,
                                        serviceRequestId,
                                        {
                                            ...item,
                                        },
                                        item._id,
                                    );
                                }
                            }}
                            onCancelRetry={() => {
                                if (item.errorMode === "DELETE") {
                                    onCancelRetry(workTaskId, item._id, "ERROR");
                                } else if (item.errorMode === "CREATE") {
                                    onCancelRetry(workTaskId, item._id, "DELETE");
                                }
                            }}
                        />
                    ))}
            </View>
        </>
    );
};

export default TimeLogs;

// TimeLog Card

type TimeLogCardProps = {
    id: string;
    category: string;
    resourceType: string;
    name: string;
    date: string;
    hours: string;
    isLoading: boolean;
    onDelete: () => void;
    loadingMessage: string | null;
    errorMessage: string | null;
    onRetry: () => void;
    onCancelRetry: () => void;
};

const TimeLogCard: React.FunctionComponent<TimeLogCardProps> = ({
    category,
    date,
    hours,
    name,
    resourceType,
    id,
    isLoading,
    onDelete,
    loadingMessage,
    errorMessage,
    onRetry,
    onCancelRetry,
}) => {
    const appTheme = useAppTheme();

    return (
        <Card
            style={{
                marginVertical: 8,
                overflow: "hidden",
                borderRadius: 8,
                padding: 0,
                paddingTop: 0,
                paddingBottom: 0,
                position: "relative",
            }}
            contentStyle={{
                padding: 0,
                paddingTop: 0,
                paddingBottom: 0,
                margin: 0,
                marginTop: 0,
                marginBottom: 0,
            }}
        >
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "grey",
                    zIndex: 1,
                    opacity: 0.6,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    display: isLoading || errorMessage ? "flex" : "none",
                }}
            >
                <Text variant="bodyMedium" style={{ color: appTheme.colors?.primary, fontWeight: "bold" }}>
                    {loadingMessage || errorMessage}
                </Text>
                {isLoading && <ActivityIndicator animating={true} />}
                {/* If theres a error message, show retry button */}
                {errorMessage && (
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Button
                            mode="contained"
                            onPress={onRetry}
                            style={{
                                marginHorizontal: 10,
                            }}
                        >
                            Retry
                        </Button>
                        {/* Cancel */}
                        <Button
                            mode="outlined"
                            onPress={onCancelRetry}
                            style={{
                                marginHorizontal: 10,
                            }}
                        >
                            Cancel
                        </Button>
                    </View>
                )}
            </View>
            <Card>
                <Card.Content>
                    {[
                        {
                            label: "Category",
                            value: category,
                        },
                        {
                            label: "Resource Type",
                            value: resourceType,
                        },
                        {
                            label: "Name",
                            value: name,
                        },
                        {
                            label: "Date",
                            value: dayjs(date).format("ddd, MMMM D, YYYY"),
                        },
                        {
                            label: "Hours",
                            value: hours,
                        },
                    ].map((item, idx) => (
                        <View
                            style={{
                                flexDirection: "row",
                            }}
                            key={`${id}-${idx}`}
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
                </Card.Content>
                <Card.Actions>
                    {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}
                    <Button icon="delete" onPress={onDelete} disabled={isLoading}>
                        Delete
                    </Button>
                </Card.Actions>
            </Card>
        </Card>
    );
};
