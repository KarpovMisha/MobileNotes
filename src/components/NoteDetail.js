import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { StyleSheet, TextInput, View, findNodeHandle } from 'react-native';
import { SaveButton } from '../elements/Buttons/Buttons';

const styles = StyleSheet.create({
  note: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20
  },

  noteText: {
    fontSize: 16
  },

  button: {
    position: 'absolute',
    right: 0,
    top: 20,
    width: 35,
    height: 30,
    justifyContent: 'center'
  }
})

export class NoteDetail extends Component {
  static propTypes = {
    noteText: string,
    onChangeNoteText: func,
    saveNote: func
  }

  render() {
    const { noteText, onChangeNoteText, saveNote } = this.props;
    return (
      <View style={styles.note}>
        <TextInput
          multiline
          style={styles.noteText}
          value={noteText}
          placeholder="Type note text here ..."
          underlineColorAndroid="transparent"
          onChangeText={onChangeNoteText}
        />

        <SaveButton
          style={styles.button}
          onPress={saveNote}
        />
      </View>
    )
  }
}