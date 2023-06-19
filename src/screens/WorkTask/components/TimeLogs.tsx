import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Card, HelperText, Text } from "react-native-paper";

import { createTimeLog, deleteTimeLog } from "../../../store/WorkTask/actions";
import { TimeLogCategory, TimeLogExtended } from "../../../store/WorkTask/reducer";
import { useAppTheme } from "../../../theme";

import CreateTimeLogModal from "./CreateTimeLogModal";

type TimeLogsProps = {
    timeLogs: TimeLogExtended[];
    timeLogsLoading: boolean;
    timeLogsError: string | null;
    onTimeLogDelete: (...args: Parameters<typeof deleteTimeLog>) => void;
    workTaskId: string;
    // TimeLog Dependencies
    timeLogCategories: TimeLogCategory[];
    timeLogCategoriesLoading: boolean;
    timeLogCategoriesError: string | null;
    // Timelog creation dependencies
    onTimeLogCreate: (...args: Parameters<typeof createTimeLog>) => void;
    onInitiateCreateTimeLog?: () => void;
};

const TimeLogs: React.FC<TimeLogsProps> = ({
    timeLogs,
    timeLogsLoading,
    timeLogsError,
    onTimeLogDelete,
    workTaskId,
    timeLogCategories,
    timeLogCategoriesError,
    timeLogCategoriesLoading,
    onTimeLogCreate,
}) => {
    const [isAddTimeLogModalOpen, setIsAddTimeLogModalOpen] = React.useState(false);
    return (
        <>
            <CreateTimeLogModal
                isOpen={isAddTimeLogModalOpen}
                onClose={() => setIsAddTimeLogModalOpen(false)}
                timeLogCategories={timeLogCategories}
                onSubmit={(data) => {
                    onTimeLogCreate(workTaskId, {
                        Category: data.category,
                        Date: data.date.toDateString(),
                        Hours: data.hours.toString(),
                        Description: data.comment,
                    });
                }}
            />
            <View
                style={{
                    paddingHorizontal: 20,
                }}
            >
                <ActivityIndicator animating={timeLogsLoading} />
                {timeLogsError && <HelperText type="error">{timeLogsError}</HelperText>}
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
                        />
                    ))}
                <Button
                    mode="contained"
                    icon={"clock"}
                    style={{
                        marginTop: 20,
                    }}
                    disabled={timeLogCategoriesLoading || timeLogCategoriesError !== null}
                    onPress={() => setIsAddTimeLogModalOpen(true)}
                    loading={timeLogCategoriesLoading}
                >
                    Add Time Log
                </Button>
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
}) => {
    const appTheme = useAppTheme();

    return (
        <View
            style={{
                marginVertical: 8,
                overflow: "hidden",
                borderRadius: 8,
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
                    display: isLoading ? "flex" : "none",
                }}
            >
                <Text variant="bodyMedium" style={{ color: appTheme.colors?.primary, fontWeight: "bold" }}>
                    {loadingMessage}
                </Text>
                <ActivityIndicator animating={true} />
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
                            value: date,
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
        </View>
    );
};
