import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat'
//enable firebase which stores information
const firebase = require('firebase');
require('firebase/firestore');

//added firebase auth

//state of the message that will change
export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
          messages: [],
          loggedInText: "Please wait while you are being logged in",
          createdAt:"",
          uid: 0,
              id: {
              }
        };

        
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDoBQsWPARS-vpFgbOXVJ-ChvGcL5duWd8",
        authDomain: "chat-app-326ae.firebaseapp.com",
        projectId: "chat-app-326ae",
        storageBucket: "chat-app-326ae.appspot.com",
        messagingSenderId: "74194142247",
        appId: "1:74194142247:web:2422a6fdee7fc1e1217a02",
        measurementId: "G-J41NHEHSQV"
      });
    }


        this.referenceChatMessages = firebase.firestore().collection("messages");
    }
   //created a message for the user, includes id, text and date message was created
        componentDidMount() {
           const name = this.props.route.params;
            //this.setState({
              //messages: [
                //{
                  //_id: 1,
                  //text: 'Hello developer',
                  //createdAt: new Date(),
                  //user: {
                    //_id: 2,
                    //name: 'React Native',
                    //avatar: 'https://placeimg.com/140/140/any',
                  //},
                //},
                //{
                  //  _id: 2,
                    //text: 'Welcome to the Chat',
                    //createdAt: new Date(),
                    //system: true,
                   //},
              //],
            //})
         // }

          this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
              firebase.auth().signInAnonymously();
            }
            this.setState({
              uid: user.uid,
              messages: [],
            });
            this.unsubscribe = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate);
          });
        }

         //changes previous message
          //onSend(messages = []) {
            //this.setState(previousState => ({
              //messages: GiftedChat.append(previousState.messages, messages),
            //}));
          //}

          onCollectionUpdate = (querySnapshot) => {
            const messages = [];
            // go through each document
            querySnapshot.forEach((doc) => {
              // get the QueryDocumentSnapshot's data
              let data = doc.data();
              messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: data.user,
              });
            });
          }

          componentWillUnmount() {
            this.unsubscribe();
          }


          //changes the color of text button
          /*renderBubble(props) {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: '#000'
                  }
                }}
              />
            );
          }*/
          

        //changes the title to name inputed by user
    render() {
        const {name, bgImage} = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
          //applies message that the user adds

      
        return (
            <View style={{flex:1, justifyContent:'center', alignItems: "center", backgroundColor: bgImage? bgImage: "white"}}>
               <Text>{this.state.loggedInText}</Text>
              <GiftedChat
                 //renderBubble={this.renderBubble.bind(this)}
                 messages={this.state.messages}
                 onSend={messages => this.onSend(messages)}
                 user={{
                 _id: 1,
                 }}
              />
              { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
               <Button
                    title="Go to Start"
                    onPress={() => this.props.navigation.navigate("Start")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        fontSize: 16,
        fontWeight: 300,
        fontColor: 'red',
        opacity: 100,
    },
    
});