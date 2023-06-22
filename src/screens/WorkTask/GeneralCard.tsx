import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import { Badge, Card, Text } from "react-native-paper";
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { FullWorkTask } from "../../store/WorkTask/reducer";
import { useAppTheme } from "../../theme";
type GeneralCardProps = {
    workTask: FullWorkTask;
    style?: StyleProp<ViewStyle>;
};

const GeneralCard: React.FC<GeneralCardProps> = ({ workTask, style }) => {
    const theme = useAppTheme();
    return (
        <View style={style}>
            <Card
                style={{
                    marginHorizontal: 16,
                    overflow: "hidden",
                }}
            >
                <Card.Title
                    title={<Text variant="headlineSmall">{workTask.ID}</Text>}
                    style={{
                        paddingHorizontal: 16,
                    }}
                    right={() => (
                        <View
                            style={{
                                // marginRight: 8,
                                flexDirection: "row",
                            }}
                        >
                            <Badge
                                style={{
                                    color: "white",
                                    backgroundColor: "green",
                                    marginRight: 8,
                                }}
                                size={20}
                            >
                                {workTask.TaskPriority.value}
                            </Badge>
                            <Badge
                                style={{
                                    color: "white",
                                    backgroundColor: "green",
                                    marginRight: 8,
                                }}
                            >
                                {workTask.Status}
                            </Badge>
                            <Badge
                                style={{
                                    color: "white",
                                    backgroundColor: "green",
                                }}
                            >
                                {workTask.TaskType.value}
                            </Badge>
                        </View>
                    )}
                />
                <Card.Content
                    style={{
                        paddingBottom: 4,
                    }}
                >
                    <View>
                        {[
                            {
                                label: "Request Class",
                                value: workTask.RequestClass?.value || "Unknown",
                            },
                            {
                                label: "Description",
                                value: workTask.Description || "No Description",
                            },
                            {
                                label: "Building Name",
                                value: workTask.Building,
                            },
                            {
                                label: "Address",
                                value: `${workTask.Address}\n${workTask.City} ${workTask.StateProvince} ${workTask.Zip}`,
                            },
                            {
                                label: "Requested By",
                                // FIXME: this should be the name of the user
                                // This should be pulled from the api - Single Work Task Details(Postman)
                                value: (
                                    <>
                                        {workTask.RequestedByFullName}{" "}
                                        <Icon name="phone" color={theme.colors?.primary} />{" "}
                                        <Icon name="email" color={theme.colors?.primary} />
                                    </>
                                ),
                            },
                            {
                                label: "Requested For",
                                // FIXME: this should be the name of the user
                                // This should be pulled from the api - Single Work Task Details(Postman)
                                value: (
                                    <>
                                        {workTask.RequestedForFullName}{" "}
                                        <Icon
                                            name="phone"
                                            color={theme.colors?.primary}
                                            onPress={() => {
                                                console.log("Phone Pressed");
                                            }}
                                        />{" "}
                                        <Icon name="email" color={theme.colors?.primary} />
                                    </>
                                ),
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
                </Card.Content>
                <Card.Actions
                    style={{
                        paddingHorizontal: 0,
                        backgroundColor: "lightgrey",
                    }}
                >
                    <View
                        style={{
                            width: "50%",
                        }}
                    >
                        <Text
                            variant="labelMedium"
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Assigned Date
                        </Text>
                        <Text
                            variant="labelMedium"
                            style={{
                                textAlign: "center",
                            }}
                        >
                            {dayjs(workTask.PlannedEnd).format("MM/DD/YYYY, HH:mm")}
                        </Text>
                    </View>

                    <View
                        style={{
                            width: "50%",
                        }}
                    >
                        <Text
                            variant="labelMedium"
                            style={{
                                textAlign: "center",
                                color: "red", // This would indicate that the task is overdue
                            }}
                        >
                            Due Date
                        </Text>
                        <Text
                            variant="labelMedium"
                            style={{
                                textAlign: "center",
                                color: "red", // This would indicate that the task is overdue
                            }}
                        >
                            {dayjs(workTask.PlannedEnd).format("MM/DD/YYYY, HH:mm")}
                        </Text>
                    </View>
                </Card.Actions>
            </Card>
        </View>
    );
};

export default GeneralCard;
