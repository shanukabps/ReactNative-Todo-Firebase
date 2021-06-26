import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Text, View } from 'react-native';
import firebase from 'firebase'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as Analytics from 'expo-firebase-analytics';

WebBrowser.maybeCompleteAuthSession();
export default function Login({ navigation }) {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '410414127042-0ccvinesa4sogkvkhp9v44mp7vgnsf2n.apps.googleusercontent.com',

        webClientId: '410414127042-0ccvinesa4sogkvkhp9v44mp7vgnsf2n.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
        }
    }, [response]);


    async function login(email, password) {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(res => {
                    console.log(`user`, res.user)
                    Analytics.logEvent('share', {
                        contentType: 'text',
                        itemId: 'User Login In',
                        method: 'Email and password'
                    });
                  //  firebase.analytics().logEvent('notification_received');
                    navigation.navigate('Todo')
                })
        } catch (error) {
            console.log(`error`, error)
            alert(error.toString());
        }
    }


    async function signUp(email, password) {
        try {
            if (password.length < 6) {
                alert("Ennter atleast 6 character for password")
                return;
            }
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            setemail("")
            setpassword("")
            alert("Registerd")
        } catch (error) {
            console.log(`error`, error)
            alert(error.toString());
            setpassword("")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>

                <View style={styles.textBox}>

                    <TextInput
                        placeholder='Enter Email'
                        style={styles.input}
                        onChangeText={e => setemail(e)}
                        value={email}
                    />
                </View>
                <View style={styles.textBox}>

                    <TextInput
                        placeholder='Enter Password'
                        style={styles.input}
                        onChangeText={e => setpassword(e)}
                        secureTextEntry={true}
                        value={password}
                    />
                </View>

                <View style={styles.buttonPadding}>
                    <TouchableOpacity
                        activeOpacity={0.5}

                        style={!email || !password ? styles.buttonDisableStyle:  styles.buttonStyle }
                        disabled={!email, !password}
                        onPress={() => login(email, password)}
                    >
                        <Text style={styles.buttonTitle}>Sign-In</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonPadding}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={!email || !password ? styles.buttonDisableStyle : styles.buttonStyle}
                        disabled={!email, !password}
                        onPress={() => signUp(email, password)}
                    >
                        <Text style={styles.buttonTitle}>SignUp</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonPadding}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyleGoogle}
                        disabled={!request}
                        onPress={async () => {
                            await promptAsync();
                        }}>
                        <Text style={ styles.buttonTitle}>Sign In With Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }, input: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderRadius: 6
    },
    testStyle: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },
    textBox: {
        paddingTop: 20,
        paddingBottom: 20
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        padding: 40,

        justifyContent: 'center'
    },
    textBox: {
        paddingTop: 20,
        paddingBottom: 20
    },
    button: {
        padding: 10,
        backgroundColor: 'white'
    },
    buttonPadding: {
        margin: 10
    }, buttonStyle: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "maroon",
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonTitle: {
        color: 'white',
        fontWeight:'bold'
    },
    buttonStyleGoogle: {
        marginVertical:20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDisableStyle: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "dimgrey",
        justifyContent: 'center',
        alignItems: 'center'
    }
});

