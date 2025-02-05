import { useState, useEffect } from 'react'
import { Platform, View, Text, Button, Alert } from "react-native";
import List from "./components/List"
import Header from './components/Header';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item, Todo } from './types/types';
import CreateNewFormItemDialog from './components/CreateNewFormItemDialog';

export default function Index() {
  const [todosNameList, setTodosNameList] = useState<string[]>([])
  const [items, setItems] = useState<ItemProps[]>([])
  const [activeTodo, setActiveTodo] = useState<string>("")
  const [isNewItemFormDialogOpened, setIsNewItemFormDialogOpened] = useState(false)

  useEffect(() => {
    const loadTodosList = async () => {
      try {
        const todosList = await AsyncStorage.getItem('todos')
        if (todosList !== null) {
          const list: Todo[] = JSON.parse(todosList)
          const nameList: string[] = list.map((item: Todo) => { return item.name })
          setTodosNameList(nameList)
        }
      } catch (error) {
        console.error('Error fetching tasks', error)
      }
    }

    loadTodosList()
  }, [])

  useEffect(() => {
    if (activeTodo) {
      showItems(activeTodo);
    }
    
  }, [activeTodo])

  const showItems = async (name: string) => {
    try {
      const todo = await AsyncStorage.getItem('todos')
      if (todo !== null) {
        const list: Todo[] = JSON.parse(todo)
        const todoListByName = list.find((item: Todo) => item.name === name)
        const items: Item[] = todoListByName?.items ?? []
        
        setItems(items)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleStatusChange = async (id: number, newStatus: boolean) => {
    
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    )
    
    try {
      const todosList = await AsyncStorage.getItem("todos");
      let todosListJSON: Todo[] = todosList ? JSON.parse(todosList) : [];
  
      const updatedTodos = todosListJSON.map((todo) => {
        if (todo.name === activeTodo) {
          return { ...todo, items: updatedItems };
        }
        return todo;
      });
  
      await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));

      const activeTodoUpdated = updatedTodos.find(todo => todo.name === activeTodo);
      setItems(activeTodoUpdated ? activeTodoUpdated.items : []);
  
      console.log("Updated status successfully");
    } catch (e) {
      console.error("Failed to save the status change", e);
    }
  }

  const handleCloseNewItemFormDialog = () => {
		setIsNewItemFormDialogOpened(false)
	}

  const handleOpenNewItemFormDialog = () => {
		setIsNewItemFormDialogOpened(true)
	}

  const handleCreateNewTask = async (name: string) => {
    const newItemId = (items[items.length-1]?.id ?? 0) + 1
    const newItem = {
      id: newItemId,
      name: name,
      description: "",
      status: false
    }

		if (isNewItemValid(name)) {
      const updatedItems = [...items, newItem];

      try {
        const todosList = await AsyncStorage.getItem("todos");
        let todosListJSON: Todo[] = todosList ? JSON.parse(todosList) : [];
  
        const updatedTodos = todosListJSON.map((todo) => {
          if (todo.name === activeTodo) {
            return { ...todo, items: updatedItems };
          }
          return todo;
        });
  
        await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
  
        setItems((prevItems) => [...prevItems, newItem]);

        alert("Task successfully added");
      } catch (e) {
        alert("Failed to save the task");
        console.error(e);
      }

			handleCloseNewItemFormDialog()
		}
	}

  const isNewItemValid = (name: string): boolean => {
      if (items.some((item) => item.name === name)) {
  
        if (Platform.OS === 'web') {
          window.alert("This task already exists!")
        } else {
          Alert.alert("Duplicate Name", "This task already exists!");
        }
        return false
      }
  
      return true
    }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Header
          todosNameList={todosNameList}
          activeTodo={activeTodo}
          setActiveTodo={setActiveTodo}
        ></Header>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {items.length === 0 ? (
            <View>
              <Text>There is no todos item</Text>
            </View>
            ) : (
            <View>
              <List items={items} handleStatusChange={handleStatusChange}></List>
            </View>
          )}
          {activeTodo ? (<Button
              title="Add Todo Task"
              color="rgb(32, 137, 220)"
              accessibilityLabel="Create new ToDo list"
              onPress={() => {
                handleOpenNewItemFormDialog();
              }}
            />) : null
          }

          <CreateNewFormItemDialog
            title="Enter name of your new task"
            visible={isNewItemFormDialogOpened}
            onClose={handleCloseNewItemFormDialog}
            onCreateNewItem={handleCreateNewTask}/>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
