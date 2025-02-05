import React, { useEffect, useState } from 'react'
import { View, Text } from "react-native";
import { ListItem, CheckBox } from '@rneui/themed';

const Item: React.FC<ItemProps> = ({id, name, description, status, handleStatusChange}) => {
  const [expanded, setExpanded] = useState<boolean>(false)

	return (
    <View>

			<ListItem.Accordion
				content={
					<>
						<ListItem.Content>
							<ListItem.Title style={{
								textDecorationLine: status ? 'line-through' : 'none'
							}}
							>{name}</ListItem.Title>
						</ListItem.Content>

						<CheckBox
							center
							checked={status}
							onPress={() => {
								handleStatusChange && handleStatusChange(id, !status)
							}}
						/>
					</>
				}
				isExpanded={expanded}
				onPress={() => {
					setExpanded(!expanded);
				}}
			>
				<ListItem.Content>
					<ListItem.Title>{description || (
						<Text>no descriprion</Text>
					)}</ListItem.Title>
				</ListItem.Content>
      </ListItem.Accordion>

    </View>
  )
}

export default Item
