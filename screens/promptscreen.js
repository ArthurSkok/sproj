import React from 'react';
import { FlatList, StyleSheet, Text, View , Button, Dimensions , ScrollView} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { DataTable } from 'react-native-paper';
import {storage} from './homescreen';
import { MenuProvider } from 'react-native-popup-menu';
import { SQLite, openDatabase } from 'react-native-sqlite-storage';

import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
//if(this.state.travelling == 1){set closeTravel to true
var db = openDatabase({ name: 'TravelDatabase.db' });

const { ContextMenu, SlideInMenu, Popover } = renderers;
class PromptScreen extends React.Component {
    constructor (props){
                  super(props)

                  this.state = {
                  travelling:0, temperatureMay:1 , closeTravel:true, closeTemperature:false, texts:'', travelState:false, renderer:Popover,
                   travelYes:'', travelType:'', items: [], items1:[], empty:'', CurrentDate:'', tempDiff:'', tempTypeYes:''
              }

        }
        componentDidMount(){
        this.fetch.call(this);
        this.fetch1.call(this);

            this.interval = setInterval(() => {this.setState({tempDiff:storage.getNumber('differenceT'),
            travelling:storage.getNumber('isTravel')/**, temperatureMay:storage.getNumber('isTemp')**/}); if(this.state.travelling == 1){this.setState({closeTravel:true})};
            if(this.state.temperatureMay == 1){this.setState({closeTemperature:true})};
            console.log("Current state of travelling is", this.state.travelling)}, 2000)
        };
        componentWillUnmount(){
            clearInterval(this.interval);
        }
        dosomething(){
            console.log("Please wtf");
        }
        fetch(){
              console.log('fetching data');
               db.transaction((tx) => {
                                     tx.executeSql(
                                       'SELECT * FROM Travel',
                                       [],
                                       (tx, results) => {
                                         var temp = [];
                                         for (let i = 0; i < results.rows.length; ++i){
                                           temp.push(results.rows.item(i));
                                         }
                                         this.setState({items:temp});

                                         if (results.rows.length >= 1) {
                                         console.log("The database is false:", this.state.empty);
                                           this.setState({empty:'false'});
                                           console.log(this.state.items)
                                         }
                                         else {
                                         console.log("The database is: true", this.state.empty);
                                           this.setState({empty:'true'});
                                         }

                                       }
                                     );

                                   });

        }
        fetch1(){
                      console.log('fetching data');
                       db.transaction((tx) => {
                                             tx.executeSql(
                                               'SELECT * FROM Temperature ',
                                               [],
                                               (tx, results) => {
                                                 var temp = [];
                                                 for (let i = 0; i < results.rows.length; ++i){
                                                   temp.push(results.rows.item(i));
                                                 }
                                                 this.setState({items1:temp});

                                                 if (results.rows.length >= 1) {
                                                 console.log("The database is false:", this.state.empty);
                                                   this.setState({empty:'false'});
                                                   console.log(this.state.items1)
                                                 }
                                                 else {
                                                 console.log("The database is: true", this.state.empty);
                                                   this.setState({empty:'true'});
                                                 }

                                               }
                                             );

                                           });

                }
        addrecord(){
            console.log('adding travel record');
            const tY = this.state.travelYes;
            const tT = this.state.travelType;
            const tS = this.state.CurrentDate;
            console.log("THE TS IS:", tS)
                    db.transaction((tx) => {
                        tx.executeSql(
                        'INSERT INTO Travel (travelYes, travelType, timeStamp) VALUES (?,?,?)',
                                      [tY, tT, tS],
                                      (tx, results) =>{
                                      if(results.rowsAffected > 0){
                                      console.log("added data")
                                      }
                                      else{
                                      console.log("no data:");
                                      }
                                      }

                        )

                    }

                    );
                    }
        addtemprecord(){
                    console.log('adding a temperature record');
                    const tM = this.state.tempTypeYes;
                    const diffT = this.state.tempDiff;
                    const tST = this.state.CurrentDate;
                    console.log("THE TS IS:", tST)
                            db.transaction((tx) => {
                                tx.executeSql(
                                'INSERT INTO Temperature (temperatureM, difference, timeStamp) VALUES (?,?,?)',
                                              [tM, diffT, tST],
                                              (tx, results) =>{
                                              if(results.rowsAffected > 0){
                                              console.log("added data")
                                              }
                                              else{
                                              console.log("no data:");
                                              }
                                              }

                                )

                            }

                            );
                            }
        getDate(){
                var date = new Date().getDate(); //Current Date
                var month = new Date().getMonth() + 1; //Current Month
                var hours = new Date().getHours(); //Current Hours
                var min = new Date().getMinutes(); //Current Minutes
                console.log("The date is", date)
                const dateS = month + '/' + date  + ' ' + hours + ':' + min;
                const dateString = dateS.toString();
                console.log("the new string", dateString);
                this.setState({CurrentDate:dateS});
                const check = this.state.CurrentDate;
                console.log("hIUh", check);
        };




ListViewItemSeparator = () => {
            return (
              <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
            );
          };
    getTextStyle(id) {
     switch(id) {
     case 'walking':
      return {
        backgroundColor: 'green', padding: 20,
      }
      break;
      case 'car':
      return{
        color:'black', backgroundColor: 'yellow', padding: 20,
      }
      break;
      case 'subway':
      return {
        backgroundColor: 'blue', padding: 20,
      }
      break;
      case 'bus':
      return {
        backgroundColor: 'green', padding: 20,
      }
      break;
      case 'flying':
      return {
        backgroundColor: 'red', padding: 20,
      }
      break;
      default:

       return {
          backgroundColor: 'white', padding: 20,

     }
    }
    }





  render() {
    var data = [["Yes", "No"]];
    if(this.state.closeTravel){
    if(this.state.temperatureMay == 1){
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
            <Text style = {styles.question}>Are you currently inside a building/stopped travelling?</Text>
                                        <Menu
                                              renderer={this.state.renderer}
                                              rendererProps={{ anchorStyle: styles.anchorStyle }}
                                              style={{ height: 75 }}
                                            >
                                              <MenuTrigger text='Select Yes or No' customStyles={triggerStyles} />
                                              <MenuOptions customStyles={optionsStyles}>
                                                <MenuOption text='Entering a building'
                                                  onSelect={() => {this.getDate(),this.setState({tempTypeYes:'Building'}) }}/>
                                                <MenuOption text='Stopping travel'
                                                  onSelect={() => {this.getDate(),this.setState({tempTypeYes:'End Travel'})}}/>
                                                <MenuOption text='No' customStyles={optionStyles}
                                                  onSelect={() =>  {this.setState({temperatureMay:0, closeTravel: false})}}/>
                                              </MenuOptions>
                                            </Menu>
            <View>

            <Button style = {styles.ButtonSub}
                title ="Click to log?"
                onPress={() =>{storage.set('isTemp', 0),this.setState({temperatureMay:0}),this.addtemprecord()}

            }
            />

            <Text>BLAH{this.state.empty}</Text>
            <Text style = {styles.question}>Are you currently travelling?</Text>
                            <Menu
                                  renderer={this.state.renderer}
                                  rendererProps={{ anchorStyle: styles.anchorStyle }}
                                  style={{ height: 75 }}
                                >
                                  <MenuTrigger text='Select Yes or No' customStyles={triggerStyles} />
                                  <MenuOptions customStyles={optionsStyles}>
                                    <MenuOption text='Yes'
                                      onSelect={() => {storage.set('isTravel', 0),this.getDate(),this.setState({travelState:true, closeTravel: false, travelYes:"Yes"})}}/>
                                    <MenuOption text='No' customStyles={optionStyles}
                                      onSelect={() =>  {storage.set('isTravel', 0),this.setState({travelState:false, closeTravel: false})}}/>
                                  </MenuOptions>
                                </Menu>


                    <FlatList
                        data={this.state.items}
                        scrollEnabled = {true}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View key={item.ID} style={this.getTextStyle(item.travelType)}>
                                <Text>Id: {item.ID}</Text>
                                <Text>Type of travel: {item.travelType}</Text>
                                <Text>TimeStamp: {item.timeStamp}</Text>
                            </View>
                        )}
                    />
                    <FlatList
                        data={this.state.items1}
                        scrollEnabled = {false}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View key={item.ID} style={styles.templist}>
                                   <Text>Id: {item.ID}</Text>
                                   <Text>Type of Action: {item.temperatureM}</Text>
                                   <Text>Temperature Difference: {item.difference}</Text>
                                     <Text>TimeStamp: {item.timeStamp}</Text>
                                                </View>
                                            )}
                                        />
                    </View>
                    </>

                    )

    }
    else{
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

                    <Text>BLAH{this.state.empty}</Text>
                    <Text style = {styles.question}>Are you currently travelling?</Text>
                                    <Menu
                                          renderer={this.state.renderer}
                                          rendererProps={{ anchorStyle: styles.anchorStyle }}
                                          style={{ height: 75 }}
                                        >
                                          <MenuTrigger text='Select Yes or No' customStyles={triggerStyles} />
                                          <MenuOptions customStyles={optionsStyles}>
                                            <MenuOption text='Yes'
                                              onSelect={() => {storage.set('isTravel', 0),this.getDate(),this.setState({travelState:true, closeTravel: false, travelYes:"Yes"})}}/>
                                            <MenuOption text='No' customStyles={optionStyles}
                                              onSelect={() =>  {storage.set('isTravel', 0),this.setState({travelState:false, closeTravel: false})}}/>
                                          </MenuOptions>
                                        </Menu>

                            <View>
                            <FlatList
                                data={this.state.items}
                                scrollEnabled = {true}
                                ItemSeparatorComponent={this.ListViewItemSeparator}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View key={item.ID} style={this.getTextStyle(item.travelType)}>
                                        <Text>Id: {item.ID}</Text>
                                        <Text>Type of travel: {item.travelType}</Text>
                                        <Text>TimeStamp: {item.timeStamp}</Text>
                                    </View>
                                )}
                            />
                            </View>

                            </>
                            )



    }
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

    <Text>BLAH{this.state.empty}</Text>
    <Text style = {styles.question}>Are you currently travelling?</Text>
                    <Menu
                          renderer={this.state.renderer}
                          rendererProps={{ anchorStyle: styles.anchorStyle }}
                          style={{ height: 75 }}
                        >
                          <MenuTrigger text='Select Yes or No' customStyles={triggerStyles} />
                          <MenuOptions customStyles={optionsStyles}>
                            <MenuOption text='Yes'
                              onSelect={() => {storage.set('isTravel', 0),this.getDate(),this.setState({travelState:true, closeTravel: false, travelYes:"Yes"})}}/>
                            <MenuOption text='No' customStyles={optionStyles}
                              onSelect={() =>  {storage.set('isTravel', 0),this.setState({travelState:false, closeTravel: false})}}/>
                          </MenuOptions>
                        </Menu>

            <View>
            <FlatList
                data={this.state.items}
                scrollEnabled = {true}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View key={item.ID} style={this.getTextStyle(item.travelType)}>
                        <Text>Id: {item.ID}</Text>
                        <Text>Type of travel: {item.travelType}</Text>
                        <Text>TimeStamp: {item.timeStamp}</Text>
                    </View>
                )}
            />
            </View>

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
                      onSelect={() => {console.log("GAH"),this.setState({travelType:'walking'})}}/>

                    <MenuOption text='Car' style={this.getTextStyle('car')}
                      onSelect={() =>  {this.setState({travelType:'car'})}}/>
                    <MenuOption text='Subway' style={this.getTextStyle('subway')}
                      onSelect={() =>  {this.setState({travelType:'subway'})}}/>
                    <MenuOption text='Bus' style={this.getTextStyle('bus')}
                      onSelect={() =>  {this.setState({travelType:'bus'})}}/>
                    <MenuOption text='Flight' style={this.getTextStyle('flying')}
                      onSelect={() =>  {this.setState({travelType:'flying'})}}/>
                  </MenuOptions>
                </Menu>
                <View>
                <Button style = {styles.ButtonSub}
                                                    title ="Click to log?"
                                                    onPress={() =>{this.setState({travelState:false}),this.addrecord()}

                                                   }
                                                   />
                                   <FlatList
                                                  data={this.state.items}
                                                  scrollEnabled = {true}
                                                  ItemSeparatorComponent={this.ListViewItemSeparator}
                                                  keyExtractor={(item, index) => index.toString()}
                                                  renderItem={({ item }) => (
                                                      <View key={item.ID} style={this.getTextStyle(item.travelType)}>
                                                          <Text>Id: {item.ID}</Text>
                                                          <Text>Type of travel: {item.travelType}</Text>
                                                          <Text>TimeStamp: {item.timeStamp}</Text>
                                                      </View>
                                                  )}
                                              />
                                  </View>

                </>
                )


        }

    else{
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
                    <Text>{this.state.dbstate}</Text>
                    <View>
                                        <FlatList
                                                       data={this.state.items}
                                                       scrollEnabled = {true}
                                                       ItemSeparatorComponent={this.ListViewItemSeparator}
                                                       keyExtractor={(item, index) => index.toString()}
                                                       renderItem={({ item }) => (
                                                           <View key={item.ID} style={this.getTextStyle(item.travelType)}>
                                                               <Text>Id: {item.ID}</Text>
                                                               <Text>Type of travel: {item.travelType}</Text>
                                                               <Text>TimeStamp: {item.timeStamp}</Text>
                                                           </View>
                                                       )}
                                                   />
                                      </View>
                                      </>
        )
    }
}
}
const triggerStyles = {
  triggerText: {
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
    color: 'black',
  },
  ButtonSub:{
    alignItems:'center',
    color:'black',

  }
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
  templist:{
    backgroundColor:'black',
    color:'white',
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

