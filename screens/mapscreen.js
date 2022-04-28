import React from 'react';
import { StyleSheet, Text, View , Button, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 40;
const LONGITUDE = -70;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class MapScreen extends React.Component {

  render() {
    return (
    <>
        <Text>This is the map screen</Text>
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
           /**showUserLocation={true} >
           <Marker coordinate={{
             latitude: 37.78825,
             longitude: -122.4324,
           }}  **/>
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