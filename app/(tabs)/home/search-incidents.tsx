import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { fetchNSWIncidents } from '../../../services/nswTrafficAPI';

export default function SearchPage() {
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

  const loadIncidents = async () => {
    try {
      const data = await fetchNSWIncidents();
      console.log(data);
      return data;
    } catch (error) {
      console.log('Error fetching NSW incidents:', error);
      return null;
    }
  };

  const findRegion = async () => {
    const data = await loadIncidents();
    if (!data) return;

    console.log('Selected region:', selectedRegion);
  };

  const findIncident = async () => {
    const data = await loadIncidents();
    if (!data) return;

    console.log('Selected incident:', selectedIncident);
  };

  const findStreetName = async () => {
    const data = await loadIncidents();
    if (!data) return;

    console.log('Selected street name:', streetName);
  };

  const findDate = async () => {
    const data = await loadIncidents();
    if (!data) return;

    console.log('Selected date:', selectedDate.toDateString());
  };

  const withinThreeMonths = (date: Date) => {
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    return date >= threeMonthsAgo && date <= today;
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const minDate = formatDateForInput(threeMonthsAgo);
  const maxDate = formatDateForInput(today);

  const onWebDateChange = (e: any) => {
    const pickedDate = new Date(e.target.value);

    if (withinThreeMonths(pickedDate)) {
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
          <Picker.Item label="Select a NSW Region" value="" />
          {regions.map((region) => (
            <Picker.Item key={region} label={region} value={region} />
          ))}
        </Picker>
        <Button title="Search by Region" onPress={findRegion} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Select Incident Type</Text>
        <Picker
          selectedValue={selectedIncident}
          onValueChange={(itemValue) => setSelectedIncident(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Incident Type" value="" />
          {incidents.map((incident) => (
            <Picker.Item key={incident} label={incident} value={incident} />
          ))}
        </Picker>
        <Button title="Search by Incident Type" onPress={findIncident} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Type Street Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Street Name"
          value={streetName}
          onChangeText={setStreetName}
        />
        <Button title="Search by Street Name" onPress={findStreetName} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Select Date</Text>

        <input
          type="date"
          value={formatDateForInput(selectedDate)}
          min={minDate}
          max={maxDate}
          onChange={onWebDateChange}
          style={{
            padding: 10,
            fontSize: 16,
            borderRadius: 8,
            border: '1px solid #999',
            backgroundColor: '#fff',
            marginBottom: 12,
            width: 200,
            fontFamily: 'Arial',
          }}
        />

        <Button title="Search by Date" onPress={findDate} />
      </View>
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
    fontFamily: 'Arial',
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    padding: 12,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  picker: {
    marginBottom: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Arial',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontFamily: 'Arial',
  },
});
