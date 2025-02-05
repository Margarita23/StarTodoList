import React from 'react'
import { View, FlatList } from 'react-native'
import Item from './Item'

const List: React.FC<ItemListProps> = ({items, handleStatusChange}) => {

  return (
    <View style={{zIndex: 0}}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Item
						id={item.id}
						name={item.name}
						description={item.description}
						status={item.status}
						handleStatusChange={handleStatusChange}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
    </View>
  )
}

export default List
