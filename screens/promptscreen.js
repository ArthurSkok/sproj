import React from 'react';
import { StyleSheet, Text, View , Button, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { DataTable } from 'react-native-paper';
import {storage} from './homescreen';
import { MenuProvider } from 'react-native-popup-menu';
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

const { ContextMenu, SlideInMenu, Popover } = renderers;
class PromptScreen extends React.Component {
    constructor (props){
                  super(props)

                  this.state = {
                  travelling:0, texts:'', renderer:ContextMenu,
              }
        }
        componentDidMount(){
            this.interval = setInterval(() => {this.setState({
            travelling:storage.getNumber('isTravel'),
            }),
            console.log("Current state of travelling is", this.state.travelling)}, 2000)
        };
        componentWillUnmount(){
            clearInterval(this.interval);
        };

  render() {
    var data = [["Yes", "No"]];

    return (
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
              style={{ height: 50 }}
            >
              <MenuTrigger text='Select option' customStyles={triggerStyles} />
              <MenuOptions customStyles={optionsStyles}>
                <MenuOption text='Context Menu'
                  onSelect={() => this.setState({renderer: ContextMenu})}/>
                <MenuOption text='Slide-in Menu'
                  onSelect={() => this.setState({renderer: SlideInMenu})}/>
                <MenuOption text='Popover'
                  onSelect={() => this.setState({renderer: Popover})}/>
                <MenuOption text='Three (custom)' customStyles={optionStyles}
                  onSelect={() => alert('Selected custom styled option')} />
                <MenuOption disabled={true}>
                  <Text style={{color: '#ccc'}}>Four (disabled)</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>


</>

    );
}
}
const triggerStyles = {
  triggerText: {
    color: 'white',
  },
  triggerOuterWrapper: {
    backgroundColor: 'orange',
    padding: 5,
    flex: 1,
  },
  triggerWrapper: {
    backgroundColor: 'blue',
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
    backgroundColor: 'green',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: 'purple',
  },
  optionWrapper: {
    backgroundColor: 'yellow',
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
    backgroundColor: 'pink',
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

