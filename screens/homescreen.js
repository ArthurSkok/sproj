import React from 'react';
import {Platform, NativeModules, NativeEventEmitter, PermissionsAndroid, StyleSheet, Text, View , Button, Alert} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {BleManager} from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import { AsyncStorage } from 'react-native';
//import { storeData, getData } from '../async/asyncfuncs';
import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV()
import { getDistance } from 'geolib';
import { getWeather, dailyForecast, showWeather } from 'react-native-weather-api';


export default class HomeScreen extends React.Component {
  constructor (props){
          super(props)
          this.manager = new BleManager()
          this.state = {
              deviceid : '', serviceUUID:'', characteristicsUUID : '', text1 : '',makedata : [],
              notificationReceiving : false, data: '', latitude: '', longitude: '', distCount: 0, totalDist:0, temperature: '0', hum : '0',
          }
      }
      firstAlert() {  //function which will call on click of first button
          Alert.alert(
      'Our Title for first alert',
      'Our message for the first alert',
          [
              {
                  text: 'Cancel',
                  onPress: () => console.log('End user is not at all interested for it'),
                  style: 'cancel',
              },
          {text: 'OK', onPress: () => console.log('End user is interested for it')},
          ] );
      }

          /**componentDidMount(){
            this.interval = setInterval(() => getWeather({key:"f85bd4b89ec2b15644da1f943dc6e83e",
             lat:40,//parseFloat(this.state.latitude),
              lon:70,//parseFloat(this.state.longitude),
               unit:"imperial"
           }).then(() => {
            var data = new showWeather();
             storage.set('temperature', data.temp);
              storage.set('humidity', data.humidity);
              }),
               1000)
          }
          componentWillUnmount(){
            clearInterval(this.interval);
          }
      /**
      componentWillUnmount(){
          this.manager.cancelTransaction(transactionId)
          this.manager.stopDeviceScan();
          this.manager.destroy();
          delete this.manager;
      }
      **/
      /**UNSAFE_componentWillMount() {
          this.manager = new BleManager()
              if (Platform.OS === 'android' && Platform.Version >= 23) {
                  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                      if (result) {
                          console.log("Permission is OK");
                          // this.retrieveConnected()
                      } else {
                          PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                              if (result) {
                                  console.log("User accept");
                              } else {
                                  console.log("User refuse");
                              }
                          });
                      }
                  });
              }
      }
      **/
      getServicesAndCharacteristics(device) {
              return new Promise((resolve, reject) => {
                  device.services().then(services => {
                      const characteristics = []
                      console.log("HM-10",services)
                      services.forEach((service, i) => {
                          service.characteristics().then(c => {
                            console.log("service.characteristics")

                              characteristics.push(c)
                              console.log(characteristics)
                              if (i === services.length - 1) {
                                  const temp = characteristics.reduce(
                                      (acc, current) => {
                                          return [...acc, ...current]
                                      },
                                      []
                                  )
                                  const dialog = temp.find(
                                      characteristic =>
                                          characteristic.isWritableWithoutResponse
                                  )
                                  if (!dialog) {
                                      reject('No writable characteristic')
                                  }
                                  resolve(dialog)
                              }

                          })
                      })
                  })
              })
      }

      disconnect(){
              return new Promise((resolve, reject) => {
                  this.manager.cancelDeviceConnection(this.state.deviceid).
                  then(rest=>{
                      console.log(rest);
                      let cleanState = {};
                      Object.keys(this.state).forEach(x => {
                          if(x=='makedata'){cleanState[x] = []} else{cleanState[x] = null}
                      });
                      this.setState(cleanState);
                  })
                  .catch((err)=>console.log("error on cancel connection",err))
             })
      }


      async scanAndConnect() {
          /**this.setState({text1:"Scanning..."})**/
          this.manager.startDeviceScan(null, null, (error, device) => {
              console.log("Scanning...");
              if (error) {
                  /**console.log('ERROR: ', error);**/
                  this.setState({text1:""})
                  console.log('Scanning ERROR', error);
                  this.manager.stopDeviceScan();
                  return
              }
              if((device.id === '6C:79:B8:B7:43:74')){
                console.log('device found: ' + device.name + '(' + device.id + ')');
                const serviceUUIDs= device.serviceUUIDs[0]
                this.manager.stopDeviceScan();
                this.manager.connectToDevice(device.id, {autoConnect:true}).then((device) => {
                    (async () => {
                    const services = await device.discoverAllServicesAndCharacteristics()
                    const characteristic = await this.getServicesAndCharacteristics(services)
                    console.log("characteristic")
                    console.log(characteristic)
                    console.log("Discovering services and characteristics",characteristic.uuid);
                    this.setState({"deviceid":device.id, serviceUUID:serviceUUIDs, characteristicsUUID : characteristic.uuid,device:device })
                    this.setState({text1:"Connected to "+device.name})
                    console.log("Got to here 1")
                    })()
                    this.setState({device:device})
                    return device.discoverAllServicesAndCharacteristics()
                    console.log("Got to here 2")
                }).then((device) => {
                    device.monitorCharacteristicForService('0000ffe0-0000-1000-8000-00805f9b34fb', '0000ffe1-0000-1000-8000-00805f9b34fb', (error, characteristic) => {
                    if (error) {
                        console.log(error)
                    return
                    }
                    console.log(characteristic.value)
                    temp1 = characteristic.value
                    console.log("raw")
                    console.log(temp1)
                    const decoded = base64.decode(temp1);
                    const coorarray = decoded.split(',')
                    const lat = coorarray[0]
                    const lon = coorarray[1]
                    const OldLat = parseFloat(storage.getString('latitude'))
                    const OldLong = parseFloat(storage.getString('longitude'))
                    const distance = getDistance(
                                         { latitude: OldLat, longitude: OldLong },
                                         { latitude: lat, longitude: lon}
                    );
                    console.log("Last distance" ,distance)
                    storage.set('cDistance', distance)

                    const currentSum = storage.getNumber('storedDistance')
                    console.log("Stored Distance", currentSum)
                    const newtotalDist = distance + currentSum
                    console.log("New dist A AA A a", newtotalDist)
                    this.setState({distCount: this.state.distCount + 1})
                    this.setState({totalDist:newtotalDist})
                    if(this.state.totalDist > 0){
                        console.log("Travelled far AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                        this.firstAlert
                        this.setState({totalDist:0})
                    }
                    console.log("The total count is ", this.state.distCount)
                    if(this.state.distCount > 5){
                        this.setState({distCount: 0})
                        storage.set('storedDistance', 0)
                        console.log("Reset Total")

                        getWeather({key: "a4e27f3712dc0f29cbfe4f2b7a95217b",
                                     lat:parseFloat(this.state.latitude),//parseFloat(this.state.latitude),
                                      lon:parseFloat(this.state.longitude),//parseFloat(this.state.longitude),
                                       unit:"imperial"
                                   }).then(() => {
                                    var tempdata = new showWeather();
                                     temperdata = tempdata.temp
                                     storage.set('temperature', temperdata);
                                     const newtemp = storage.getNumber('temperature')
                                     console.log("THE NEW TEMP IS ", newtemp)
                                     console.log("Wtf lat", (this.state.latitude))
                                     console.log("wtf lon", (this.state.longitude))
                                     console.log(temperdata)
                                     console.log(tempdata)
                                      storage.set('humidity', tempdata.humidity);
                                      storage.set('localarea', tempdata.name);
                                      });
                    }
                    storage.set('storedDistance', this.state.totalDist)
                    console.log('Distance from last coordinate', distance)
                    storage.set('latitude', lat)
                    this.setState({latitude: lat})
                    storage.set('longitude', lon)
                    this.setState({longitude: lon})
                    const newLat = storage.getString('latitude')
                    const newLon = storage.getString('longitude')
                    const temperature = storage.getString('temperature')
                    //storeData("latitude", JSON.stringify(lat))
                    //storeData("longitude", JSON.stringify(lon))
                    //const newLat = (getData("latitude"))
                    //const newLon = (getData("longitude"))
                    console.log("New lat", this.state.latitude)
                    console.log("New long", this.state.longitude)
                    console.log("Temperature is", temperature)
                    this.setState({data:decoded})
                    //this.setState({data:temp1})
                    })
                }).then(() => {
                        console.log("Listening...")
                })
              }
          });
      }



  render() {
    return (
    <View>
        <Text style = {styles.title}>This is the home screen</Text>
        <Text style = {styles.datat}>{this.state.data}</Text>
            {this.state.deviceid ?
                (
                    <Button
                        title = "press to Dis"
                        onPress={()=>
                            this.disconnect()
                            }
                        />
                ) : (
                    <Button
                        title = "press to connect"
                        onPress={()=>
                            this.scanAndConnect()
                            }
                        />
                )
            }
        <View style = {styles.bottomButton}>
        <Button
            title="Go to map screen"
            onPress={() =>
                this.props.navigation.navigate('LargeMap')
            }
        />
        </View>
        <View style = {styles.bottomButton}>
                <Button
                    title="Go to prompt screen"
                    onPress={() =>
                        this.props.navigation.navigate('Prompt')
                    }
                />
        </View>
        <View style = {styles.bottomButton}>
                <Button
                    title="Go to weather screen"
                    onPress={() =>
                        this.props.navigation.navigate('Temp')
                    }
                 />
        </View>

    </View>
    )
  }
}

// ...
const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',

  },
  title: {
    textAlign: 'center',

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