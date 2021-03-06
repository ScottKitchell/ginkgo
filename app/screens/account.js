import React from 'react';
import { Platform, StyleSheet, AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity, Button, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { MemoryStore } from 'app/stores';
import { Colors } from 'app/styles';

export default class AccountScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      memoryArray: [],
    };
  }

  componentDidMount() {
    // AsyncStorage.getItem('memoryArray', (err, data) => {
    //   if(data) this.setState({'memoryArray': JSON.parse(data)});
    // });
  }

  render() {
    // let memories = this.state.memoryArray.map((val, key) => {
    //   return <MemoryListItem key={key} keyval={key} val={val} deleteMethod={() => this.deleteMemory(key) } />
    // });
    //
    // return (
    //   <View style={styles.container}>
    //     <View style={styles.header}>
    //       <TouchableOpacity style={styles.saveButton} onPress={ this.addMemory.bind(this) } >
    //         <Text style={styles.saveButtonText}>Add</Text>
    //       </TouchableOpacity>
    //     </View>
    //
    //     <View style={styles.memoryInput}>
    //       <TextInput style={styles.textInput} placeholder="Remember" placeholderTextColor="#CCC" multiline={true} underlineColorAndroid="transparent"
    //         onChangeText={(memoryText) => this.setState({memoryText})} value={this.state.memoryText}></TextInput>
    //     </View>
    //
    //     <ScrollView style={styles.body}>
    //       {memories}
    //     </ScrollView>
    //
    //     <TouchableOpacity style={styles.newButton} onPress={() => this.props.navigation.navigate('FirstScreen')} >
    //       <Text style={styles.newButtonText}>+</Text>
    //     </TouchableOpacity>
    //   </View>
    // );
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.statusBar} barStyle="light-content"/>
        <Text><Icon name='user'/> Morning Brief</Text>
        <Text><Icon name='user'/> Nightly Review</Text>
        {/* <Button title="Delete all memories" onPress={()=>MemoryStore.destroy()}/> */}
      </View>
    );
  }

  // filterFlagsOnly() {
  //   let flagged = (memory) => return memory.flag
  //   this.state.memoryArray.
  // }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
