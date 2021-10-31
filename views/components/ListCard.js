import React from 'react';
import { Avatar, Card } from 'react-native-paper';

const RightContent = () => (
  <Avatar.Icon
    color='grey'
    size={32}
    style={{ backgroundColor: 'transparent' }}
    icon='chevron-right'
  />
);

const ListCard = ({ title, subtitle, onPress, image }) => (
  <Card onPress={onPress}>
    <Card.Cover source={{ uri: image }} />
    <Card.Title title={title} subtitle={subtitle} right={RightContent} />
  </Card>
);

export default ListCard;
