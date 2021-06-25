import { Alert } from "react-native";

export const showAlert = (title,mgs) =>
    Alert.alert(
        title,
        mgs,
        [
            {
                text: "Cancel",
                
                style: "cancel",
            },
        ],

    );
