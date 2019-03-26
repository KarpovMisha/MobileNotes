import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const styles = StyleSheet.create({
  project: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray'
  },
  name: {
    fontSize: 16
  }
})

export class ProjectListItem extends Component {
  static propTypes = {
    project: object,
    onPressProject: func
  }

  onPressProject = () => {
    const { project, onPressProject } = this.props
    onPressProject(project)
  }

  render() {
    const { project: { name } } = this.props;

    return (
      <TouchableOpacity onPress={this.onPressProject}>
        <View style={styles.project}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}