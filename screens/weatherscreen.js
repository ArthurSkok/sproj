import React from 'react';
import { StyleSheet, Text, View , Button, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {storage} from './homescreen';
class WeatherScreen extends React.Component {
    constructor (props){
                  super(props)

                  this.state = {
                  temperatureRead:0 , humRead:0, locale:"", coordinates: [],
              }
        }
        componentDidMount(){
            this.interval = setInterval(() => {this.setState({temperatureRead:storage.getNumber('temperature') , humRead:storage.getNumber('humidity'),locale:storage.getString('localarea')}), console.log("Temp is", this.state.temperatureRead)}, 2000)
        };
        componentWillUnmount(){
            clearInterval(this.interval);
        };
  render() {
    return (
    <>
        <Text style = {styles.datat}>Current temperature is:  {this.state.temperatureRead}</Text>
        <Text style = {styles.datat}>Current humidity outside should be: {this.state.humRead}</Text>
        <Text style = {styles.datat}>Your localarea is: {this.state.locale}</Text>
        <Button
                    title="Go to home screen"
                    onPress={() =>
                        this.props.navigation.navigate('Home')
                    }
        />
    </>
    );
}
}
const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',

  },
  text: {
    textAlign: 'center',
    color: 'red',
    background: 'red',

  },
  bottomButton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  separator: {
    borderBottomColor: '#737373',
  },
  datat: {
    color: 'red',
    textAlign: 'center',
  },
});





export default WeatherScreen;

