import { View } from "react-native";
import React from "react";
import { Button, HelperText, Modal, Portal, TextInput, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropdown } from "react-native-element-dropdown";

import { RootState } from "../../../store";
import { useAppTheme } from "../../../theme";
import { CauseType, InitiativeCode, LateCompletionReason, RepairDefinition } from "../../../store/WorkTask/reducer";

const MAX_COMMENT_LENGTH = 999;

const completeWorkTaskSchema = z.object({
    comment: z
        .string()
        .nonempty()
        .max(MAX_COMMENT_LENGTH - 1, "Comment is too long"),
    causeType: z.string().nonempty(),
    repairDefinition: z.string().nonempty(),
    initiativeCode: z.string().optional(),
    lateCompletionReason: z.string().optional(),
});

type CompleteWorkTaskFormValues = z.infer<typeof completeWorkTaskSchema>;

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
    completionDependendies: RootState["workTask"]["completionDependencies"];
    completionSuccess: boolean;
    onCompleteDone: () => void;
};

const CompletitionForm: React.FunctionComponent<CompletitionFormProps> = ({
    isOpen,
    onCancel,
    error,
    isLoading,
    onSubmit,
    completionSuccess,
    onCompleteDone,
    completionDependendies,
}) => {
    const { handleSubmit, control, reset } = useForm<CompleteWorkTaskFormValues>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            causeType: "",
            comment: "",
            repairDefinition: "",
            initiativeCode: "",
            lateCompletionReason: "",
        },
        resolver: zodResolver(completeWorkTaskSchema),
    });

    const theme = useAppTheme();

    return (
        <Portal>
            <Modal
                visible={isOpen}
                onDismiss={onCancel}
                dismissable={!isLoading}
                contentContainerStyle={{
                    backgroundColor: "white",
                    padding: 20,
                    margin: 20,
                    borderRadius: 10,
                }}
            >
                <Text
                    variant="headlineSmall"
                    style={{
                        color: theme.colors?.primary,
                        marginBottom: 10,
                    }}
                >
                    Complete Work Task
                </Text>
                {completionSuccess ? (
                    <>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 20,
                            }}
                        >
                            <Icon
                                name="check-circle-outline"
                                size={50}
                                style={{
                                    color: "green",
                                }}
                            />
                            <Text
                                style={{
                                    marginVertical: 20,
                                }}
                            >
                                Task Completed
                            </Text>
                            <Button
                                mode="contained"
                                onPress={() => {
                                    onCompleteDone();
                                    reset();
                                }}
                            >
                                Done
                            </Button>
                        </View>
                    </>
                ) : (
                    <>
                        <View>
                            <Controller
                                control={control}
                                name="comment"
                                render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                    return (
                                        <>
                                            <TextInput
                                                mode="outlined"
                                                label="Comment"
                                                multiline
                                                // style={styles.inputContainerStyle}
                                                onBlur={onBlur}
                                                // onChangeText={onChange}
                                                value={value}
                                                onChangeText={onChange}
                                                error={!!fieldState.error}
                                                autoCapitalize="none"
                                                returnKeyType="next"
                                            />
                                            <HelperText
                                                type={fieldState.error ? "error" : "info"}
                                                visible
                                                style={{
                                                    textAlign: fieldState.error ? "left" : "right",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {fieldState.error?.message
                                                    ? fieldState.error.message
                                                    : `${MAX_COMMENT_LENGTH - value.length} characters remaining`}
                                            </HelperText>
                                        </>
                                    );
                                }}
                            />

                            <Controller
                                control={control}
                                name="causeType"
                                render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                    return (
                                        <>
                                            <Dropdown<CauseType>
                                                style={{
                                                    // TODO: Need to fix the border color
                                                    borderColor: fieldState.error?.message
                                                        ? theme.colors?.error
                                                        : "black",
                                                    borderWidth: 1,
                                                    padding: 8,
                                                }}
                                                placeholder="Cause Type"
                                                data={completionDependendies.causeTypes}
                                                labelField="Name"
                                                valueField="Name"
                                                onChange={(item) => onChange(item.Name)}
                                                value={value}
                                                onBlur={onBlur}
                                                // Need to handle the error color!!
                                                mode="default"
                                            />
                                            <HelperText type="error" visible={!!fieldState.error}>
                                                {fieldState.error?.message}
                                            </HelperText>
                                        </>
                                    );
                                }}
                            />

                            <Controller
                                control={control}
                                name="repairDefinition"
                                render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                    return (
                                        <>
                                            <Dropdown<RepairDefinition>
                                                style={{
                                                    // TODO: Need to fix the border color
                                                    borderColor: fieldState.error?.message
                                                        ? theme.colors?.error
                                                        : "black",
                                                    borderWidth: 1,
                                                    padding: 8,
                                                }}
                                                placeholder="Repair Definition"
                                                data={completionDependendies.repairDefinitions}
                                                labelField="Name"
                                                valueField="Name"
                                                onChange={(item) => onChange(item.Name)}
                                                value={value}
                                                onBlur={onBlur}
                                                // Need to handle the error color!!
                                                mode="default"
                                            />
                                            <HelperText type="error" visible={!!fieldState.error}>
                                                {fieldState.error?.message}
                                            </HelperText>
                                        </>
                                    );
                                }}
                            />

                            <Controller
                                control={control}
                                name="initiativeCode"
                                render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                    return (
                                        <>
                                            <Dropdown<InitiativeCode>
                                                style={{
                                                    // TODO: Need to fix the border color
                                                    borderColor: fieldState.error?.message
                                                        ? theme.colors?.error
                                                        : "black",
                                                    borderWidth: 1,
                                                    padding: 8,
                                                }}
                                                placeholder="Initiative Code"
                                                data={completionDependendies.initiativeCodes}
                                                labelField="Name"
                                                valueField="Name"
                                                onChange={(item) => onChange(item.Name)}
                                                value={value}
                                                onBlur={onBlur}
                                                // Need to handle the error color!!
                                                mode="default"
                                            />
                                            <HelperText type="error" visible={!!fieldState.error}>
                                                {fieldState.error?.message}
                                            </HelperText>
                                        </>
                                    );
                                }}
                            />

                            <Controller
                                control={control}
                                name="lateCompletionReason"
                                render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                    return (
                                        <>
                                            <Dropdown<LateCompletionReason>
                                                style={{
                                                    // TODO: Need to fix the border color
                                                    borderColor: fieldState.error?.message
                                                        ? theme.colors?.error
                                                        : "black",
                                                    borderWidth: 1,
                                                    padding: 8,
                                                }}
                                                placeholder="Late Completion Reason"
                                                data={completionDependendies.lateCompletionReasons}
                                                labelField="value"
                                                valueField="value"
                                                onChange={(item) => onChange(item.value)}
                                                value={value}
                                                onBlur={onBlur}
                                                // Need to handle the error color!!
                                                mode="default"
                                            />
                                            <HelperText type="error" visible={!!fieldState.error}>
                                                {fieldState.error?.message}
                                            </HelperText>
                                        </>
                                    );
                                }}
                            />
                            <HelperText type="error" visible={!!error}>
                                {error}
                            </HelperText>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button
                                    onPress={handleSubmit((d) =>
                                        onSubmit({
                                            causeType: d.causeType,
                                            comment: d.comment,
                                            initiativeCode: d.initiativeCode,
                                            lateCompletionReason: d.lateCompletionReason,
                                            repairDefinition: d.repairDefinition,
                                        }),
                                    )}
                                    uppercase={false}
                                    mode="contained"
                                    style={{
                                        marginRight: 10,
                                    }}
                                >
                                    Submit
                                </Button>
                                <Button
                                    onPress={() => {
                                        reset();
                                        onCancel();
                                    }}
                                    uppercase={false}
                                    mode="outlined"
                                >
                                    Cancel
                                </Button>
                            </View>
                        </View>
                    </>
                )}
            </Modal>
        </Portal>
    );
};

export default CompletitionForm;
