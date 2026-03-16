import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomePage() {
  const regions = [
    'Northern NSW',
    'Western NSW',
    'Southern NSW',
    'Western Sydney',
    'North Sydney',
    'Metro Sydney',
    'South Sydney',
  ];

  const incidents = [
    'Accident',
    'Hazard',
    'Building Fire',
    'Scheduled Roadwork',
  ];

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedIncident, setSelectedIncident] = useState('');
  const [streetName, setStreetName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const findRegion = () => {
    console.log('Selected region:', selectedRegion);
  };

  const findIncident = () => {
    console.log('Selected incident:', selectedIncident);
  };

  const findStreetName = () => {
    console.log('Selected street name:', streetName);
  };

  const withinThreeMonths = (dateString: string) => {
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const inputDate = new Date(dateString);

    return inputDate >= threeMonthsAgo && inputDate <= today;
  };

  const onChangeDate = (_event: any, pickedDate?: Date) => {
    setShowDatePicker(false);

    if (!pickedDate) return;

    const dateString = pickedDate.toISOString();

    if (withinThreeMonths(dateString)) {
      setSelectedDate(pickedDate);
    } else {
      console.log('Date must be within the last 3 months');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NSW Traffic Incidents</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Select Region</Text>
        <Picker
          selectedValue={selectedRegion}
          onValueChange={(itemValue) => setSelectedRegion(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a NSW region" value="" />
          {regions.map((region) => (
            <Picker.Item key={region} label={region} value={region} />
          ))}
        </Picker>
        <Button title="Search Region" onPress={findRegion} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Select Incident Type</Text>
        <Picker
          selectedValue={selectedIncident}
          onValueChange={(itemValue) => setSelectedIncident(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select incident type" value="" />
          {incidents.map((incident) => (
            <Picker.Item key={incident} label={incident} value={incident} />
          ))}
        </Picker>
        <Button title="Search Incident Type" onPress={findIncident} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Type Street Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter street name"
          value={streetName}
          onChangeText={setStreetName}
        />
        <Button title="Search Street Name" onPress={findStreetName} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Select Date</Text>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      <Button
        title={selectedDate.toDateString()}
        onPress={() => setShowDatePicker(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1eef5',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 12,
    padding: 12,
  },
  picker: {
    marginBottom: 12,
    padding: 12,
    fontSize: 14,
  },
  input: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
});
