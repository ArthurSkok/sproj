import React from 'react';
import type {Node} from 'react';
import {BleManager} from 'react-native-ble-plx';
import {createStackNavigation, createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import requestLocationPermission from './permissions/requestPermissionLocation';
import HomeScreen from './screens/homescreen';
import MapScreen from './screens/mapscreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
} from 'react-native/Libraries/NewAppScreen';
const Stack = createStackNavigator();
const manager = new BleManager();
const SERVICE_UUID ='';

/**https://github.com/palmmaximilian/ReactNativeArduinoBLE/blob/main/App.tsx**/
export default function App() {
      async function scanDevices() {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permission Localisation Bluetooth',
            message: 'Requirement for Bluetooth',
            buttonNeutral: 'Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        ).then(answere => {
          console.log('scanning');
          // display the Activityindicator

          BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
            if (error) {
              console.warn(error);
            }

            if (scannedDevice && scannedDevice.name == 'BLEExample') {
              BLTManager.stopDeviceScan();
              connectDevice(scannedDevice);
            }
          });

          // stop scanning devices after 5 seconds
          setTimeout(() => {
            BLTManager.stopDeviceScan();
          }, 5000);
        });
      }

        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component = {HomeScreen}
                    />
                    <Stack.Screen
                        name = "LargeMap"
                        component = {MapScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );

}
/**
const App =() => {
    const App = createStackNavigator();

    return (
    <NavigationContainer>
    <App.Navigator>
        <App.Screen
            name = "Home"
            component = {HomeScreen}
            />
        <App.Screen
            name = "Map"
            component = "MapScreen"
        />
    </App.Navigator>
    );
};

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const manager = new BleManager();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const scanDevices = async () => {
      const btState = await manager.state();
      // test if bluetooth is powered on
      if (btState !== 'PoweredOn') {
        alert('Bluetooth is not powered on');
        return false;
      }
      // explicitly ask for user's permission
      const permission = await requestLocationPermission();
      if (permission) {
        manager.startDeviceScan(null, null, async (error, device) => {
          console.log('Scanning ...');
          // error handling
          if (error) {
            console.log(error);
            return;
          }
          // found a bluetooth device
          if (device.name) {
            console.log(${device.name} (${device.id})});
          }

          // stop scan after 5s
          setTimeout(() => manager.stopDeviceScan(), 5000);
        });
      }
      return true;
    };

  return (
    <NavigationContainer>
    <SafeAreaView style={backgroundStyle}>
    <TouchableOpacity style={styles.btnContainer} onPress={scanDevices}>
            <Text>Start Scanning Device</Text>
    </TouchableOpacity>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>

        </View>
      </ScrollView>
    </SafeAreaView>
    </NavigationContainer>
  );
};
*/
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    btnContainer: {
      backgroundColor: '#fff',
      padding: 5,
    },
});
