import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const image = require('../assets/images/bg.png');

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: ""}
    }
    render() {
        return (
            <View style={ styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                     <Text style={ styles.text}>Welcome!</Text>

                     <View style={ styles.box}>
                       <TouchableOpacity>
                        <TextInput
                            stlye={ styles.input}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                            placeholder="Your Name Here ..."
                        />
                        </TouchableOpacity>
                        <View style={ styles.colors}>
                            <Text>Choose your background color below</Text>
                            <View styles={styles.color1}></View>
                            <View styles={ styles.color2}></View>
                            <View styles={ styles.color3}></View>
                            <View styles={ styles.color4}></View>
                        </View>
                            <Button styles={{fontSize: 16, fontWeight: 600, fontColor: "#FFFFFF", buttonColor: "#757083", alignContent: "center"}}
                                title="Start Chatting"
                                onPress={() => 
                                this.props.navigation.navigate("Chat", { name: this.state.name })
                                }
                            />
                     </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
       // justifyContent: 'center',
       // alignItems: 'center'
    },
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center'
      },
    text: {
        fontSize: 45,
        fontWeight: 600,
        fontColor: "#FFFFFF",
        //padding: 100
    },
    box: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 15,
        justifyContent: 'space-evenly'


    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        margin: 5,
        fontSize: 16,
        fontWeight: 300,
        fontColor: "#757083"
    },
    colors: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
        margin: 25   
    },
    color1: {
        backgroundColor: "black",
        height: 50,
        
    },
    color2: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#474056"
    },
    color3: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#8A95A5"
    },
    color4: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#B9C6AE"
    }
});

