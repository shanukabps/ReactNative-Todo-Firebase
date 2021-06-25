import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button } from 'react-native';

export default function SplashScreen({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>

                <View style={styles.buttonPadding}>
                    <Button
                        onPress={() => navigation.navigate('login')}
                        title="Lets Go"
                        color="brown"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
        </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

});

