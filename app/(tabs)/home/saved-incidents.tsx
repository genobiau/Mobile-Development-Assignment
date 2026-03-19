import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Incident {
  region: string;
  incidentType: string;
  streetName: string;
  date: string;
}

export default function SavedIncidentsPage() {
  const [savedItems, setSavedItems] = useState<Incident[]>([]);

  const readData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('savedIncidents');
      const incidents =
        jsonValue != null ? (JSON.parse(jsonValue) as Incident[]) : [];

      setSavedItems(incidents);
    } catch (error) {
      console.log('Error reading saved incidents:', error);
    }
  };

  useEffect(() => {
    readData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Saved Incidents</Text>

      {savedItems.length === 0 ? (
        <Text style={styles.emptyText}>No saved incidents yet.</Text>
      ) : (
        savedItems.map((incident, index) => (
          <View key={`${incident.streetName}-${index}`} style={styles.card}>
            <Text style={styles.cardText}>Region: {incident.region}</Text>
            <Text style={styles.cardText}>
              Incident Type: {incident.incidentType}
            </Text>
            <Text style={styles.cardText}>
              Street Name: {incident.streetName}
            </Text>
            <Text style={styles.cardText}>Date: {incident.date}</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1eef5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Arial',
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Arial',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    marginBottom: 4,
    fontFamily: 'Arial',
  },
});
