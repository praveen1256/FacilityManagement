import React from "react";
import { View } from "react-native";
import { Modal, Portal, Text, Button, TextInput, HelperText } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";

import { TimeLogCategory } from "../../../store/WorkTask/reducer";
import { useAppTheme } from "../../../theme";

const timeLogSchema = z.object({
    date: z.date().refine((val) => val <= new Date(), "Date cannot be in the future"),
    hours: z.preprocess(
        (val) => Number(val),
        z.number().min(1, "Must be at least 1 hour").max(24, "Must be less than 24 hours"),
    ),
    category: z.string().nonempty("Category is required"),
    comment: z.string().nonempty("Comment is required"),
});

type TimeLogFormValues = z.infer<typeof timeLogSchema>;

type CreateTimeLogModalProps = {
    isOpen: boolean;
    onClose: () => void;
    timeLogCategories: TimeLogCategory[];
    onSubmit: (data: TimeLogFormValues) => void;
};

const CreateTimeLogModal: React.FC<CreateTimeLogModalProps> = ({ isOpen, onClose, timeLogCategories }) => {
    const containerStyle = { backgroundColor: "white", padding: 20 };
    const theme = useAppTheme();

    const { handleSubmit, control, reset, watch, formState } = useForm<TimeLogFormValues>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            date: new Date(),
            hours: 1,
            category: "",
            comment: "",
        },
        resolver: zodResolver(timeLogSchema),
    });

    // const onSubmit = React.useCallback(
    //     (data: TimeLogFormValues) => {
    //         console.log(data);
    //     }
    //     [reset],
    // );

    watch();
    console.log(formState);

    // const onDismissSingle = React.useCallback(() => {
    //     setDatePickerOpen(false);
    // }, [setDatePickerOpen]);

    // const onConfirmSingleDate = React.useCallback<(params: { date: Date }) => void>(
    //     (params) => {
    //         setDatePickerOpen(false);
    //         setValue("date", params.date);
    //     },
    //     [setDatePickerOpen, setDate],
    // );

    return (
        <>
            <Portal>
                <Modal
                    visible={isOpen}
                    onDismiss={onClose}
                    contentContainerStyle={containerStyle}
                    style={{
                        marginHorizontal: 20,
                    }}
                >
                    <Text
                        variant="headlineSmall"
                        style={{
                            color: theme.colors?.primary,
                            marginBottom: 10,
                        }}
                    >
                        Add Time Log
                    </Text>
                    <View style={{ marginVertical: 0 }}>
                        <Controller
                            control={control}
                            name="date"
                            render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                const [datePickerOpen, setDatePickerOpen] = React.useState(false);
                                return (
                                    <>
                                        <TextInput
                                            mode="outlined"
                                            label="Date"
                                            // style={styles.inputContainerStyle}
                                            editable={false}
                                            onBlur={onBlur}
                                            // onChangeText={onChange}
                                            value={value.toDateString()}
                                            error={!!fieldState.error}
                                            right={
                                                <TextInput.Icon
                                                    icon="calendar"
                                                    onPress={() => setDatePickerOpen(true)}
                                                />
                                            }
                                            // disabled={isLoading}
                                            // secureTextEntry={secureTextEntry}
                                            autoCapitalize="none"
                                            // onSubmitEditing={handleSubmit((data) =>
                                            //     // onPressLogin(data.username, data.password),
                                            // )}
                                            // ref={(input: RNTextInput) => (secondInputRef.current = input)}
                                            returnKeyType="next"
                                        />
                                        <HelperText type="error" visible={!!fieldState.error}>
                                            {fieldState.error?.message}
                                        </HelperText>
                                        <DatePickerModal
                                            locale="en"
                                            mode="single"
                                            visible={datePickerOpen}
                                            onDismiss={() => setDatePickerOpen(false)}
                                            date={value}
                                            onConfirm={(params) => {
                                                setDatePickerOpen(false);
                                                onChange(params.date);
                                            }}
                                        />
                                    </>
                                );
                            }}
                        />
                    </View>
                    <View style={{ marginVertical: 0 }}>
                        <Controller
                            control={control}
                            name="hours"
                            render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                return (
                                    <>
                                        <TextInput
                                            mode="outlined"
                                            label="Hours"
                                            keyboardType="numeric"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value.toString()}
                                            error={!!fieldState.error}
                                            // disabled={isLoading}
                                            returnKeyType="next"
                                        />
                                        <HelperText type="error" visible={!!fieldState.error}>
                                            {fieldState.error?.message}
                                        </HelperText>
                                    </>
                                );
                            }}
                        />
                    </View>
                    {/* Time Category */}
                    <View style={{ marginVertical: 0 }}>
                        <Controller
                            control={control}
                            name="category"
                            render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                // Needs to be a selector
                                return (
                                    <>
                                        <Dropdown<TimeLogCategory>
                                            data={timeLogCategories}
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
                    </View>
                    {/* Comment */}
                    <View style={{ marginVertical: 0 }}>
                        <Controller
                            control={control}
                            name="comment"
                            render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                return (
                                    <>
                                        <TextInput
                                            mode="outlined"
                                            label="Comment"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value.toString()}
                                            error={!!fieldState.error}
                                            // disabled={isLoading}
                                            returnKeyType="next"
                                            multiline
                                        />
                                        <HelperText type="error" visible={!!fieldState.error}>
                                            {fieldState.error?.message}
                                        </HelperText>
                                    </>
                                );
                            }}
                        />
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            onPress={handleSubmit((d) => console.log("Submit!!", d))}
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
                                onClose();
                            }}
                            uppercase={false}
                            mode="outlined"
                        >
                            Cancel
                        </Button>
                    </View>
                </Modal>
            </Portal>
        </>
    );
};

export default CreateTimeLogModal;
