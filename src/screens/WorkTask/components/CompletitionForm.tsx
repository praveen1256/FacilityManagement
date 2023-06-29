import { View, Text } from "react-native";
import React from "react";
import { Button, Modal, Portal } from "react-native-paper";

type CompletitionFormProps = {
    isOpen: boolean;
    onCancel: () => void;
    isLoading: boolean;
    onSubmit: (data: {
        comment: string;
        causeType: string;
        repairDefinition: string;
        initiativeCode?: string;
        lateCompletionReason?: string; // only if late completion
    }) => void;
    error: string | null;
};

const CompletitionForm: React.FunctionComponent<CompletitionFormProps> = ({
    isOpen,
    onCancel,
    error,
    isLoading,
    onSubmit,
}) => {
    return (
        <Portal>
            <Modal
                visible={isOpen}
                onDismiss={isLoading ? undefined : onCancel}
                contentContainerStyle={{
                    backgroundColor: "white",
                    padding: 20,
                    margin: 20,
                }}
            >
                <View>
                    <Text>Example Modal</Text>
                    <Button
                        onPress={() => {
                            console.log("Pressed");
                            onSubmit({
                                comment: "comment",
                                causeType: "Network Card Failure",
                                repairDefinition: "Replaced Device",
                                initiativeCode: "",
                                lateCompletionReason: "",
                            });
                        }}
                        mode="contained"
                    >
                        Complete
                    </Button>
                    {error && <Text>{error}</Text>}
                </View>
            </Modal>
        </Portal>
    );
};

export default CompletitionForm;
