import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'firebase';
import 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import MapView from 'react-native-maps';


// Firebase configuration
const firebaseConfig ={
  //apiKey: "AIzaSyDoBQsWPARS-vpFgbOXVJ-ChvGcL5duWd8",
  //authDomain: "chat-app-326ae.firebaseapp.com",
  //projectId: "chat-app-326ae",
  //storageBucket: "chat-app-326ae.appspot.com",
  //messagingSenderId: "74194142247",
  //appId: "1:74194142247:web:2422a6fdee7fc1e1217a02",
  //measurementId: "G-J41NHEHSQV"
  apiKey: "AIzaSyCEDDwFdYM7Hq9yXBJo3GXhQul0LOG6rhg",
  authDomain: "chat-app-6a05d.firebaseapp.com",
  projectId: "chat-app-6a05d",
  storageBucket: "chat-app-6a05d.appspot.com",
  messagingSenderId: "887682005525",
  appId: "1:887682005525:web:b4e92697f69b048187ec1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
      image: null,
      location: null
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

    //Check and see if the user is online or offline
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
      } else {
        console.log('offline');
      }
    });

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
  which is a reference to the component???s state at the time the change is applied. 
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

  //takes away chat box if offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }  

  //does the function contain location data. If so user can pull up a map view
  renderCustomView (props) {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
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