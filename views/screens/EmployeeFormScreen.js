import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { genders, departments, skillsets } from '../../logic/model/form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch } from 'react-redux';
import { addToEmployeesList, editToEmployeesList } from '../../logic/actions';
import { Dropdown, MultiselectDropdown } from 'sharingan-rn-modal-dropdown';
import { TextInput, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

const EmployeeFormScreen = ({ route, navigation }) => {
  const dateFormat = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const { id } = route.params;
  const dispatch = useDispatch();
  const employeesList = useSelector((state) => state.employees);
  const [data, setData] = React.useState({
    id: null,
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    department: '',
    doj: '',
    skillset: [],
    isFirstNameValid: false,
    isLastNameValid: false,
    isDOBValid: false,
    isModalDOBOpen: false,
    isModalDOJOpen: false,
    isGenderValid: false,
    isDepartmentValid: false,
    isDOJValid: false,
    isSkillsetValid: false,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const handleFirstNameChange = (val) => {
    if (val.length > 0) {
      setData({
        ...data,
        firstName: val,
        isFirstNameValid: true,
      });
    } else {
      setData({
        ...data,
        firstName: val,
        isFirstNameValid: false,
      });
    }
  };

  const handleLastNameChange = (val) => {
    if (val.length > 0) {
      setData({
        ...data,
        lastName: val,
        isLastNameValid: true,
      });
    } else {
      setData({
        ...data,
        lastName: val,
        isLastNameValid: false,
      });
    }
  };

  const handleGenderChange = (val) => {
    if (val.length > 0) {
      setData({
        ...data,
        gender: val,
        isGenderValid: true,
      });
    } else {
      setData({
        ...data,
        gender: val,
        isGenderValid: false,
      });
    }
  };

  const handleDepartmentChange = (val) => {
    if (val.length > 0) {
      setData({
        ...data,
        department: val,
        isDepartmentValid: true,
      });
    } else {
      setData({
        ...data,
        department: val,
        isDepartmentValid: false,
      });
    }
  };

  const handleSkillsetsChange = (val) => {
    if (val.length > 0) {
      setData({
        ...data,
        skillset: val,
        isSkillsetValid: true,
      });
    } else {
      setData({
        ...data,
        skillset: val,
        isSkillsetValid: false,
      });
    }
  };

  const showDatePicker = (tfName) => {
    if (tfName === 'dob') {
      setData({
        ...data,
        isModalDOBOpen: true,
      });
    } else {
      setData({
        ...data,
        isModalDOJOpen: true,
      });
    }
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (data.isModalDOBOpen) {
      const currentYear = new Date();
      if (date.getFullYear() < currentYear.getFullYear()) {
        setData({
          ...data,
          dob: date.toLocaleDateString('fr', dateFormat),
          isDOBValid: true,
          isModalDOBOpen: false,
          isModalDOJOpen: false,
        });
      } else {
        Alert.alert('Please choose a correct date');
      }
    }
    if (data.isModalDOJOpen) {
      setData({
        ...data,
        doj: date.toLocaleDateString('fr', dateFormat),
        isDOJValid: true,
        isModalDOBOpen: false,
        isModalDOJOpen: false,
      });
    }

    hideDatePicker();
  };

  const submitHandler = () => {
    if (
      data.isFirstNameValid &&
      data.isLastNameValid &&
      data.isDOBValid &&
      data.isGenderValid &&
      data.isDepartmentValid &&
      data.isDOJValid &&
      data.isSkillsetValid
    ) {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        gender: data.gender,
        department: data.department,
        doj: data.doj,
        skillset: data.skillset,
      };
      if (id != null) {
        dispatch(editToEmployeesList({ ...payload, id: id }));
      } else {
        dispatch(
          addToEmployeesList({
            ...payload,
            id:
              employeesList.length > 0
                ? employeesList[employeesList.length - 1].id + 1
                : 1,
          })
        );
      }
      clearForm();
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please fix form errors');
    }
  };

  function clearForm() {
    setData({
      id: null,
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      department: '',
      doj: '',
      skillset: [],
      isFirstNameValid: false,
      isLastNameValid: false,
      isDOBValid: false,
      isModalDOBOpen: false,
      isModalDOJOpen: false,
      isGenderValid: false,
      isDepartmentValid: false,
      isDOJValid: false,
      isSkillsetValid: false,
    });
  }

  React.useEffect(() => {
    clearForm();
    if (id != null) {
      const eIndex = employeesList.findIndex((element) => element.id == id);
      setData({
        firstName: employeesList[eIndex].firstName,
        lastName: employeesList[eIndex].lastName,
        dob: employeesList[eIndex].dob,
        gender: employeesList[eIndex].gender,
        department: employeesList[eIndex].department,
        doj: employeesList[eIndex].doj,
        skillset: employeesList[eIndex].skillset,
        isFirstNameValid: employeesList[eIndex].firstName.length > 0,
        isLastNameValid: employeesList[eIndex].lastName.length > 0,
        isDOBValid: employeesList[eIndex].dob.length > 0,
        isModalDOBOpen: false,
        isModalDOJOpen: false,
        isGenderValid: employeesList[eIndex].gender.length > 0,
        isDepartmentValid: employeesList[eIndex].department.length > 0,
        isDOJValid: employeesList[eIndex].doj.length > 0,
        isSkillsetValid: employeesList[eIndex].skillset.length > 0,
      });
    }
  }, [id, dispatch, route.params]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label='First Name'
        mode='outlined'
        style={styles.textField}
        onChangeText={handleFirstNameChange}
        value={data.firstName}
        error={!data.isFirstNameValid}
      />
      <TextInput
        label='Last Name'
        mode='outlined'
        style={styles.textField}
        onChangeText={handleLastNameChange}
        value={data.lastName}
        error={!data.isLastNameValid}
      />
      <TextInput
        label='Date of birth'
        mode='outlined'
        editable={false}
        style={styles.textField}
        value={data.dob}
        onPressIn={(_) => showDatePicker('dob')}
        error={!data.isDOBValid}
      />
      <Dropdown
        label='Gender'
        required
        mode='outlined'
        data={genders}
        value={data.gender}
        onChange={handleGenderChange}
        error={!data.isGenderValid}
        errorColor='#ba000d'
        mainContainerStyle={styles.textField}
      />
      <Dropdown
        label='Department'
        required
        mode='outlined'
        data={departments}
        value={data.department}
        onChange={handleDepartmentChange}
        error={!data.isDepartmentValid}
        errorColor='#ba000d'
        mainContainerStyle={styles.textField}
      />
      <TextInput
        label='Date of join'
        mode='outlined'
        editable={false}
        style={styles.textField}
        value={data.doj}
        onPressIn={(_) => showDatePicker('doj')}
        error={!data.isDOJValid}
      />
      <MultiselectDropdown
        label='Skillset'
        required
        mode='outlined'
        data={skillsets}
        chipType='outlined'
        chipStyle={styles.chip}
        value={data.skillset}
        onChange={handleSkillsetsChange}
        error={!data.isSkillsetValid}
        errorColor='#ba000d'
        mainContainerStyle={styles.textField}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button mode='contained' onPress={submitHandler}>
        Save
      </Button>
    </ScrollView>
  );
};

export default EmployeeFormScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  textField: {
    marginBottom: 15,
  },
  chip: {
    borderColor: 'green',
  },
});
