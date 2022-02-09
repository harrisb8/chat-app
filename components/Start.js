import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const image = require('../assets/images/bg.png');

//what allows users to input their name
export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", bgcolor: ""}

    }

    //background color choices
    colors = {
        black: "#090C08",
        independence: "#474056",
        duskGray: "#8A95A5",
        composedGreen: "#B9C6AE",
    };


    render() {
        return (
            //The container that holds everything
            <View style={ styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View styles={styles.header}>
                        <Text style={ styles.title}>Welcome!</Text>
                    </View>
                        <View style={ styles.box}>
                       
                           <View style={styles.bar}>
                                <TextInput
                                    stlye={ styles.input}
                                    onChangeText={(name) => this.setState({ name })}
                                    value={this.state.name}
                                    placeholder="Your Name Here ..."
                                    >
                                    </TextInput>
                            </View>
                    
                    
                     

                       
                        <View style={ styles.colors}>
                            <Text styles={styles.text}>Choose your background color below</Text>
                                <View styles={styles.colorSample}>
                                    <View styles={styles.colorChoice}></View>
                                    <View styles={styles.color1}></View>
                                    <View styles={styles.color2}></View>
                                    <View styles={styles.color3}></View>
                                    <View styles={styles.color4}></View>
                                </View>
                            
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
    header: {
        height: "44%",
        width: "88%"
        
    },
    title: {
        fontSize: 45,
        fontWeight: "bold",
        color: 'white',
        textAlign: "center",
        padding: 20
    },
    box: {
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center",
        height: "44%",
        width: "88%"
    },
    bar: {
        flexDirection: "row",
        borderColor: "#757083",
        borderWidth: 1,
        padding: 10,
        width:"88%" 
    },
    input: {
        fontSize: 16,
        fontWeight: 300,
        fontColor: "#757083",
        opacity: 0.5
    },
    colors: {
        flexDirection: 'column',
        padding: 20,     
        width: "88%",
        marginRight: "auto"      
    },
    colorSamples: {
        flexDirection: "row",
        justifyContent: "space-betweeen",
        padding: 5
    },
    colorChoice: {
        alignSelf: "center",
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white',
    
    },
    color1: {
        backgroundColor: "black",
        height: 40,
        width: 40,
        borderRadius: 20,
        flexDirection: "row",
        margin: 2
        
    },
    color2: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#474056",
        flexDirection: "row",
        margin: 2
        
    },
    color3: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#8A95A5",
        flexDirection: "row",
        margin: 2
        
    },
    color4: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#B9C6AE",
        margin: 2
    }
});

