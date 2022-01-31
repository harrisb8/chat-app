import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground } from 'react-native';


export default class Chat extends React.Component {
   
    render() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        return (
            <View style={{flex:1, justifyContent:'center', alignItems: "center"}}>
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