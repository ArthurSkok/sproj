import React from 'react';
import { StyleSheet, Text, View , Button, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {storage} from './homescreen';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 40;
const LONGITUDE = -70;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class MapScreen extends React.Component {
    constructor (props){
              super(props)

              this.state = {
              lat:0 , lon:0, coordinates: [],
          }
    }
    componentDidMount(){
    this.interval = setInterval(() => this.setState({lat:storage.getString('latitude') , lon:storage.getString('longitude')}), 2000)
    };
    componentDidUnmount(){
    clearInterval(this.interval);
    };

  render() {
    return (
    <>
        <Text>This is the map screen</Text>
        <Text>{this.state.lat}</Text>
        <Text>{this.state.lon}</Text>
        <Button
                    title="Go to home screen"
                    onPress={() =>
                        this.props.navigation.navigate('Home')
                    }
        />
    <View style={styles.mapcontainer}>
       <MapView
           provider={PROVIDER_GOOGLE}
           style={styles.map}
           minZoomLevel = {6}
           onMapReady={() => {}}
           initialRegion={{
             latitude: LATITUDE,
             longitude: LONGITUDE,
             latitudeDelta: LATITUDE_DELTA,
             longitudeDelta: LONGITUDE_DELTA,
           }}
           showUserLocation={true} >
           <Marker coordinate={{
             latitude:  parseFloat(this.state.lat),//parseFloat(this.state.lat, 10),
             longitude:  parseFloat(this.state.lon), //parseFloat(this.state.lon, 10),
           }} />
       </MapView>
    </View>
    </>
    );
  }
}

// ...
const styles = StyleSheet.create({
     mapcontainer: {
           height: 400,
           width: 400,
           justifyContent: 'flex-end',
           alignItems: 'center',
     },
     map: {
           ...StyleSheet.absoluteFillObject,
     },
})
export default MapScreen;