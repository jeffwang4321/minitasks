import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,  } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'; 

const AddModal = (props) => {
  return (
    <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled'
    >
      <View style={styles.tasksWrapper}>
        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>To Do List</Text>
          <TouchableOpacity style={styles.sectionTitleRight} onPress={() => props.setMenuModal(true)}>
            <Text><Icon style={styles.sectionTitle} name="menu"/></Text>
          </TouchableOpacity>
        </View>
        {
          props.renderTaskList()
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  sectionTitleRight: {
    marginTop: 5,
  },
});

export default AddModal;