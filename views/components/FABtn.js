import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const FABtn = ({ onClick }) => {
  return <FAB style={styles.fab} color='white' icon='plus' onPress={onClick} />;
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FABtn;
