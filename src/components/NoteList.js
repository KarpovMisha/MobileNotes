import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { View, StyleSheet, SwipeableFlatList, Alert } from 'react-native';
import { NoteListItem } from './NoteListItem'
// import { RemoveButton } from './Buttons'

const styles = StyleSheet.create({
  quickActions: {
    flex: 1,
    alignItems: 'flex-end'
  }
})

export class NoteList extends Component {
  static propTypes = {
    notes: array,
    onRemoveNote: func,
    onNavigateNote: func
  }

  onRemoveNote = noteId => {
    Alert.alert(
      'Remove Note',
      'Do you want to remove note ?',
      [
        { text: 'Cancel', onPress: () => {}},
        { text: 'Remove', onPress: () => this.props.onRemoveNote(noteId) }
      ]
    )
  }

  renderItem = ({ item }) => {
    const { onNavigateNote } = this.props;

    return (
      <NoteListItem
        note={item}
        onNavigateNote={onNavigateNote}
        onRemoveNote={this.onRemoveNote} />
    )
  }

  render() {
    const { notes } = this.props;
    console.log('notes', notes);
    return (
      <SwipeableFlatList
        data={notes}
        bounceFirstRowOnMount={false}
        keyExtractor={item => item.id}
        maxSwipeDistance={60}
        renderQuickActions={() => {}}
        renderItem={this.renderItem}
      />
    )
  }
}