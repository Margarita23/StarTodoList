import React, { useState } from 'react'
import { Dialog, Input } from '@rneui/themed';
import { View, Button } from 'react-native';

type DialogProps = {
  title: string;
  visible: boolean;
  onCreateNewItem: (name: string) => void;
  onClose: () => void;
}

function CreateNewFormItemDialog(props: DialogProps) {
  const [name, setName] = useState("New ToDo Name")

  return (
    <View>

      <Dialog
        isVisible={props.visible} onBackdropPress={props.onClose}
      >
        <Dialog.Title title={props.title}/>
        <Input
          value={name}
          placeholder='New ToDo Name'
          onChangeText={value => setName(value)}
        />
        <Dialog.Actions>
          <Button
            title="Create"
            color="rgb(32, 137, 220)"
            accessibilityLabel="Create new ToDo list"
            onPress={() => {
              props.onCreateNewItem(name);
              props.onClose()
            }}

          />
          <Button
            onPress={props.onClose}
            title="Discard"
            color="rgb(220, 32, 32)"
            accessibilityLabel="Discard"
          />
        </Dialog.Actions>
      </Dialog>

    </View>
  )
}

export default CreateNewFormItemDialog
