
import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { FlatList, StyleSheet, ScrollView } from 'react-native';
import { ProjectListItem } from './ProjectListItem';

export class ProjectList extends Component {
  static propTypes = {
    projects: array,
    onPressProject: func,
    removeProject: func
  }

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem = ({ item, i }) => (
    <ProjectListItem
      key={i}
      project={item}
      onPressProject={this.props.onPressProject}
      removeProject={this.props.removeProject}
    />
  )

  render() {
    const { projects } = this.props;
    return (
      <ScrollView>
        <FlatList
          data={projects}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
      </ScrollView>
    )
  }
}