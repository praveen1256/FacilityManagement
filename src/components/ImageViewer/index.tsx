import { Image } from "react-native";
import React from "react";
import RNAImageViewer from "react-native-reanimated-image-viewer";
import { IconButton, Modal, Portal } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
    imageUrl: string;
    open: boolean;
    onClose: () => void;
};

const ImageViewer: React.FunctionComponent<Props> = ({ imageUrl, open, onClose }) => {
    const [imageDimensions, setImageDimensions] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        Image.getSize(imageUrl, (width, height) => {
            setImageDimensions({ width, height });
        });
    }, [imageUrl]);

    return (
        <>
            <Portal>
                <Modal
                    visible={open}
                    onDismiss={() => onClose()}
                    contentContainerStyle={{
                        backgroundColor: "black",
                        padding: 20,
                        // margin: 20,
                        height: "100%",
                        width: "100%",
                    }}
                    dismissable={true}
                >
                    <IconButton
                        icon={"close"}
                        iconColor="white"
                        size={30}
                        style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 100,
                        }}
                        onPress={() => onClose()}
                    />
                    {/* <Icon
                        name="close"
                        size={30}
                        color="white"
                        style={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            // backgroundColor: "blue",
                            zIndex: 100,
                        }}
                        onPress={() => onClose()}
                    /> */}
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <RNAImageViewer
                            imageUrl={imageUrl}
                            width={imageDimensions.width}
                            height={imageDimensions.height}
                            onRequestClose={() => {
                                onClose();
                            }}
                        />
                    </GestureHandlerRootView>
                </Modal>
            </Portal>
        </>
    );
};

export default ImageViewer;
