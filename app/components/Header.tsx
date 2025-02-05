import React, {useState} from "react";
import { Header, Icon } from "@rneui/base";
import { View } from "react-native";
import Menu from "./Menu";

interface HeaderComponentProps {
  todosNameList: string[];
	activeTodo: string;
	setActiveTodo: (name: string) => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ todosNameList, activeTodo, setActiveTodo }) => {

	const [state, setState] = useState({
		isVisible: false
	})

	const toggleVisibility = () => {
		setState({
			isVisible: !state.isVisible,
		})
	}

  return (
		<>
			<Header
				barStyle="default"
				centerComponent={{
					text: (activeTodo && `Todo "${activeTodo}"`) || "ToDo",
					style: { color: "#fff" }
				}}
				containerStyle={{
					borderBottomWidth: 0,
				}}
				leftComponent={		
					<Icon
						color="#fff"
						name='menu'
						onPress={() => {
							toggleVisibility()
						}}
					/>						
				}
				placement="center"
			/>
			<View style={{
				zIndex: 1,
				display: state.isVisible ? 'flex' : 'none'
			}}>
				<Menu todosNameList={todosNameList} setActiveTodo={setActiveTodo}/>
			</View>
		</>
  );
}

export default HeaderComponent;