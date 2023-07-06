import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, HelperText, Modal, Portal, Text, TextInput } from "react-native-paper";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { launchImageLibrary, ImagePickerResponse } from "react-native-image-picker";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useAppTheme } from "../../../theme";
const commentSchema = z.object({
    comment: z.string().nonempty(),
    image: z.string(),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CreateCommentFormProps {
    isOpen: boolean;
    onSubmit: (values: { comment: string; image: string | null }) => void;
    onDone: () => void;
    onCancel: () => void;
    isLoading: boolean;
    error: string | null;
    success: boolean;
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
    isOpen,
    onSubmit,
    onDone,
    isLoading,
    error,
    success,
}) => {
    const theme = useAppTheme();

    const [imageUploading, setImageUploading] = React.useState(false);

    const uploadImage = async (
        img: ImagePickerResponse,
    ): Promise<{
        errorMessage: string | null;
        fileSelected: string | null;
        fileURL: string | null;
        localFileURL: string | null;
    }> => {
        if (img.didCancel)
            return {
                errorMessage: "ImagePicker Error: User cancelled image selection",
                fileSelected: null,
                fileURL: null,
                localFileURL: null,
            };

        if (img.errorCode)
            return {
                errorMessage: `ImagePicker Error: ${img.errorMessage}`,
                fileSelected: null,
                fileURL: null,
                localFileURL: null,
            };

        if (!img.assets)
            return {
                errorMessage: "ImagePicker Error: No assets",
                fileSelected: null,
                fileURL: null,
                localFileURL: null,
            };

        const asset = img.assets[0];

        if (!asset)
            return {
                errorMessage: "ImagePicker Error: No asset",
                fileSelected: null,
                fileURL: null,
                localFileURL: null,
            };

        const { uri, fileName, type } = asset;

        setImageUploading(true);
        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
        await delay(3000);

        const formData = new FormData();
        formData.append("file", {
            uri,
            name: fileName,
            type,
        });

        const response = await axios.post<{
            isFileLoaded: boolean;
            fileSelected: string;
            errorMessage: string;
            fileURL: string;
        }>("https://verizon-dev2.tririga.com/p/fileupload/uploadimage", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        setImageUploading(false);

        return {
            errorMessage: response.data.errorMessage,
            fileSelected: response.data.fileSelected,
            fileURL: response.data.fileURL,
            localFileURL: uri!,
        };
    };

    const { handleSubmit, control, setError, reset } = useForm<CommentFormValues>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            comment: "",
            image: "",
        },
        resolver: zodResolver(commentSchema),
    });

    const handleCancelOrDone = () => {
        reset();
        onDone();
    };

    return (
        <Portal>
            <Modal
                visible={isOpen}
                onDismiss={handleCancelOrDone}
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
                    Comment
                </Text>
                {success && (
                    <>
                        <Text>Comment added!</Text>
                        <Button
                            mode="contained"
                            onPress={handleCancelOrDone}
                            loading={isLoading}
                            disabled={isLoading}
                            style={{ marginTop: 10 }}
                        >
                            Done
                        </Button>
                    </>
                )}

                {!success && (
                    <View style={{ marginBottom: 10 }}>
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
                                            disabled={isLoading}
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
                            name="image"
                            render={({ field: { onChange }, fieldState }) => {
                                const [localImage, setLocalImage] = React.useState<string | null>(null);
                                return (
                                    <>
                                        <TouchableOpacity
                                            disabled={imageUploading}
                                            onPress={() => {
                                                launchImageLibrary(
                                                    {
                                                        mediaType: "photo",
                                                        includeBase64: true,
                                                        selectionLimit: 1,
                                                    },
                                                    async (img) => {
                                                        if (img.didCancel) return;
                                                        // New Image Selected, So Reset the Image
                                                        setLocalImage(null);
                                                        onChange("");

                                                        const fileUrl = await uploadImage(img);
                                                        console.log("img", fileUrl);
                                                        onChange(fileUrl.fileURL || "");
                                                        setLocalImage(fileUrl.localFileURL);
                                                        if (fileUrl.errorMessage)
                                                            setError("image", {
                                                                type: "custom",
                                                                message: fileUrl.errorMessage,
                                                            });
                                                    },
                                                );
                                            }}
                                        >
                                            <View
                                                style={{
                                                    padding: 10,
                                                    paddingVertical: 20,
                                                    // height: 40,
                                                    // width: 40,
                                                    backgroundColor: "lightgray",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {!localImage && (
                                                    <>
                                                        <Icon name="file-send" size={32} />
                                                        {/* <Text>Upload Image</Text> */}
                                                    </>
                                                )}
                                                {imageUploading && <ActivityIndicator />}
                                                {localImage && (
                                                    <Image
                                                        source={{ uri: localImage }}
                                                        style={{ width: 100, height: 100 }}
                                                    />
                                                )}
                                                {localImage && (
                                                    <Button
                                                        onPress={() => {
                                                            onChange("");
                                                            setLocalImage(null);
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                        <HelperText type="error" visible={!!fieldState.error}>
                                            Error: {fieldState.error?.message}
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
                                onPress={handleSubmit(onSubmit)}
                                uppercase={false}
                                disabled={isLoading || imageUploading}
                                mode="contained"
                                style={{
                                    marginRight: 10,
                                }}
                            >
                                Submit
                            </Button>
                            <Button onPress={handleCancelOrDone} uppercase={false} mode="outlined">
                                Cancel
                            </Button>
                        </View>
                    </View>
                )}
            </Modal>
        </Portal>
    );
};

export default CreateCommentForm;
