import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
  return (
    <View style={styles.item} backgroundColor={props.text.color}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={props.text.completed? styles.squareCompleted : styles.square} onPress={() => props.toggleSquare(props.index)}></TouchableOpacity>
        <Text style={props.text.completed? styles.itemTextCompleted: styles.itemText}>{props.text.task}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 5,
    borderRadius: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  squareCompleted: {
    width: 33,
    height: 33,
    borderColor: '#FFF',
    borderRadius: 50,
    borderWidth: 6, 
  },
  square: {
    width: 33,
    height: 33,
    backgroundColor: '#FFF',
    borderRadius: 50,
  },
  itemText:{
    marginLeft: 10,
    maxWidth: '85%',
  },
  itemTextCompleted: {
    marginLeft: 10,
    maxWidth: '85%',
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
  },
});

export default Task;