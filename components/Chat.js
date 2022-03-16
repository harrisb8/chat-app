import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

import firebase from 'firebase';
import 'firebase/firestore';


// Firebase configuration
const firebaseConfig ={
  apiKey: "AIzaSyDoBQsWPARS-vpFgbOXVJ-ChvGcL5duWd8",
  authDomain: "chat-app-326ae.firebaseapp.com",
  projectId: "chat-app-326ae",
  storageBucket: "chat-app-326ae.appspot.com",
  messagingSenderId: "74194142247",
  appId: "1:74194142247:web:2422a6fdee7fc1e1217a02",
  measurementId: "G-J41NHEHSQV"

};

export default class Chat extends React.Component {

  constructor(){
    super();
    this.state ={
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
    };

    // Initializing firebase
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    // Reference to the Firestore message collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.refMsgsUser = null;

  }
  

  componentDidMount() {
    // Set the page title once Chat is loaded
    let name = this.props.route.params.name;
    // Adds the name to top of screen
    this.props.navigation.setOptions({ title: name })

    // Listens for updates in the collection
    this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate)

    // User authentication performed first (listen for authentication events)
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        return await firebase.auth().signInAnonymously();
      }

      // Update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        },
      });

      // Referencing messages of current user
      this.refMsgsUser = firebase
        .firestore()
        .collection("messages")
        .where("uid", "==", this.state.uid);
    });

    // Save messages locally to AsyncStorage
    this.saveMessage();
  }


  componentWillUnmount() {
    // Unsubscribe from collection updates (stop listening to authentication)
    this.authUnsubscribe();
    // Stop listening for changes
    this.unsubscribe();

  }


  // Get messages from AsyncStorage
	getMessages = async () => {
		let messages = '';
		try {
			messages = (await AsyncStorage.getItem('messages')) || [];
			this.setState({
				messages: JSON.parse(messages),
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	// Save messages on the asyncStorage
	saveMessage = async () => {
		try {
			await AsyncStorage.setItem(
				'messages',
				JSON.stringify(this.state.messages)
			);
		} catch (error) {
			console.log(error.message);
		}
	};

	// Delete message from asyncStorage
	deleteMessages = async () => {
		try {
			await AsyncStorage.removeItem('messages');
			this.setState({
				messages: [],
			});
		} catch (error) {
			console.log(error.message);
		}
	};


  // When updated set the messages state with the current data 
  onCollectionUpdate = (querySnapshot) => { 
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        },
      });
    });
    this.setState({
      messages: messages
    });
  };

  

  // Add messages to database
  addMessage() { 
    const message = this.state.messages[0];
    // Add a new messages to the collection
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
      
    });
  }


  // Calback function for when user sends a message
  /* The function setState() is called with the parameter previousState, 
  which is a reference to the component’s state at the time the change is applied. 
  Then comes the append() function provided by GiftedChat, 
  which appends the new message to the messages object. In other words, 
  the message a user has just sent gets appended to the state messages so 
  that it can be displayed in the chat. */
  onSend(messages = []) {
		this.setState(
			previousState => ({
				messages: GiftedChat.append(previousState.messages, messages),
			}),
			() => {
				this.saveMessage();
				this.addMessage();
			}
		);
	}

  // Customize the chat bubble background color
  renderBubble(props) { 
    return (
      <Bubble {...props} 
        wrapperStyle={{ 
          right: {backgroundColor: 'purple'},
       }}
      />
    );
  }

  

  render() {
    // Set the background color selected from start screen
    const  bgColor  = this.props.route.params.bgColor;
    return (
     
      <View style={{
        flex: 1,
        alignItems:'center', 
        justifyContent:'center', 
        backgroundColor: bgColor}}
      >
        
        <View style={styles.giftedChat}>
           <GiftedChat
              renderBubble={this.renderBubble.bind(this)}
              messages={this.state.messages}
              //user={this.state.user}
              onSend={messages => this.onSend(messages)}
              user={{
                _id: this.state.user._id,
                name: this.state.name,
                avatar: this.state.user.avatar
              }}
           />
            { Platform.OS === 'android' ? (
              <KeyboardAvoidingView behavior="height" />
            ) : null}
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center', 
    justifyContent:'center',
    flexDirection: 'column'
  },
  giftedChat: {
    flex: 1,
    width: "88%",
    paddingBottom: 10,
    justifyContent: "center",
    borderRadius: 5,
  },

});