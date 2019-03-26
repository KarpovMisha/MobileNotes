import React, { Component } from 'react';
import { object, func } from 'prop-types';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Platform,
  ActionSheetIOS,
  UIManager,
  findNodeHandle
} from 'react-native';
import { MenuButton } from '../elements/Buttons/Buttons';

const styles = StyleSheet.create({
  note: {
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    paddingVertical: 20,
    paddingHorizontal: 15,
    maxHeight: 150
  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },

  info: {
    paddingLeft: 15,
    paddingRight: 30
  },

  name: {
    fontSize: 16
  },

  time: {
    fontSize: 14,
    opacity: 0.8
  },

  text: {
    fontSize: 16,
    color: '#222222'
  },

  button: {
    position: 'absolute',
    right: 0,
    top: 20,
    width: 30,
    height: 30,
    justifyContent: 'center'
  }
})

export class NoteListItem extends Component {
  static propTypes = {
    note: object,
    onRemoveNote: func,
    onNavigateNote: func,
  }

  onPressMenu = index => {
    const { note, onNavigateNote, onRemoveNote } = this.props
    switch (index) {
      case 0:
        return onNavigateNote(note.id)
      case 1:
        return onRemoveNote(note.id)
    }
  }

  showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions({
        options: [ 'Edit', 'Delete', 'Cancel' ],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2
      },
      this.onPressMenu
    )
  }

  showPopupMenu = () => {
    const button = findNodeHandle(this._buttonRef)
    UIManager.showPopupMenu(
      button,
      [ 'Edit', 'Delete' ],
      e => console.error(e),
      (e, i) => this.onPressMenu(i)
    )
  }

  onOpenMenu = Platform.select({
    android: this.showPopupMenu,
    ios: this.showActionSheet
  })

  render() {
    const { userName, avatar, editTime, text } = this.props.note

    return (
      <View style={styles.note}>
        <View style={styles.title}>
          <Image style={styles.avatar} source={avatar} />
          <View style={styles.info}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.time}>{editTime}</Text>
          </View>
        </View>
        <Text style={styles.text}>{text}</Text>
        <MenuButton
          style={styles.button}
          ref={ref => this._buttonRef = ref}
          onPress={this.onOpenMenu}
        />
      </View>
    )
  }
}