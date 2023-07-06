import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import { useAppTheme } from "../../../theme";

interface BottomBarProps {
    onCommentPress: () => void;
    onTimeSlotPress: () => void;
    onCompletitionPress: () => void;
}

const BottomBar: React.FunctionComponent<BottomBarProps> = ({
    onCommentPress,
    onTimeSlotPress,
    onCompletitionPress,
}) => {
    const theme = useAppTheme();
    return (
        <>
            <View
                style={{
                    paddingBottom: 64,
                }}
            />
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 64,
                    flex: 1,
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        // justifyContent: "center",
                        alignItems: "center",
                        // Light grey
                        backgroundColor: "rgba(0,0,0,0.1)",
                        // backgroundColor: "black",
                        // borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderTopLeftRadius: 999,
                        borderTopRightRadius: 999,
                        flex: 1,
                        justifyContent: "space-around",
                    }}
                >
                    {/* Comment Icon */}
                    <IconButton
                        icon={"comment"}
                        // size={20}
                        onPress={onCommentPress}
                        iconColor="white"
                        style={{
                            backgroundColor: theme.colors?.primary,
                        }}
                    />
                    <View
                        style={{
                            position: "relative",
                            // justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            // icon={"account-clock"}
                            size={48}
                            icon={() => <AntDesignIcon name="checkcircle" size={32} color="white" />}
                            // size={20}
                            onPress={onCompletitionPress}
                            iconColor="white"
                            style={{
                                backgroundColor: theme.colors?.primary,
                                position: "absolute",
                                top: 0,
                                // left: 0,
                                // right: 0,
                                marginTop: -48,
                            }}
                        />
                    </View>

                    {/* TimeSlot icon */}
                    <IconButton
                        icon={"account-clock"}
                        // size={20}
                        onPress={onTimeSlotPress}
                        iconColor="white"
                        style={{
                            backgroundColor: theme.colors?.primary,
                        }}
                    />
                </View>
            </View>
        </>
    );
};

export default BottomBar;
