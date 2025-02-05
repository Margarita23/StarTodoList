import React, { useState, useEffect } from 'react'
import { Platform, View, Alert } from "react-native";
import { ListItem } from '@rneui/themed'
import CreateNewFormItemDialog from './CreateNewFormItemDialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types/types';

interface MenuComponentProps {
  todosNameList: string[];
	setActiveTodo: (name: string) => void;
}

const Menu: React.FC<MenuComponentProps> = ({todosNameList, setActiveTodo}) => {
	const [isNewItemFormDialogOpened, setIsNewItemFormDialogOpened] = useState(false)
	const [menuNamesList, setMenuNamesList] = useState<string[]>(todosNameList)
  const [activeItem, setActiveItem] = useState<string | null>(null)

	useEffect(() => {
		setMenuNamesList(todosNameList)
	}, [todosNameList])

	const handleOpenNewItemFormDialog = () => {
		setIsNewItemFormDialogOpened(true)
	}

	const handleCloseNewItemFormDialog = () => {
		setIsNewItemFormDialogOpened(false)
	}

	const handleCreateNewTodoList = async (name: string) => {

		if (isNewItemValid(name)) {
			setMenuNamesList([...menuNamesList, name])
			const todosList = await AsyncStorage.getItem('todos')
			let todosListJSON: Todo[] = []
			if (todosList !== null) {
				todosListJSON = JSON.parse(todosList)
			}

			todosListJSON.push({
				name: name,
				status: false,
				items: []
			})

			try {
				await AsyncStorage.setItem('todos', JSON.stringify(todosListJSON))
				alert('Data successfully saved')
			} catch (e) {
				alert('Failed to save the data to the storage')
			}

			setIsNewItemFormDialogOpened(false)
		}
	}

	const isNewItemValid = (name: string): boolean => {
		if (menuNamesList.includes(name)) {

			if (Platform.OS === 'web') {
				window.alert("This name already exists!")
			} else {
				Alert.alert("Duplicate Name", "This name already exists!");
			}
			return false
		}

		return true
	}

  return (
    <View style={{
			width: 200,
			position: 'absolute',
			borderColor: 'rgba(0, 0, 0, 0.12)',
			borderWidth: 1
		}}>
			<ListItem
				onPress={handleOpenNewItemFormDialog}
				containerStyle={{
					borderBottomColor: "rgba(0, 0, 0, 0.12)",
					borderBottomWidth: 1
				}}
			>
				<ListItem.Content>
					<ListItem.Title style={{
						color: 'rgb(32, 137, 220)',
						fontWeight: 'bold',
					}}
				>create todo list +</ListItem.Title>
				</ListItem.Content>
			</ListItem>
			{
				menuNamesList.map((item) => (
					<ListItem
						onPress={() => {
							setActiveTodo(item)
							setActiveItem(item)
						}}
						key={item}
						bottomDivider
            containerStyle={{
              backgroundColor: activeItem === item ? 'rgb(226, 242, 254)' : 'transparent'
            }}
					>
						<ListItem.Content>
							<ListItem.Title>{item}</ListItem.Title>
						</ListItem.Content>
					</ListItem>
				))
			}

			<CreateNewFormItemDialog
				title="Enter name of your new todos"
				visible={isNewItemFormDialogOpened}
				onClose={handleCloseNewItemFormDialog}
				onCreateNewItem={handleCreateNewTodoList}/>
		</View>  
  )
}

export default Menu
