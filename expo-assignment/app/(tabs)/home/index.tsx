import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
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

  const [count, setCount] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedIncident, setSelectedIncident] = useState('');
  const [streetName, setStreetName] = useState('');
  const [date, setDate] = useState(false);

  const buttonPress = () => {
    setCount(count + 1);
  };

  const findRegion = () => {
    console.log('Selected region: ', selectedRegion);
  };

  const findIncident = () => {
    console.log('Selected incidents: ', selectedIncident);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>NSW Traffic Incidents</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Select Region</Text>

          <Button title={`Count: ${count}`} onPress={buttonPress} />
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#955cff',
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    marginBottom: 20,
  },
});
