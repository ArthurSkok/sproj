import React from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import { Navigation } from 'react-native-navigation';

class MapScreen extends React.Component {
  render() {
    return (
    <>
        <Text>This is the map screen</Text>
        <Button
                    title="Go to home screen"
                    onPress={() =>
                        this.props.navigation.navigate('HomeScreen')
                    }
                />
    </>
    );
  }
}

// ...

export default MapScreen;