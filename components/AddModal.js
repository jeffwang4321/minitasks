import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, TextInput } from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker"; 
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const AddModal = (props) => {

  return (
    <Modal
        animationType="fade"
        statusBarTranslucent={true}
        visible={props.addTaskModal}
        onRequestClose={() => {props.setAddTaskModal(false); props.setDefaultStates();}}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={styles.modalContainer}
        >
          <Text style={styles.sectionTitle}>Add Task</Text>
          <TextInput style={styles.input} placeholder={'Task Name'} value={props.task} onChangeText={text => props.setTask(text)} />

          <TouchableOpacity color="#f194ff" style={[styles.buttonStyle, {backgroundColor: "#FFF"}]} onPress={() => props.setDatePickerVisibility(true)}>
            <Text>{props.date.slice(0, 3) + "," + props.date.slice(3, 10) + "," + props.date.slice(10)}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={props.isDatePickerVisible}
            mode="date"
            onConfirm={props.handleDateConfirm}
            onCancel={() => props.setDatePickerVisibility(false)}
          />

          <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: props.color}]} onPress={() => props.setColorPickerModal(true)}>
            <Text>Task Color</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addTaskWrapper} onPress={() => props.handleAddTask()}>
            <Icon style={styles.sectionTitle} name="save"/>
          </TouchableOpacity>
          
        </KeyboardAvoidingView>
      </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: '#000',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#C0C0C0', 
  },
  buttonStyle: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
  },
  addTaskWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    bottom: 40,
    right: 40,
    backgroundColor: '#FFF',
    borderRadius: 60,
    elevation: 5,
  },
});

export default AddModal;