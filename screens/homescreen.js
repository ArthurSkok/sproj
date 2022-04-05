import React from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import { Navigation } from 'react-native-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
    <View style = {styles.container}>
        <Text style = {styles.title}>This is the home screen</Text>

        <View style = {styles.bottomButton}>
        <Button
            title="Go to map screen"
            onPress={() =>
                this.props.navigation.navigate('LargeMap')
            }
        />
        </View>
    </View>
    );
  }
}

// ...
const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
  },
  bottomButton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 400,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default HomeScreen;