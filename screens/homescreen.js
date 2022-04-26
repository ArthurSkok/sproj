import React from 'react';
import {Platform, NativeModules, NativeEventEmitter, PermissionsAndroid, StyleSheet, Text, View , Button, Alert} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {BleManager} from 'react-native-ble-plx';
export default class HomeScreen extends React.Component {
  constructor (){
          super()
          this.manager = new BleManager()
          this.state = {
              deviceid : '', serviceUUID:'', characteristicsUUID : '', text1 : '',makedata : [],
              notificationReceiving : false, data: ''
          }
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
                    this.setState({data:temp1})
                    console.log(this.state.data)
                    console.log("read value")
                    })
                }).then(() => {
                        console.log("Listening...")
                })
              }
          });
      }
      /**async readData(device){
        if(device){
            device.monitorCharacteristicForService('0000ffe0-0000-1000-8000-00805f9b34fb', '0000ffe1-0000-1000-8000-00805f9b34fb', (error, characteristic) => {
            if (error) {
                this.error(error.message)
                return
            }
            if(characteristic){
                var raw = characteristic.value;
                var decodeVal = base64.decode(raw);
                console.log('${raw}: ${decodeVal}');

            }
            const buf = Buffer.from(characteristic.value, 'base64');
            console.log(buf[1]);
            this.updateValue(characteristic.uuid, characteristic.value)
            })
        } /** service 0000ffe0-0000-1000-8000-00805f9b34fb 0000ffe1-0000-1000-8000-00805f9b34fb

      }**/

                /**
              if( /[_]/g.test( device.name ) )
                  {
                      let nameSplit = device.name.split('_');
                      if(nameSplit[0] == 'TAPP'){ //T3X1 //TAPP
                          const serviceUUIDs= device.serviceUUIDs[0]
                          this.setState({text1:"Connecting to "+device.name})
                          this.manager.stopDeviceScan();
                          this.manager.connectToDevice(device.id, {autoConnect:true}).then((device) => {
                              (async () => {
                                  const services = await device.discoverAllServicesAndCharacteristics()
                                  const characteristic = await this.getServicesAndCharacteristics(services)
                                  console.log("characteristic")
                                  console.log(characteristic)
                                  console.log("Discovering services and characteristics",characteristic.uuid);
                                  this.setState({"deviceid":device.id, serviceUUID:serviceUUIDs, characteristicsUUID : characteristic.uuid,device:device })
                                  this.setState({text1:"Conneted to "+device.name})
                              })();
                              this.setState({device:device})
                              return device.discoverAllServicesAndCharacteristics()
                          }).then((device) => {
                              // return this.setupNotifications(device)
                          }).then(() => {
                              console.log("Listening...")
                          }, (error) => {
                              this.alert("Connection error"+JSON.stringify(error))
                          })
                      }
                  }
                  **/


  render() {
    return (
    <View>
        <Text style = {styles.title}>This is the home screen</Text>
        <Text>{this.state.data}</Text>
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
});