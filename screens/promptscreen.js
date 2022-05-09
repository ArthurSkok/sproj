import React from 'react';
import { StyleSheet, Text, View , Button, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { DataTable } from 'react-native-paper';
import {storage} from './homescreen';
import { MenuProvider } from 'react-native-popup-menu';
import { openDatabase } from 'react-native-sqlite-storage';
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
//if(this.state.travelling == 1){set closeTravel to true
const { ContextMenu, SlideInMenu, Popover } = renderers;
class PromptScreen extends React.Component {
    constructor (props){
                  super(props)

                  this.state = {
                  travelling:0, closeTravel:true, texts:'', travelState:false, renderer:Popover,
              }
        }
        componentDidMount(){
            this.interval = setInterval(() => {this.setState({
            travelling:storage.getNumber('isTravel')}); if(this.state.travelling == 1){this.setState({closeTravel:true})};
            console.log("Current state of travelling is", this.state.travelling)}, 2000)
        };
        componentWillUnmount(){
            clearInterval(this.interval);
        };


  render() {
    var data = [["Yes", "No"]];

    if(this.state.closeTravel){
        return(

    <>
    <View style = {styles.bottomButton}>
               <Button
                  title="Go to home screen"
                  onPress={() =>
                    this.props.navigation.navigate('Home')
                  }
               />
        </View>
        <Text style = {styles.question}>Are you currently travelling?</Text>
        <Menu
              renderer={this.state.renderer}
              rendererProps={{ anchorStyle: styles.anchorStyle }}
              style={{ height: 75 }}
            >
              <MenuTrigger text='Select Yes or No' customStyles={triggerStyles} />
              <MenuOptions customStyles={optionsStyles}>
                <MenuOption text='Yes'
                  onSelect={() => {storage.set('isTravel', 0),this.setState({travelState:true, closeTravel: false})}}/>
                <MenuOption text='No' customStyles={optionStyles}
                  onSelect={() =>  {storage.set('isTravel', 0),this.setState({travelState:false, closeTravel: false})}}/>
              </MenuOptions>
            </Menu>
            </>
            )


    }
    if(this.state.travelState){
            return(

        <>
        <View style = {styles.bottomButton}>
                   <Button
                      title="Go to home screen"
                      onPress={() =>
                        this.props.navigation.navigate('Home')
                      }
                   />
            </View>
            <Text style = {styles.question}>What is your current method of transportation?</Text>
            <Menu
                  renderer={this.state.renderer}
                  rendererProps={{ anchorStyle: styles.anchorStyle }}
                  style={{ height: 75 }}
                >
                  <MenuTrigger text='Select amongst available options:' customStyles={triggerStyles} />
                  <MenuOptions customStyles={optionsStyles}>
                    <MenuOption text='Walking'
                      onSelect={() => this.setState({travelState: false})}/>
                    <MenuOption text='Car' customStyles={optionStyles}
                      onSelect={() =>  this.setState({travelState: false})}/>
                    <MenuOption text='Subway' customStyles={optionStyles}
                      onSelect={() =>  this.setState({travelState: false})}/>
                    <MenuOption text='Bus' customStyles={optionStyles}
                      onSelect={() =>  this.setState({travelState: false})}/>
                    <MenuOption text='Flight' customStyles={optionStyles}
                      onSelect={() =>  this.setState({travelState: false})}/>
                  </MenuOptions>
                </Menu>
                </>
                )


        }
    else{
        return (
            <View style = {styles.bottomButton}>
                           <Button
                              title="Go to home screen"
                              onPress={() =>
                                this.props.navigation.navigate('Home')
                              }
                           />
                    </View>
        )
    }
}
}
const triggerStyles = {
  triggerText: {
    color: 'white',
  },
  triggerOuterWrapper: {
    backgroundColor: 'black',
    padding: 5,
    flex: 1,
  },
  triggerWrapper: {
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
    style : {
      flex: 1,
    },
  },
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'black',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: 'black',
  },
  optionWrapper: {
    backgroundColor: 'green',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'brown',
  },
};

const optionStyles = {
  optionTouchable: {
    underlayColor: 'red',
    activeOpacity: 40,
  },
  optionWrapper: {
    backgroundColor: 'red',
    margin: 5,
  },
  optionText: {
    color: 'black',
  },
};

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
    question:{
      color: 'red',
      textAlign:'center',
    },
  backdrop: {
    backgroundColor: 'red',
    opacity: 0.5,
  },
  anchorStyle: {
    backgroundColor: 'blue',
  },
});

const menuProviderStyles = {
  menuProviderWrapper: styles.container,
  backdrop: styles.backdrop,
};

export default PromptScreen;

