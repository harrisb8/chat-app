
 import PropTypes from 'prop-types';
 import React from 'react';
 import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
 import * as Location from 'expo-location';
 import * as Permissions from 'expo-permissions';
 import * as ImagePicker from 'expo-image-picker';

 class CustomActions extends React.Component {
 //allows user to pick an image 
 pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
 //asking for permission to use gallery
    if(status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));
 
      if (!result.cancelled) {
        this.setState({
          image: result
        });  
      }
 
    }
  }

  //allows user to take a picture 
  takePicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
 //ask for permission to use camera
    if(status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));
 
      if (!result.cancelled) {
        this.setState({
          image: result
        });  
      }
 
    }
  }

  // get users location with permission
 getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status === 'granted') {
      let result = await Location.getCurrentPositionAsync({});
 
      if (result) {
        this.setState({
          location: result
        });
      }
    }
  }

  
 
 //action button choose an image, take a photo, get location
 onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return;
          case 1:
            console.log('user wants to take a photo');
            return;
          case 2:
            console.log('user wants to get their location');
          default:
        }
      },
    );
};


//style action button
    render() {
        return (
        <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
            <View style={[styles.wrapper, this.props.wrapperStyle]}>
            <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
        );
    }

}

  CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
   };

  const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 16,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
   });

