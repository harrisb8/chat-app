import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat'

//state of the message that will change

export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
          messages: [],
        };
    }
   //created a message for the user, includes id, text and date message was created
        componentDidMount() {
            this.setState({
              messages: [
                {
                  _id: 1,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                },
                {
                    _id: 2,
                    text: 'Welcome to the Chat',
                    createdAt: new Date(),
                    system: true,
                   },
              ],
            })
          }
         //changes previous message
          onSend(messages = []) {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, messages),
            }));
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
            <View style={{flex:1, justifyContent:'center', alignItems: "center"}}>
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