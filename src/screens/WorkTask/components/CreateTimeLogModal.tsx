import React from "react";
import { View } from "react-native";
import { Modal, Portal, Text, Button, TextInput, HelperText } from "react-native-paper";
import { TimePickerModal, DatePickerModal } from "react-native-paper-dates";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import dayjs from "dayjs";

import { TimeLog, TimeLogCategory } from "../../../store/WorkTask/reducer";
import { useAppTheme } from "../../../theme";

const timeLogSchema = z.object({
    date: z.date().refine((val) => val <= new Date(), "Date cannot be in the future"),
    // hours: z.preprocess(
    //     (val) => Number(val),
    //     z.number().min(1, "Must be at least 1 hour").max(24, "Must be less than 24 hours"),
    // ),
    category: z.string().nonempty("Category is required"),
    comment: z.string().nonempty("Comment is required"),
    startTime: z.date(),
    endTime: z.date(),
});

type TimeLogFormValues = z.infer<typeof timeLogSchema>;

type CreateTimeLogModalProps = {
    isOpen: boolean;
    onClose: () => void;
    timeLogCategories: TimeLogCategory[];
    onSubmit: (data: Pick<TimeLog, "Category" | "Description" | "Hours" | "Date">) => void;
};

const CreateTimeLogModal: React.FC<CreateTimeLogModalProps> = ({ isOpen, onClose, timeLogCategories, onSubmit }) => {
    const containerStyle = { backgroundColor: "white", padding: 20 };
    const theme = useAppTheme();

    // Create a memoized date objects with 1hr as difference
    const defaultStartEndTime = React.useMemo(() => {
        const startTime = new Date();
        const endTime = new Date();
        endTime.setHours(startTime.getHours() + 1);
        return {
            startTime: startTime,
            endTime: endTime,
        };
    }, []);

    const { handleSubmit, control, reset, watch, formState } = useForm<TimeLogFormValues>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            date: new Date(),
            startTime: defaultStartEndTime.startTime,
            endTime: defaultStartEndTime.endTime,
            category: "",
            comment: "",
        },
        resolver: zodResolver(timeLogSchema),
    });

    const processSubmit = React.useCallback(
        (data: TimeLogFormValues) => {
            // Get the time difference in 1.5 hour format
            const { startTime, endTime } = data;

            const diff = dayjs(endTime).diff(dayjs(startTime), "hour", true);
            const hours = Math.floor(diff);
            const minutes = Math.floor((diff - hours) * 60);
            // Convert mins to decimal
            const decimalMinutes = minutes / 60;
            const totalHours = hours + decimalMinutes;

            onSubmit({
                Category: data.category,
                Description: data.comment,
                Hours: `${totalHours}`,
                Date: data.date.toISOString(),
            });
        },
        [reset],
    );

    const [startTime, endTime] = watch(["startTime", "endTime"]);

    const getTimeDiff = React.useCallback(() => {
        const start = dayjs(startTime);
        const end = dayjs(endTime);
        const diffHours = end.diff(start, "hour", true);
        const diffMinutes = end.diff(start, "minute", true);
        // return in "HH:MM" format
        return `${Math.floor(diffHours)}hour(s) ${Math.floor(diffMinutes % 60)} minute(s)`;
    }, [startTime, endTime]);

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
                                                // Convert to Date object
                                            }}
                                        />
                                    </>
                                );
                            }}
                        />
                    </View>
                    <View>
                        <View
                            style={{
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Controller
                                control={control}
                                name="startTime"
                                render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                    const [timePickerOpen, setTimePickerOpen] = React.useState(false);
                                    return (
                                        <>
                                            <TimePickerModal
                                                visible={timePickerOpen}
                                                onConfirm={(params) => {
                                                    setTimePickerOpen(false);
                                                    // Create a new date object with the same date as the current value
                                                    const newDate = new Date(value);
                                                    // Set the hours and minutes to the new values
                                                    newDate.setHours(params.hours);
                                                    newDate.setMinutes(params.minutes);
                                                    // Update the value
                                                    onChange(newDate);
                                                }}
                                                onDismiss={() => setTimePickerOpen(false)}
                                                hours={value.getHours()}
                                                minutes={value.getMinutes()}
                                                locale="en"
                                            />

                                            <TextInput
                                                mode="outlined"
                                                label="Start Time"
                                                editable={false}
                                                onBlur={onBlur}
                                                // TODO: Format the date
                                                value={dayjs(value).format("hh:mm A")}
                                                error={!!fieldState.error}
                                                right={
                                                    <TextInput.Icon
                                                        icon="clock"
                                                        onPress={() => setTimePickerOpen(true)}
                                                    />
                                                }
                                                autoCapitalize="none"
                                                returnKeyType="next"
                                            />
                                        </>
                                    );
                                }}
                            />
                            <Controller
                                control={control}
                                name="endTime"
                                render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                    const [timePickerOpen, setTimePickerOpen] = React.useState(false);
                                    return (
                                        <>
                                            <TimePickerModal
                                                visible={timePickerOpen}
                                                onConfirm={(params) => {
                                                    setTimePickerOpen(false);
                                                    // Create a new date object with the same date as the current value
                                                    const newDate = new Date(value);
                                                    // Set the hours and minutes to the new values
                                                    newDate.setHours(params.hours);
                                                    newDate.setMinutes(params.minutes);
                                                    // Update the value
                                                    onChange(newDate);
                                                }}
                                                onDismiss={() => setTimePickerOpen(false)}
                                                hours={value.getHours()}
                                                minutes={value.getMinutes()}
                                                locale="en"
                                            />

                                            <TextInput
                                                mode="outlined"
                                                label="End Time"
                                                editable={false}
                                                onBlur={onBlur}
                                                // TODO: Format the date
                                                value={dayjs(value).format("hh:mm A")}
                                                error={!!fieldState.error}
                                                right={
                                                    <TextInput.Icon
                                                        icon="clock"
                                                        onPress={() => setTimePickerOpen(true)}
                                                    />
                                                }
                                                autoCapitalize="none"
                                                returnKeyType="next"
                                            />
                                        </>
                                    );
                                }}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                            }}
                        >
                            <Text variant="titleSmall">Time : {getTimeDiff()}</Text>
                        </View>
                        <HelperText type="error" visible={!!formState.errors?.endTime}>
                            {formState.errors?.endTime?.message}
                        </HelperText>
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
                                            style={{
                                                // TODO: Need to fix the border color
                                                borderColor: fieldState.error?.message ? theme.colors?.error : "black",
                                                borderWidth: 1,
                                                padding: 8,
                                            }}
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
                            onPress={handleSubmit(processSubmit)}
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
