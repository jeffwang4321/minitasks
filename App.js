import React, {useState, useEffect} from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Task from './components/Task';
import HomePage from './components/HomePage';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import MenuModal from './components/MenuModal';
import ColorModal from './components/ColorModal';

import Icon from 'react-native-vector-icons/MaterialIcons';  
import AsyncStorage from '@react-native-async-storage/async-storage';  

export default function App() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date().toString().slice(0, 15));
  const [completed, setCompleted] = useState(false);
  const [color, setColor] = useState("#E8EAED");

  const [taskItems, setTaskItems] = useState([]);
  const [editTaskIndex, setEditTaskIndex] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [colorPickerModal, setColorPickerModal] = useState(false);
  const [menuModal, setMenuModal] = useState(false);

  // Set states to default vales
  const setDefaultStates = () => {
    setTask("");
    setDate(new Date().toString().slice(0, 15));
    setColor("#E8EAED");
    setCompleted(false);
  }

  // Clicked Add in the addTaskModal
  const handleAddTask = () => {
    Keyboard.dismiss();
    let tempJson = {
      "date": date,
      "task": task,
      "completed": false,
      "color": color,
    }
    let taskItemsCopy = [...taskItems, tempJson];

    // Sort by earliest date
    taskItemsCopy.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });
    setTaskItems(taskItemsCopy);
    setDefaultStates();
    setAddTaskModal(false);
  }

  // Clicked editTaskModal
  const clickEditTask = (index) => {
    setTask(taskItems[index].task);
    setDate(taskItems[index].date);
    setColor(taskItems[index].color);
    setCompleted(taskItems[index].completed);
    
    setEditTaskIndex(index);
    setEditTaskModal(true);
  }

  // Modify task in editTaskModal
  const handleModifyTask = () => {
    Keyboard.dismiss();
    let tempJson = {
      "date": date,
      "task": task,
      "completed": completed,
      "color": color,
    }
    let taskItemsCopy = [...taskItems, tempJson];
    taskItemsCopy.splice(editTaskIndex, 1);
    taskItemsCopy.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });

    setTaskItems(taskItemsCopy);
    setDefaultStates();
    setEditTaskModal(false);
  }

  // Select task on LongPress (Edit or delete)
  const confirmTaskLongPress = (index) => {  
    Alert.alert(
      "Selected Task",
      taskItems[index].task,
      [
        { text: "Edit", onPress: () => clickEditTask(index)},
        { text: "Cancel"},
        { text: "DELETE", onPress: () => handleDeleteTaskSingle(index)}
      ]
    );
  }

  // Delete task on LongPress
  const handleDeleteTaskSingle = (index) => {
    Keyboard.dismiss();
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  // Delete task in editTaskModal
  const handleDeleteTask = () => {
    Keyboard.dismiss();
    let itemsCopy = [...taskItems];
    itemsCopy.splice(editTaskIndex, 1);
    setTaskItems(itemsCopy);

    setDefaultStates();
    setEditTaskIndex();
    setEditTaskModal(false);
  }

  // Confirm Delete Selected tap in menu, alert to confirm DeleteCompleted
  const confirmDeleteCompleted = () => {  
    Alert.alert(
      "Delete Selected",
      "Do you want to delete all selected tasks?",
      [
        { text: "Cancel"},
        { text: "OK", onPress: () => handleDeleteCompleted()}
      ]
    );
  }

  // Handle DeleteCompleted, deletes all tasks marked at completed/selected
  const handleDeleteCompleted = () => {
    let taskItemsCopy = [...taskItems];
    for(let index = 0; index < taskItemsCopy.length; index++){
      if(taskItemsCopy[index].completed === true){
        taskItemsCopy.splice(index, 1);
        index = index - 1;
      }
    }
    setTaskItems(taskItemsCopy);
    setMenuModal(false);
  }

  // Confirm Delete All tap in menu, alert to confirm and handle DeleteAll
  const confirmDeleteAll = () => {  
    Alert.alert(
      "Delete All",
      "Do you want to delete all the tasks?",
      [
        { text: "Cancel"},
        { text: "OK", onPress: () => {setTaskItems([]); setMenuModal(false);}}
      ]
    );
  }

  // Handle Date Picker Modal Confirm, set Date and hide Date Picker Modal
  const handleDateConfirm = (date) => {
    setDate(date.toString().slice(0, 15));
    setDatePickerVisibility(false);
  };

  // Toggle pressedArr when the square is pressed
  const toggleSquare = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].completed = !itemsCopy[index].completed;
    setTaskItems(itemsCopy);
  }

  useEffect(() =>{
    load();
  }, []);
  useEffect(() => {
    save();
  }, [taskItems]);

  // Load Arr values from AsyncStorage
  const load = async() => {
    try{
      let taskArr = await AsyncStorage.getItem("taskArr");
      if(taskArr !== null){
        setTaskItems(JSON.parse(taskArr));
      }
    }catch(err){
      alert(err);
    }
    
  }

  // Save Arr values to AsyncStorage
  const save = async() => {
    try{
      await AsyncStorage.setItem("taskArr", JSON.stringify(taskItems));
    }catch(err){
      alert(err);
    }
  }

  // Render home page Task list, push dates at the top of task groups
  const renderTaskList = () => {
    let taskItemsCopy = [...taskItems];
    let content = [];
    let tempDate;
    for(let index = 0; index < taskItemsCopy.length; index++){
      if(index == 0){
        tempDate = taskItemsCopy[index].date;
        content.push(<Text style={styles.sectionSubtitle} key={index}>{tempDate.slice(0, 3) + "," + tempDate.slice(3, -5)}</Text>);
      }else if(taskItemsCopy[index].date != tempDate){
        tempDate = taskItemsCopy[index].date;
        content.push(<Text style={styles.sectionSubtitle} key={index}>{tempDate.slice(0, 3) + "," + tempDate.slice(3, -5)}</Text>);
      }
      content.push(
        <TouchableOpacity key={index + "a"} onPress={() => clickEditTask(index)} onLongPress={() => confirmTaskLongPress(index)}>
          <Task text={taskItemsCopy[index]} index={index} toggleSquare={toggleSquare} /> 
        </TouchableOpacity>
      );
    }
    return content;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <HomePage setMenuModal={setMenuModal} renderTaskList={renderTaskList} setAddTaskModal={setAddTaskModal}/>
      <TouchableOpacity style={styles.addTaskWrapper} onPress={() => setAddTaskModal(true)}>
        <Icon style={styles.icon} name="add-circle"/>
      </TouchableOpacity>

      <AddModal addTaskModal={addTaskModal} setAddTaskModal={setAddTaskModal} setDefaultStates={setDefaultStates} task={task} setTask={setTask} 
        isDatePickerVisible={isDatePickerVisible} setDatePickerVisibility={setDatePickerVisibility} handleDateConfirm={handleDateConfirm} date={date} 
        setColorPickerModal={setColorPickerModal} color={color} handleAddTask={handleAddTask} 
      />

      <EditModal editTaskModal={editTaskModal} setEditTaskModal={setEditTaskModal} setDefaultStates={setDefaultStates} task={task} setTask={setTask} 
        isDatePickerVisible={isDatePickerVisible} setDatePickerVisibility={setDatePickerVisibility} handleDateConfirm={handleDateConfirm} date={date} 
        setColorPickerModal={setColorPickerModal} color={color} handleModifyTask={handleModifyTask} handleDeleteTask={handleDeleteTask}
      />

      <ColorModal colorPickerModal={colorPickerModal} setColorPickerModal={setColorPickerModal} setColor={setColor}/>

      <MenuModal menuModal={menuModal} setMenuModal={setMenuModal} confirmDeleteCompleted={confirmDeleteCompleted} confirmDeleteAll={confirmDeleteAll}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  sectionSubtitle: {
    marginBottom: 5,
    fontWeight: 'bold'
  },
  icon: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
