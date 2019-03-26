
import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { FlatList } from 'react-native';
import { ProjectListItem } from './ProjectListItem';

export class ProjectList extends Component {
  static propTypes = {
    projects: array,
    onPressProject: func
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
    />
  )

  render() {
    const { projects } = this.props;
    return (
      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
      />
    )
  }
}