import React from 'react';
import {Platform, Alert, StyleSheet, AsyncStorage, View, ScrollView, FlatList, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import MemoryListItem from '../components/MemoryListItem';
import MemoryStore from '../store/memory.store';
import HashtagStore from '../store/hashtag.store';
import { Colors } from '../scripts/styles';
export default class Memories extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      initialMemoryArray: [],
      memoryArray: [],
      tags: {},
      searchTerm: '',
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      MemoryStore.get().then(memories => {
        HashtagStore.get().then((tags) => {
          this.setState({'memoryArray': memories, initialMemoryArray: memories, tags});
        });
      });

    });
    this.props.navigation.navigate('EditMemory');
  }

  toggleFlag = (id) => this.toggle(id,'flag');

  toggleDone = (id) => this.toggle(id,'done');

  toggle = (id,key) => {
    let memory = _.clone(_.find(this.state.memoryArray, {id}));
    memory[key] = !memory[key];
    MemoryStore.update(id, memory, (memories) => {
      this.setState({'memoryArray': memories});
    });
  }

  editMemory = (id) => {
    this.props.navigation.navigate('EditMemory', {id});
  }

  deleteMemory = (id, memoryText) => {
    const memoryRemoval = (id) => {
      let memoryArray = (Object.assign([], this.state.memoryArray));
      memoryArray.splice(id, 1);
      MemoryStore.delete(id);
      this.setState({'memoryArray': this.state.memoryArray});
    };
    Alert.alert(
      'Delete this memory?',
      memoryText,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => memoryRemoval(id), style: 'destructive'},
      ],
      { cancelable: false }
    );
  }

  search = (searchTerm) => {
    this.setState({searchTerm});
    const memoryArray = _.filter(this.state.initialMemoryArray, memory => String(memory.text).includes(searchTerm));
    this.setState({memoryArray});
  }

  renderMemory = ({item, index}) => (
    <MemoryListItem
      id={item.id}
      memory={item}
      onDonePress={this.toggleDone}
      onFlagPress={this.toggleFlag}
      onEditPress={this.editMemory}
      onDeletePress={this.deleteMemory}
    />
  );

  keyExtractor = (item, index) => String(item.id);

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.primary} barStyle="dark-content"/>
        <View style={styles.memoryInput}>
          <TextInput style={styles.textInput} placeholder="Search Memories" placeholderTextColor="#CCC" multiline={true} underlineColorAndroid="transparent"
            onChangeText={this.search} value={this.state.searchTerm}>
              {/*<ParsedText><Text style{{color: '#336699'}}>{this.setState({memoryText})}</Text></ParsedText>*/}
          </TextInput>
        </View>
        <View>

        </View>

        <FlatList
          style={styles.body}
          data={this.state.memoryArray}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderMemory}
        />

        <TouchableOpacity style={styles.newButton} onPress={() => this.props.navigation.navigate('EditMemory')} >
          <Icon name="plus" size={18} color='#FFF'/>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoryInput: {
    backgroundColor: Colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    padding: 12,
  },
  textInput: {
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    fontSize: 18,
    color: Colors.textLight,
    padding: 6,
    paddingLeft: 10,
    backgroundColor: Colors.lighter,
    borderRadius: 3,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 64,
    //padding: 5
  },
  newButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 56,
    width: 56,
    borderRadius: 28,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  newButtonText: {
    fontSize: 22,
    color: '#FFF'
  }
});
