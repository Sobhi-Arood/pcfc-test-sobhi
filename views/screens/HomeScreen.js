import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import FABtn from '../components/FABtn';
import { ActivityIndicator } from 'react-native-paper';
import ListCard from '../components/ListCard';
import { useDispatch } from 'react-redux';
import { getEmployeesList } from '../../logic/actions';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const employeesState = useSelector((state) => state);
  const { employees, loading, error } = employeesState;
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListCard
      title={`${item.firstName} ${item.lastName}`}
      subtitle={item.department}
      onPress={() => navigation.navigate('Employee', { id: item.id })}
    />
  );

  React.useEffect(() => {
    dispatch(getEmployeesList());
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : error ? (
        <View style={styles.container}>
          <Text>No Employees</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={keyExtractor}
          data={employees}
          renderItem={renderItem}
        />
      )}
      <FABtn onClick={() => navigation.navigate('Employee', { id: null })} />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
