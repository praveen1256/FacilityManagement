import { View } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";

type CardLabelValueProps = {
    items: {
        label: string;
        value: string;
    }[];
    id: string;
};

const CardLabelValue: React.FunctionComponent<CardLabelValueProps> = ({ id, items }) => {
    return (
        <>
            <Card
                key={id}
                style={{
                    marginVertical: 8,
                    marginHorizontal: 16,
                }}
            >
                <Card.Content>
                    {items.map((item, idx) => (
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
            </Card>
        </>
    );
};

export default CardLabelValue;
