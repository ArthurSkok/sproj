import React from 'react';
import { StyleSheet, Text, View , Button, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {storage} from './homescreen';
class WeatherScreen extends React.Component {
    constructor (props){
                  super(props)

                  this.state = {
                  temperatureOutRead:0 ,temperatureRead:0,  humOutRead:0, humRead: 0, locale:"", coordinates: [],
              }
        }
        componentDidMount(){
            this.interval = setInterval(() => {this.setState({temperatureOutRead:storage.getNumber('temperatureOut') , humOutRead:storage.getNumber('humidityOut'),
            locale:storage.getString('localarea'), temperatureRead:parseFloat(storage.getString('temperature')),
            humRead:parseFloat(storage.getString('humidity'))}),
            console.log("Temp is", this.state.temperatureOutRead)}, 2000)
        };
        componentWillUnmount(){
            clearInterval(this.interval);
        };
  render() {
    return (
    <>
        <Text style = {styles.datat}>Current temperature is:  {this.state.temperatureOutRead}</Text>
        <Text style = {styles.datat}>Current humidity outside should be: {this.state.humOutRead}</Text>
        <Text style = {styles.datat}>Sensor reading temperature is:  {this.state.temperatureRead}</Text>
        <Text style = {styles.datat}>Sensor reading humidity is: {this.state.humRead}</Text>
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

