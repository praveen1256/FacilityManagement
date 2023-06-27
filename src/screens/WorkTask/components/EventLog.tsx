import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import dayjs from "dayjs";

import ImageViewer from "../../../components/ImageViewer";
import { EventLog } from "../../../store/WorkTask/reducer";
import { useAppTheme } from "../../../theme";

type EventLogProps = {
    eventLog: EventLog;
};

const EventLogCard: React.FunctionComponent<EventLogProps> = ({ eventLog }) => {
    const appTheme = useAppTheme();
    const [isImageViewerOpen, setIsImageViewerOpen] = React.useState(false);

    return (
        <Card
            style={{
                marginHorizontal: 16,
                marginVertical: 8,
                borderBottomColor: appTheme.colors.primary,
                borderBottomWidth: 1,
                borderTopColor: appTheme.colors.primary,
                borderTopWidth: 1,
            }}
        >
            <Card.Title title={dayjs(eventLog.ModifiedDateTime).format("ddd, MMM D, YYYY h:mm A")} />
            {eventLog.Photo && (
                <>
                    <TouchableOpacity
                        onPress={() => {
                            setIsImageViewerOpen(true);
                        }}
                    >
                        <Card.Cover
                            source={{
                                uri: `https://verizon-dev2.tririga.com/getCompanyFile.jsp?fileLoc=${eventLog.Photo}`,
                            }}
                        />
                    </TouchableOpacity>
                    <ImageViewer
                        imageUrl={`https://verizon-dev2.tririga.com/getCompanyFile.jsp?fileLoc=${eventLog.Photo}`}
                        open={isImageViewerOpen}
                        onClose={() => {
                            setIsImageViewerOpen(false);
                        }}
                    />
                </>
            )}

            <Card.Content>
                <Text>{eventLog.Comment} </Text>
            </Card.Content>
        </Card>
    );
};

export default EventLogCard;
