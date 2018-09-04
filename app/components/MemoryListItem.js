import React from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';
import ParsedText from 'react-native-parsed-text';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../scripts/styles';

export default class MemoryListItem extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    memory: PropTypes.object.isRequired,
    toggleDone: PropTypes.func.isRequired,
    toggleFlag: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
  }

  render() {
    const id = this.props.id;
    const memory = this.props.memory;

    const parseRules = [
      {type: 'url',                       style: styles.urlText, onPress: this.handleUrlPress},
      // {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
      // {type: 'email',                     style: styles.email, onPress: this.handleEmailPress},
      {pattern: /#(\w+)/,                 style: styles.hashtagText},
      //{pattern: /!(FLAG|DONE|FORGET)/,    style: styles.metatagText},
    ];
    
    const leftButtons = [{
      text: 'Done',
      backgroundColor: '#88e67c',
      onPress: () => this.props.toggleDone(id),
    },{
      text: 'Flag',
      backgroundColor: Colors.purple,
      onPress: () => this.props.toggleFlag(id),
    },{
      text: 'Edit',
      backgroundColor: Colors.grey,
      onPress: () => this.props.edit(id),
    }];
    
    const rightButtons = [{
      text: 'Delete',
      type: 'delete',
      backgroundColor: Colors.orange,
      onPress: () => this.props.delete(id, memory.text),
    }];
    
    return (
      // <View key={this.props.id} style={[styles.listItem, memory.done? styles.done : {}]}>
      //   <View style={styles.memory}>
      //     <ParsedText style={styles.memoryText} parse={parseRules} childrenProps={{allowFontScaling: false}}>
      //       {memory.text}
      //     </ParsedText>
      // 
      //     <TouchableOpacity style={styles.memoryDone} onPress={() => this.props.toggleDone(id)}>
      //       <Icon name={memory.done? 'check-square' : 'square'} style={[styles.memoryDoneIcon, memory.done? styles.selected : {}]}/>
      //     </TouchableOpacity>
      //   </View>
      // 
      //   <View style={styles.actions}>
      //     <TouchableOpacity style={styles.actionItem} onPress={() => this.props.delete(id, memory.text)}>
      //       <Icon name="trash" style={styles.icon}/>
      //     </TouchableOpacity>
      // 
      //     <TouchableOpacity style={styles.actionItem} onPress={() => this.props.edit(id)}>
      //       <Icon name="edit-3" style={styles.icon}/>
      //     </TouchableOpacity>
      // 
      //     <TouchableOpacity style={styles.actionItem}  onPress={() => this.props.toggleFlag(id)}>
      //       <Icon name="flag" style={[styles.icon, memory.flag? styles.selected : {}]}/>
      //     </TouchableOpacity>
      // 
      //     <View style={{flex:1}}>
      // 
      //     </View>
      //   </View>
      // </View>
      <Swipeout key={this.props.id} style={[styles.listItem, memory.done? styles.done : {}]} left={leftButtons} right={rightButtons} autoClose={true}>
        <View>
          <Text style={styles.memoryText}>{memory.text}</Text>
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#FFF',
    position: 'relative',
    padding: 2,
    paddingLeft: 2,
    paddingRight: 2,
    //borderRadius: 2,
    //margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    flexDirection: 'column',
  },
  done: {
    backgroundColor: '#FAFAFA',
  },
  memory: {
    flexDirection: 'row',
  },
  memoryText: {
    flex: 1,
    color: Colors.text,
    fontSize: 18,
    margin: 4,
    padding: 8,
    marginRight: 0,
  },
  memoryDone: {
    margin: 4,
    padding: 8,
  },
  memoryDoneIcon: {
    fontSize: 24,
    color: Colors.grey,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  actionItem: {
    margin: 4,
    marginTop: 0,
    padding: 8,
  },
  icon: {
    fontSize: 20,
    color: '#C0C0C0',
  },
  selected: {
    color: Colors.aqua,
  },
  cardDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    top: 0,
    bottom: 0,
    right: 0,
  },
  cardDeleteText: {
    color: '#555'
  },
  hashtagText: {
    color: Colors.purple,
  },
  urlText: {
    color: '#BBB',
  },
  metatagText: {
    color: '#DDD',
  },
  flagText: {
    color: '#DA22FF',
  }
});