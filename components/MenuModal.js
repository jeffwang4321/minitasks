import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking } from 'react-native';

const MenuModal = (props) => {

  const handleURLPress = async () => {
    let url = "https://jeffwang4321.github.io/";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Can not open URL: " + url);
    }
  }

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={props.menuModal}
      onRequestClose={() => {
        props.setMenuModal(false);
      }}
    >
      <View style={styles.modalBG}>
        <View style={styles.modalView}>
          <TouchableOpacity style={[styles.menuButton, {backgroundColor: "#FFF"}]} onPress={() => props.confirmDeleteCompleted()}>
            <Text>Delete Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuButton, {backgroundColor: "#ffb3ba"}]} onPress={() => props.confirmDeleteAll()}>
            <Text>Delete All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuButton, {backgroundColor: "#FFF"}]} onPress={() => handleURLPress()}>
            <Text>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => props.setMenuModal(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
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
  menuButton: {
    margin: 7,
    paddingVertical: 15,
    width: 170,
    alignItems: 'center',
    borderRadius: 30,
    elevation: 5,
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 11,
    width: 80,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 30,
    elevation: 5,
  },

});

export default MenuModal;