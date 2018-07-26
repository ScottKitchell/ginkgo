import React from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class MemoryCard extends React.Component<Props> {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View key={this.props.keyval} style={styles.card}>
        <Text style={styles.cardText}>{this.props.val.memory}</Text>

        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.cardDelete}>
          <Text style={styles.cardDeleteText}>x</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    //borderRadius: 2,
    //margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  cardText: {
    color: '#555'
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
  }
});