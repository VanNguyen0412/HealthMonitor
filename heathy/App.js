import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function App() {
  const [bloodPressure, setBloodPressure] = useState({
    day1: { systolic: '', diastolic: '' },
    day2: { systolic: '', diastolic: '' },
    day3: { systolic: '', diastolic: '' },
  });
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const bpData = [
        [parseFloat(bloodPressure.day1.systolic), parseFloat(bloodPressure.day1.diastolic)],
        [parseFloat(bloodPressure.day2.systolic), parseFloat(bloodPressure.day2.diastolic)],
        [parseFloat(bloodPressure.day3.systolic), parseFloat(bloodPressure.day3.diastolic)],
      ];

      const response = await axios.post('http://192.168.1.12:8000/api/predict/', {
        blood_pressure: bpData
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (day, field, value) => {
    setBloodPressure(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [field]: value
      }
    }));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Systolic and Diastolic for Day 1:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        value={bloodPressure.day1.systolic}
        onChangeText={text => handleInputChange('day1', 'systolic', text)}
        keyboardType='numeric'
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        value={bloodPressure.day1.diastolic}
        onChangeText={text => handleInputChange('day1', 'diastolic', text)}
        keyboardType='numeric'
      />
      <Text>Enter Systolic and Diastolic for Day 2:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        value={bloodPressure.day2.systolic}
        onChangeText={text => handleInputChange('day2', 'systolic', text)}
        keyboardType='numeric'
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        value={bloodPressure.day2.diastolic}
        onChangeText={text => handleInputChange('day2', 'diastolic', text)}
        keyboardType='numeric'
      />
      <Text>Enter Systolic and Diastolic for Day 3:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        value={bloodPressure.day3.systolic}
        onChangeText={text => handleInputChange('day3', 'systolic', text)}
        keyboardType='numeric'
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10 }}
        value={bloodPressure.day3.diastolic}
        onChangeText={text => handleInputChange('day3', 'diastolic', text)}
        keyboardType='numeric'
      />
      <Button title="Predict" onPress={handlePredict} />
      {prediction !== null && (
        <Text>Prediction: {prediction === 1 ? 'Có nguy cơ huyết áp cao' : 'Huyết áp bình thường'}</Text>
      )}
    </View>
  );
}
