import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Incident {
  id: string;
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
      setSavedItems([]);
    }
  };

  const deleteIncident = async (id: string) => {
    try {
      const updatedItems = savedItems.filter((incident) => incident.id !== id);

      setSavedItems(updatedItems);

      await AsyncStorage.setItem(
        'savedIncidents',
        JSON.stringify(updatedItems),
      );
    } catch (error) {
      console.log('Error deleting saved incident:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      readData();
    }, []),
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.title}>Saved NSW Traffic Incidents</Text>

      {savedItems.length === 0 ? (
        <Text style={styles.emptyText}>No saved incidents yet.</Text>
      ) : (
        savedItems.map((incident) => (
          <View key={incident.id} style={styles.card}>
            <Link
              href={{
                pathname: '/home/[id]',
                params: {
                  id: incident.id,
                  source: 'saved',
                },
              }}
              style={styles.cardLink}
            >
              {incident.incidentType}
            </Link>

            <Text style={styles.cardText}>ID: {incident.id}</Text>
            <Text style={styles.cardText}>Region: {incident.region}</Text>
            <Text style={styles.cardText}>
              Street Name: {incident.streetName}
            </Text>
            <Text style={styles.cardText}>Date: {incident.date}</Text>

            <View style={styles.buttonRow}>
              <View style={styles.deleteButton}>
                <Button
                  title="Delete"
                  color="#c94c4c"
                  onPress={() => deleteIncident(incident.id)}
                />
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1eef5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Arial',
    color: '#222',
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Arial',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  cardLink: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
    fontFamily: 'Arial',
  },
  cardText: {
    fontSize: 15,
    marginBottom: 4,
    fontFamily: 'Arial',
    color: '#333',
  },
  buttonRow: {
    marginTop: 12,
  },
  deleteButton: {
    alignSelf: 'flex-start',
    minWidth: 120,
  },
});
