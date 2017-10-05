import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

/*
* SelectList Component
*/

const styles = StyleSheet.create({
  list__item: {
    height: 50,
    backgroundColor: theme.color.lightestGray
  },
  item__text: {
    color: theme.color.black
  }
});

const renderDefaultListItem = ({ id, onPressItem, title }) => (
  <TouchableOpacity onPress={ onPressItem }>
    <View style={ styles.list__item }>
      <Text style={ styles.list__item }>{ title }</Text>
    </View>
  </TouchableOpacity>
);

export default class SelectList extends React.PureComponent {

  // Use `id` attribute to determine the list item keys
  extractKey = (item, index) => {
    return (this.props.itemKey && item[this.props.itemKey]) || item.id;
  }

  defaultRenderItem = ({ item }) => (
    <ListItem
      id={ item.id }
      onPressItem={ this.props.onPressItem }
      title={ item.title }
    />
  )

  render() {
    const { data, renderItem = renderDefaultListItem, refreshControl } = this.props;
    return (
      <FlatList
        data={ data }
        keyExtractor={ this.extractKey }
        renderItem={ renderItem }
        refreshControl={ refreshControl }
      />
    );
  }
};
