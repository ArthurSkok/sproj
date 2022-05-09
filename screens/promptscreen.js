import React from 'react';
import { StyleSheet, Text, View , Button, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { DataTable } from 'react-native-paper';
import {storage} from './homescreen';

class PromptScreen extends React.Component {
    constructor (props){
                  super(props)

                  this.state = {
                  travelling:'',
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
        <Text>This is the questions screen</Text>
        <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Question</DataTable.Title>
                  <DataTable.Title>Answered(?)</DataTable.Title>
                  <DataTable.Title>Response</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>Test question</DataTable.Cell>
                  <DataTable.Cell>Yes</DataTable.Cell>
                  <DataTable.Cell>User input</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                </DataTable.Row>

              </DataTable>
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
export default PromptScreen;

