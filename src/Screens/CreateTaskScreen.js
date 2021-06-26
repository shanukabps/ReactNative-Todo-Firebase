import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebase } from '../Firebase/FirebaseConfig'
import { showAlert } from '../Error/Alert'
import { Picker } from '@react-native-picker/picker'


export default function CreateTaskScreen({ route, navigation }) {

    const [title, setTitle] = useState("")
    const [assginName, setAssginName] = useState("")
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [allEmails, setAllEmails] = useState([]);
    const [uniqueEmails, setUniqueEmails] = useState([]);
    const [currentuser, setCurrentUser] = useState();
    const [pickedValue, setPickedValue] = useState();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user.email)
        });
    }, []);
    useEffect(() => {
        firebase.firestore().collection('todos').onSnapshot({
            next: querySnapshot => {
                const allEmail = querySnapshot.docs.map(docSnapshot => ({
                  email:docSnapshot.data().email
                }))
                setAllEmails(allEmail)
                const uniqueArr = [];                
                allEmail&&allEmail.forEach((item) => {
                    if (!uniqueArr.includes(item.email)) {
                        uniqueArr.push(item.email);
                    }
                })
                setUniqueEmails(uniqueArr)
            }, error: (error => { console.log(`error`, error) })
        })
    }, []);

   useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params.userId) {
                var docRef = firebase.firestore().collection("todos").doc(route.params.userId);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        setTitle(doc.data().title)
                        setDate(doc.data().date)
                        setPickedValue(doc.data().assignEmail)
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            }
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (route.params.userId) {
            var docRef = firebase.firestore().collection("todos").doc(route.params.userId);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    setTitle(doc.data().title)
                    setDate(doc.data().date)
                    setPickedValue(doc.data().assignEmail)
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }        
    }, [])

    function addData() {
        if (!!title && !!pickedValue && !!date && currentuser && route.params.buttonName === 'Add Todo') {
            firebase.firestore().collection("todos").doc().set({
                email: currentuser,
                title: title,
                assignEmail: pickedValue,
                date: new Date(date).toLocaleDateString().slice(0, 10),
                status: 'not-completed'
            })
            showAlert("Successfully", "saved")
            setTitle("")
            setAssginName("")
            setDate(Date.now())
        } else if (!!title && !!pickedValue && !!date && currentuser && route.params.buttonName === 'Edit' && !!route.params.userId) {

            const db = firebase.firestore();
            db.collection('todos').doc(route.params.userId).update({
                title: title,
                assignEmail: assginName,
                date: new Date(date).toLocaleDateString().slice(0, 10),
            })
            showAlert("Successfully", "Edited")
        }
        else {
       
            showAlert("Filed can not be empty", "please checked all the filed")
        }
    }
    useEffect(() => {
    }, [date])
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        ((allEmails.length > 0)&&
           ( <SafeAreaView style={styles.container}>

            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Create Task</Text>
                <Avatar
                    rounded
                    size="medium"
                    source={{
                        uri:
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXDwmtq4qvPBK5K1Bon246UGDxf9SHmKo3Eg&usqp=CAU',
                    }}
                />
            </View>
            <View style={styles.body}>
                <View style={styles.textBox}>
                    <Text styles={styles.inputText}>Title</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={e => setTitle(e)}
                        value={title}
                    />
                </View>
            
                <View style={styles.textBox}>                
                    <Text styles={styles.inputText}>Assgin Task</Text>
                    <Picker
                        selectedValue={pickedValue}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemValue !== 0) {
                                setPickedValue(itemValue)
                            }
                        }
                        }>
                        <Picker.Item key={'unselectable'} label={"Select Emali"} value={0} />
                        {uniqueEmails.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
                        })}
                    </Picker>
                  
                </View>
                <View style={styles.textBox}>
                    <Text styles={styles.inputText}>Date</Text>
                    <View>
                        <TouchableOpacity
                            title="Show date picker!"
                            style={styles.button}
                            onPress={showDatepicker}
                        >
                            <Text>{new Date(date).toLocaleDateString().slice(0, 10)}</Text>
                        </TouchableOpacity>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
                <Button
                    onPress={() => addData()}
                    title={!!route.params.buttonName ? route.params.buttonName : 'Add Todo'}
                    color="maroon"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
            </SafeAreaView>) || (allEmails&&<View><Text>Loading</Text></View> )  )
    )
}

const styles = StyleSheet.create({
    containerPicker: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    topBar: {
        flex: 1,
        backgroundColor: "maroon",
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBarText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },
    body: {
        flex: 7.7,
        flexDirection: 'column',
        padding: 10,

    },
    input: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'white'
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
    button: {
        padding: 10,
        backgroundColor: 'white'
    }

});