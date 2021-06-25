import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text, SafeAreaView, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';
import { firebase } from '../Firebase/FirebaseConfig'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function DoneScreen({ navigation }) {
    const [task, setTask] = useState([]);
    const [completedTask, setCompltedTask] = useState([]);
    const [currentuser, setCurrentUser] = useState();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user.email)
            setPending(false)
        });
    }, []);

    useEffect(() => {
        firebase.firestore().collection('todos').onSnapshot({
            next: querySnapshot => {
                const tasks = querySnapshot.docs.map(docSnapshot => ({
                    id: docSnapshot.id,
                    title: docSnapshot.data().title,
                    date: docSnapshot.data().date,
                    status: docSnapshot.data().status
                }))
                setTask(tasks)
            }, error: (error => { console.log(`error`, error) })
        })
    }, []);

    useEffect(() => {
        const comTask = task.filter(a => {
            console.log(`a.status`, a.status)
            return a.status == 'done'
        })
        setCompltedTask(comTask)
    }, [task])




    const Item = ({ title, date, id }) => (
    
          
                <View style={styles.item}>
                    <View style={styles.fatListLeftCard}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                    <Avatar
                        rounded
                        size="medium"
                        source={{
                            uri:
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXDwmtq4qvPBK5K1Bon246UGDxf9SHmKo3Eg&usqp=CAU',
                        }}
                    />
                </View>
    
 
    );

    return (
        <View style={styles.container}>

            <View style={styles.topBar}>
                <Text style={styles.topBarText}>completed Task</Text>
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
                <SafeAreaView style={styles.flatList}>
                    <FlatList
                        data={completedTask}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Item title={item.title} date={item.date} id={item.id} />
                        )}

                    />
                </SafeAreaView>
            </View>

            <View style={styles.addButton}>
                <Avatar
                    rounded
                    title="+"
                    size="medium"
                    onPress={() => navigation.navigate('Add', { userId: 'add-todo', buttonName: 'Add Todo' })}
                    overlayContainerStyle={{ backgroundColor: 'maroon' }}
                    containerStyle={{ marginRight: 20 }}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    itemBackground: {
        backgroundColor: 'white'
    },
    flatList: {
        flex: 1,
        marginTop: 5,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 28,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 15,
        flexWrap: 'wrap'
    },
    date: {
        fontSize: 10,
        fontWeight: 'bold',
        paddingLeft: 15,
        color: 'gray'

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    topBar: {
        flex: 1.5,
        backgroundColor: "maroon",
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topBarText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },
    body: {
        flex: 7,
    },
    addButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 0.7,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    }
    ,
    button: {
        flexDirection: 'column',
        backgroundColor: 'maroon',
        padding: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    fatListLeftCard: {
        flexDirection: 'column',

    },
    doneButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    }
});

export { styles }