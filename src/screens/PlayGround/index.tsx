import { View, Text, Animated, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { Button, Card } from "react-native-paper";

const PlayGround = () => {
    const stepOneAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const stepTwoAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const [stepTwoStart, setStepTwoStart] = React.useState(false);

    const startAnimation = () => {
        if (stepTwoStart || stepOneAnim.__getValue() !== 0 || stepTwoAnim.__getValue() === 1) {
            console.log("PlayGroundScreen", "Animation already running");
            // Reset the animation
            stepOneAnim.setValue(0);
            stepTwoAnim.setValue(0);
            setStepTwoStart(false);
            return;
        }

        console.log("PlayGroundScreen", "Starting animation");

        Animated.timing(stepOneAnim, {
            toValue: 1,
            // duration: 10000,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            console.log("PlayGroundScreen", "Animation completed");
            setStepTwoStart(true);

            Animated.timing(stepOneAnim, {
                toValue: 0,
                // duration: 10000,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                console.log("PlayGroundScreen", "Animation #1 reversed");
            });

            Animated.timing(stepTwoAnim, {
                toValue: 1,
                // duration: 10000,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {
                console.log("PlayGroundScreen", "Animation #2 completed");
            });
        });
    };
    // useEffect(() => {
    //     startAnimation();
    // }, [startAnimation]);

    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                // justifyContent: "flex-end",
                justifyContent: "center",
                // alignItems: "center",
            }}
        >
            <View
                style={{
                    // position: "relative",
                    // backgroundColor: "green",
                    height: "100%",
                    // justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "green",
                }}
            >
                {/* Bottom layout keeper */}
                <Card
                    style={
                        {
                            // position: "absolute",
                            // top: 0,
                            // backgroundColor: "blue",
                        }
                    }
                    onPress={() => {
                        console.log("Card Pressed");
                    }}
                >
                    <Card.Content>
                        <Text>PlayGround</Text>
                    </Card.Content>
                </Card>

                {/* Top expander */}
                <Animated.View // Special animatable View
                    style={{
                        // opacity: fadeAnim, // Bind opacity to animated value
                        // backgroundColor: "red",
                        position: "absolute",

                        // Step 1
                        // top: "50%",
                        top: stepOneAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "50%"],
                        }),
                        // left: "50%",
                        left: stepOneAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "50%"],
                        }),
                        // transform: [{ translateX: -50 }, { translateY: -50 }],
                        transform: [
                            {
                                translateX: !stepTwoStart
                                    ? stepOneAnim.interpolate({
                                          inputRange: [0, 1],
                                          outputRange: [0, -50],
                                      })
                                    : 0,
                            },
                            {
                                translateY: !stepTwoStart
                                    ? stepOneAnim.interpolate({
                                          inputRange: [0, 1],
                                          outputRange: [0, -50],
                                      })
                                    : 0,
                            },
                            // {
                            //     scaleX: !stepTwoStart
                            //         ? stepOneAnim.interpolate({
                            //               inputRange: [0, 1],
                            //               outputRange: [1, 2],
                            //           })
                            //         : 1,
                            // },
                            // {
                            //     scaleY: !stepTwoStart
                            //         ? stepOneAnim.interpolate({
                            //               inputRange: [0, 1],
                            //               outputRange: [1, 2],
                            //           })
                            //         : 1,
                            // },
                        ],
                        // scale: stepTwoStart
                        // Step 2
                        // height: "100%",
                        height: stepTwoStart
                            ? stepTwoAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ["0%", "100%"],
                              })
                            : undefined,
                        // height: maxHeight,
                        // width: "100%",
                        width: stepTwoStart
                            ? stepTwoAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ["0%", "100%"],
                              })
                            : undefined,

                        backgroundColor: "yellow",
                    }}
                >
                    <Card>
                        <Card.Content>
                            <Button
                                onPress={() => {
                                    startAnimation();
                                }}
                            >
                                <Text>Button</Text>
                            </Button>
                        </Card.Content>
                    </Card>
                </Animated.View>
            </View>
        </View>
    );
};

export const PlayGroundScreen = PlayGround;
export const PlayGroundScreenName = "PlayGroundScreen";

/**
 * Steps to animate the card
 * 1. Bring the card to the center with top: 50% and left: 50% and simultaneously translate it by -50% of its height and width
 * 2. Now expand the card by increasing its height and width to 100% and simulatneously remove the translateX and translateY
 * 3. Add padding to the card
 */
