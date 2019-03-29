import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import Swipeable from 'react-native-swipeable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    height: 75
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    height: 75
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'paleturquoise'
  },
  button: {
    alignItems: 'center',
    padding: 10
  },
  project: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    paddingVertical: 20,
    paddingHorizontal: 15,
    maxHeight: 100
  }
});
export class ProjectListItem extends Component {
  static propTypes = {
    project: object,
    onPressProject: func,
    removeProject: func
  }

  onPressProject = () => {
    const { project, onPressProject } = this.props
    onPressProject(project)
  }

  confirmPopup = () => {
    Alert.alert(
      'Remove Project',
      'Do you want to remove project',
      [
        {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
        {text: 'YES', onPress: this.deletePrject},
      ],
      {cancelable: false}
    );
  }

  deletePrject = () => {
    const { project: { id }, removeProject } = this.props;
    removeProject(id);
  }

  render() {
    const { project: { name } } = this.props;

    return (
      <Swipeable
        style={styles.project}
        rightButtons={[
          <TouchableOpacity
            style={styles.rightSwipeItem}
            onPress={this.confirmPopup}
          >
            <Text style={styles.button}>Delete</Text>
          </TouchableOpacity>
        ]}
      >
        <View style={styles.listItem}>
          <TouchableOpacity onPress={this.onPressProject}>
            <View>
              <Text style={styles.name}>{name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    )

  }
}