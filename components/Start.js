import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const image = require('../assets/images/bg.png');

//what allows users to input their name
export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: ""}
    }


    render() {
        return (
            //The container that holds everything
            <View style={ styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                     <Text style={ styles.text}>Welcome!</Text>

                     <View style={ styles.box}>
                       <TouchableOpacity>
                           <View style={styles.bar}>
                                <TextInput
                                    stlye={ styles.input}
                                    onChangeText={(name) => this.setState({ name })}
                                    value={this.state.name}
                                    placeholder="Your Name Here ..."
                                    />
                            </View>
                    
                        </TouchableOpacity>
                     

                       
                        <View style={ styles.colors}>
                            <Text styles={styles.text}>Choose your background color below</Text>
                                <View styles={styles.selection}>
                                    <View styles={styles.color1}></View>
                                    <View styles={styles.color2}></View>
                                    <View styles={styles.color3}></View>
                                    <View stles={styles.color4}></View>
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
    text: {
        fontSize: 45,
        fontWeight: 600,
        fontColor: "#FFFFFF",
        padding: 5
        
    },
    box: {
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: 'space-evenly',
        alignItems: "center",
        height: "44%",
        width: "88%",
       


    },
    bar: {
        flexDirection: "row",
        borderColor: "#757083",
        borderWidth: 1,
        padding: 10

    },
    input: {
        fontSize: 16,
        fontWeight: 300,
        fontColor: "#757083",
        opacity: 0.5
    },
    colors: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 5,           
    },
    selection: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 5
    },
    color1: {
        backgroundColor: "black",
        height: 50,
        width: 50,
        borderRadius: 25
        
    },
    color2: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#474056",
        flexDirection: "row"
        
    },
    color3: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#8A95A5",
        flexDirection: "row"
        
    },
    color4: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#B9C6AE"
    }
});

