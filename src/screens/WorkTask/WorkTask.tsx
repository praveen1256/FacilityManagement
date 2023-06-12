/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { LayoutAnimation, Platform, StyleSheet, UIManager, View } from "react-native";
import { Card, List, Text, Button, Avatar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import { useAppTheme } from "../../theme";
import Header from "../../components/Header";

// TODO: move this to the App.tsx file, since its better to define this only once instead of many places!!
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

//  We will focus on collecting the comments and time log of the user
const workTaskSchema = z.object({
    // comment: z.string(),
    // image: z.string(),
    timeLog: z.object({
        category: z.string(),
        resourceType: z.string(),
        name: z.string(),
        date: z.string(),
        hours: z.string(),
    }),
});

const WorkTaskScreenView = () => {
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
                    <View
                        style={{
                            paddingHorizontal: 20,
                        }}
                    >
                        {[
                            {
                                category: "C-2 - WORKED AN N DAY TO COMPLETE WORK",
                                resourceType: "Person",
                                name: "Henry Grimes",
                                date: "06/08/2023",
                                hours: "8",
                            },
                        ].map((item, index) => (
                            <TimeLogCard
                                key={`${item.resourceType}-${index}`}
                                id={`${item.resourceType}-${index}`}
                                category={item.category}
                                resourceType={item.resourceType}
                                name={item.name}
                                date={item.date}
                                hours={item.hours}
                            />
                        ))}

                        <Button
                            mode="contained"
                            icon={"clock"}
                            style={{
                                marginTop: 20,
                            }}
                        >
                            Add Time Log
                        </Button>
                    </View>
                </List.Accordion>
            </View>
        </View>
    );
};

type TimeLogCardProps = {
    id: string;
    category: string;
    resourceType: string;
    name: string;
    date: string;
    hours: string;
};

const TimeLogCard: React.FunctionComponent<TimeLogCardProps> = ({ category, date, hours, name, resourceType, id }) => {
    return (
        <>
            <Card
                style={{
                    marginVertical: 8,
                }}
            >
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
                    <Button
                        icon="delete"
                        onPress={() => {
                            // eslint-disable-next-line no-console
                            console.log("Delete", id);
                        }}
                    >
                        Delete
                    </Button>
                </Card.Actions>
            </Card>
        </>
    );
};

const styles = StyleSheet.create({
    layoutContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#f8f8f8",
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

// const mapDispatch = (dispatch: AppThunkDispatch<AppState.ActionInterfaces>) => ({
//     onPressContinue: () => console.log("pressContinue!!"),
// });

// const mapState = (state: RootState) => ({
//     isAuthStateInitialized: state.auth.isIntialized,
// });

// const connector = connect(mapState, mapDispatch);

// export const HomeScreen = connector(HomeScreenView);
export const WorkTaskScreenHeaderOptions = HeaderOptions;
export const WorkTaskScreenName = "WorkTaskScreen";
export const WorkTaskScreen = WorkTaskScreenView;
