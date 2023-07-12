import { StyleProp, View, ViewStyle, Linking, Platform } from "react-native";
import React from "react";
import { Badge, Card, IconButton, Text } from "react-native-paper";
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
                    subtitleStyle={{
                        marginLeft: 32,
                    }}
                    subtitle={
                        <>
                            <Text variant="labelSmall">{workTask.RequestClass.value}</Text>
                        </>
                    }
                    style={{
                        paddingHorizontal: 16,
                        borderBottomColor: theme.colors?.primary,
                        borderBottomWidth: 1,
                    }}
                    right={() => (
                        <View
                            style={
                                {
                                    // flexDirection: "column",
                                    // justifyContent: "center",
                                    // alignItems: "center",
                                    // minWidth: 40,
                                    // minHeight: 40,
                                }
                            }
                        >
                            <Badge
                                style={{
                                    color:
                                        workTask.TaskPriority.value === "P1"
                                            ? theme.colors?.onP1Container
                                            : theme.colors?.onP2Container,
                                    backgroundColor:
                                        workTask.TaskPriority.value === "P1" ? theme.colors?.p1 : theme.colors?.p2,
                                    fontWeight: "bold",
                                    alignSelf: "center",
                                    marginBottom: 2,
                                }}
                                size={18}
                            >
                                {workTask.TaskPriority.value}
                            </Badge>
                            <Badge
                                style={{
                                    color: "white",
                                    // paddingHorizontal: 4,
                                    // backgroundColor: "green",
                                    backgroundColor: "black",
                                    // marginRight: 8,
                                    fontWeight: "bold",
                                    alignSelf: "center",
                                    marginBottom: 2,
                                }}
                                size={18}
                            >
                                {workTask.Status}
                            </Badge>
                            <Badge
                                style={{
                                    // paddingHorizontal: 4,
                                    color:
                                        workTask.TaskType.value === "Corrective"
                                            ? theme.colors.onCorrectiveContainer
                                            : theme.colors.onPreventativeContainer,
                                    backgroundColor:
                                        workTask.TaskType.value === "Corrective"
                                            ? theme.colors?.corrective
                                            : theme.colors?.preventative,
                                    fontWeight: "bold",
                                    alignSelf: "center",
                                    marginBottom: 2,
                                }}
                                size={18}
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
                    <View
                        style={{
                            paddingVertical: 4,
                            paddingBottom: 8,
                        }}
                    >
                        <Text
                            variant="bodyMedium"
                            style={{
                                fontStyle: "italic",
                            }}
                        >
                            {workTask.Description || "No Description Provided!"}
                            {/* 1000  random characters */}
                            {/* {generateRandomCharacters(1000)} */}
                        </Text>
                    </View>
                    {/* Full address */}
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>
                            {`${workTask.BuildingName}\n${workTask.Address}\n${workTask.City} ${workTask.StateProvince} ${workTask.Zip}`}{" "}
                            <Icon
                                name="map-marker"
                                color={theme.colors?.primary}
                                size={18}
                                onPress={() => {
                                    // map-link
                                    console.log("pressed-MAP");
                                    console.log(workTask);
                                    const scheme = Platform.select({ ios: "maps://0,0?q=", android: "geo:0,0?q=" });
                                    const lat = "37.484847";
                                    const lng = "-122.084";
                                    const latLng = `${lat},${lng}`;
                                    const label = "Telops Building";
                                    const url = Platform.select({
                                        ios: `${scheme}${label}@${latLng}`,
                                        android: `${scheme}${latLng}(${label})`,
                                    });

                                    Linking.openURL(url!);
                                }}
                            />
                        </Text>

                        {/* <IconButton
                            icon="map-marker"
                            size={24}
                            onPress={() => {
                                console.log("pressed");
                            }}
                        /> */}
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
                                <IconButton
                                    icon={() => <Icon name="phone" color={"white"} size={16} />}
                                    size={12}
                                    onPress={() => {
                                        Linking.openURL(`tel:347-241-6715`);
                                    }}
                                    style={{
                                        backgroundColor: theme.colors?.primary,
                                        borderRadius: 100,
                                        padding: 4,
                                    }}
                                />
                                <IconButton
                                    icon={() => <Icon name="email" color={"white"} size={16} />}
                                    size={12}
                                    onPress={() => {
                                        console.log("Phone Pressed");
                                        Linking.openURL(`mailto:auston.barboza@verizon.com`);
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
                                <IconButton
                                    icon={() => <Icon name="phone" color={"white"} size={16} />}
                                    size={12}
                                    onPress={() => {
                                        console.log("Phone Pressed");
                                        Linking.openURL(`tel:347-241-6715`);
                                    }}
                                    style={{
                                        backgroundColor: theme.colors?.primary,
                                        borderRadius: 100,
                                        padding: 4,
                                    }}
                                />
                                <IconButton
                                    icon={() => <Icon name="email" color={"white"} size={16} />}
                                    size={12}
                                    onPress={() => {
                                        console.log("Phone Pressed");
                                        Linking.openURL(`mailto:auston.barboza@verizon.com`);
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
                                    fontWeight: "bold",
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
                                    // The color would be red if the task is overdue
                                    color: dayjs(workTask.PlannedEnd).isBefore(dayjs()) ? "red" : "black",
                                }}
                            >
                                Due Date
                            </Text>
                            <Text
                                variant="labelMedium"
                                style={{
                                    textAlign: "center",
                                    // The color would be red if the task is overdue
                                    color: dayjs(workTask.PlannedEnd).isBefore(dayjs()) ? "red" : "black",
                                    fontWeight: "bold",
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
