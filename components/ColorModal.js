import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const ColorModal = (props) => {

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={props.colorPickerModal}
      onRequestClose={() => {
        props.setColorPickerModal(false);
      }}
    >
      <View style={styles.modalBG}>
        <View style={styles.modalView}>
        <Text style={styles.sectionTitle}>Task Color</Text>
          <View style={styles.colorRows}>
            <TouchableOpacity style={[styles.colorButton, {backgroundColor: "#E8EAED"}]} onPress={() => {props.setColor("#E8EAED"); props.setColorPickerModal(false);}}/>
            <TouchableOpacity style={[styles.colorButton, {backgroundColor: "#ffb3ba"}]} onPress={() => {props.setColor("#ffb3ba"); props.setColorPickerModal(false);}}/>
          </View>
          <View style={styles.colorRows}>
            <TouchableOpacity style={[styles.colorButton, {backgroundColor: "#ffdfba"}]} onPress={() => {props.setColor("#ffdfba"); props.setColorPickerModal(false);}}/>
            <TouchableOpacity style={[styles.colorButton, {backgroundColor: "#ffffa1"}]} onPress={() => {props.setColor("#ffffa1"); props.setColorPickerModal(false);}}/>
          </View>
          <View style={styles.colorRows}>
            <TouchableOpacity style={[styles.colorButton, {backgroundColor: "#baffc9"}]} onPress={() => {props.setColor("#baffc9"); props.setColorPickerModal(false);}}/>
            <TouchableOpacity style={[styles.colorButton, {backgroundColor: "#bae1ff"}]} onPress={() => {props.setColor("#bae1ff"); props.setColorPickerModal(false);}}/>
          </View>
          <View style={styles.colorRows}>
            <TouchableOpacity style={[styles.colorButton, {backgroundColor: "#6eb5ff"}]} onPress={() => {props.setColor("#6EB5FF"); props.setColorPickerModal(false);}}/>
            <TouchableOpacity style={[styles.colorButton, {backgroundColor: "#c999dd"}]} onPress={() => {props.setColor("#c999dd"); props.setColorPickerModal(false);}}/>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBG: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  colorButton: {
    margin: 15,
    padding: 30,
    borderRadius: 30,
    elevation: 5,
  },
  colorRows: {
    flexDirection: 'row',
  },
});

export default ColorModal;