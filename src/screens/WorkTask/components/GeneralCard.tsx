import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import { Badge, Card, Text } from "react-native-paper";
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { FullWorkTask } from "../../../store/WorkTask/reducer";
import { useAppTheme } from "../../../theme";
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
                    borderTopColor: theme.colors?.primary,
                    borderTopWidth: 4,
                    borderBottomColor: theme.colors?.primary,
                    borderBottomWidth: 4,
                    backgroundColor: "white",
                }}
            >
                <Card.Title
                    title={
                        <>
                            <Text variant="headlineSmall">
                                <Icon name="wrench" size={24} color={theme.colors?.primary} /> {workTask.ID}
                            </Text>
                        </>
                    }
                    style={{
                        paddingHorizontal: 16,
                        borderBottomColor: theme.colors?.primary,
                        borderBottomWidth: 1,
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
                                    color:
                                        workTask.TaskPriority.value === "P1"
                                            ? theme.colors?.onP1Container
                                            : theme.colors?.onP2Container,
                                    paddingHorizontal: 4,
                                    backgroundColor:
                                        workTask.TaskPriority.value === "P1" ? theme.colors?.p1 : theme.colors?.p2,
                                    marginRight: 8,
                                    fontWeight: "bold",
                                }}
                                size={20}
                            >
                                {workTask.TaskPriority.value}
                            </Badge>
                            <Badge
                                style={{
                                    color: "white",
                                    paddingHorizontal: 4,
                                    backgroundColor: "green",
                                    marginRight: 8,
                                    fontWeight: "bold",
                                }}
                            >
                                {workTask.Status}
                            </Badge>
                            <Badge
                                style={{
                                    paddingHorizontal: 4,
                                    color:
                                        workTask.TaskType.value === "Corrective"
                                            ? theme.colors.onCorrectiveContainer
                                            : theme.colors.onPreventativeContainer,
                                    backgroundColor:
                                        workTask.TaskType.value === "Corrective"
                                            ? theme.colors?.corrective
                                            : theme.colors?.preventative,
                                    fontWeight: "bold",
                                }}
                            >
                                {workTask.TaskType.value}
                            </Badge>
                        </View>
                    )}
                />
                <Card.Content
                    style={{
                        paddingVertical: 4,
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
                    <View
                        style={{
                            width: "100%",
                            minHeight: 20,
                            borderRadius: 8,
                            flexDirection: "row",
                            paddingVertical: 8,
                        }}
                    >
                        {/* Left column */}
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: "50%",
                                borderRightWidth: 1,
                                borderColor: theme.colors?.primary,
                            }}
                        >
                            <Text
                                variant="labelSmall"
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                Requested By
                            </Text>
                            <Text
                                variant="labelMedium"
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    marginTop: 4,
                                }}
                            >
                                {workTask.RequestedByFullName}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    width: "100%",
                                    marginTop: 4,
                                }}
                            >
                                <Icon
                                    name="phone"
                                    // color={theme.colors?.primary}
                                    color={"white"}
                                    size={16}
                                    onPress={() => {
                                        console.log("Phone Pressed");
                                    }}
                                    style={{
                                        backgroundColor: theme.colors?.primary,
                                        borderRadius: 100,
                                        padding: 4,
                                    }}
                                />
                                <Icon
                                    name="email"
                                    color={"white"}
                                    size={16}
                                    onPress={() => {
                                        console.log("Phone Pressed");
                                    }}
                                    style={{
                                        backgroundColor: theme.colors?.primary,
                                        borderRadius: 100,
                                        padding: 4,
                                    }}
                                />
                            </View>
                        </View>
                        {/* Right column */}
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: "50%",
                            }}
                        >
                            <Text
                                variant="labelSmall"
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                Requested For
                            </Text>
                            <Text
                                variant="labelMedium"
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    marginTop: 4,
                                }}
                            >
                                {workTask.RequestedForFullName}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    width: "100%",
                                    marginTop: 4,
                                }}
                            >
                                <Icon
                                    name="phone"
                                    // color={theme.colors?.primary}
                                    color={"white"}
                                    size={16}
                                    onPress={() => {
                                        console.log("Phone Pressed");
                                    }}
                                    style={{
                                        backgroundColor: theme.colors?.primary,
                                        borderRadius: 100,
                                        padding: 4,
                                    }}
                                />
                                <Icon
                                    name="email"
                                    color={"white"}
                                    size={16}
                                    onPress={() => {
                                        console.log("Phone Pressed");
                                    }}
                                    style={{
                                        backgroundColor: theme.colors?.primary,
                                        borderRadius: 100,
                                        padding: 4,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Card.Content>
                <Card.Actions
                    style={{
                        backgroundColor: "#F6F6F6",
                        borderTopWidth: 1,
                        borderColor: theme.colors?.primary,
                        padding: 4,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                        }}
                    >
                        <View
                            style={{
                                flexGrow: 1,
                                borderRightWidth: 1,
                                borderColor: theme.colors?.primary,
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
                                flexGrow: 1,
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
                    </View>
                </Card.Actions>
            </Card>
        </View>
    );
};

export default GeneralCard;
