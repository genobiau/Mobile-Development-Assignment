import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SearchPage() {
  const router = useRouter();

  const regions = [
    { label: 'All Regions', value: '' },
    { label: 'Sydney NSW', value: 'sydney' },
    { label: 'Northern NSW', value: 'north' },
    { label: 'Southern NSW', value: 'south' },
    { label: 'Western NSW', value: 'west' },
    { label: 'Metro NSW', value: 'metro' },
    { label: 'Central Coast NSW', value: 'central coast' },
  ];

  const incidentTypes = [
    { label: 'All Incident Types', value: '' },
    { label: 'Accident / Crash', value: 'accident' },
    { label: 'Hazard', value: 'hazard' },
    { label: 'Fire', value: 'fire' },
    { label: 'Roadwork', value: 'roadwork' },
    { label: 'Traffic Conditions', value: 'traffic conditions' },
  ];

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedIncidentType, setSelectedIncidentType] = useState('');
  const [streetName, setStreetName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const withinThreeMonths = (date: Date) => {
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return date >= threeMonthsAgo && date <= today;
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
    }
  };

  const goToIncidentsPage = () => {
    router.push({
      pathname: '/home/incidents',
      params: {
        region: selectedRegion,
        incidentType: selectedIncidentType,
        streetName: streetName.trim(),
        date: selectedDate.toISOString(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NSW Traffic Incidents Search</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Region</Text>
        <Picker
          selectedValue={selectedRegion}
          onValueChange={(itemValue) => setSelectedRegion(itemValue)}
          style={styles.picker}
        >
          {regions.map((region) => (
            <Picker.Item
              key={region.label}
              label={region.label}
              value={region.value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Incident Type</Text>
        <Picker
          selectedValue={selectedIncidentType}
          onValueChange={(itemValue) => setSelectedIncidentType(itemValue)}
          style={styles.picker}
        >
          {incidentTypes.map((incident) => (
            <Picker.Item
              key={incident.label}
              label={incident.label}
              value={incident.value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Street Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter street name"
          value={streetName}
          onChangeText={setStreetName}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date</Text>
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
            width: 220,
            fontFamily: 'Arial',
          }}
        />
      </View>

      <Button title="Search Incidents" onPress={goToIncidentsPage} />
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
    borderRadius: 8,
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
