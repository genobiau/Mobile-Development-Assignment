import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchNSWIncidents } from '../../../services/nswTrafficAPI';

interface IncidentResult {
  id: string;
  region: string;
  incidentType: string;
  streetName: string;
  date: string;
}

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<IncidentResult[]>([]);
  const [loading, setLoading] = useState(true);

  const loadIncidents = async () => {
    try {
      const data = await fetchNSWIncidents();
      const features = data?.features || [];

      const mappedResults: IncidentResult[] = features.map(
        (item: any, index: number) => {
          return {
            id: item.properties?.id?.toString?.() || index.toString(),
            region: item.properties?.region || 'Unknown Region',
            incidentType:
              item.properties?.incidentType ||
              item.properties?.displayName ||
              'Unknown Incident',
            streetName:
              item.properties?.streetName ||
              item.properties?.roadName ||
              item.properties?.displayName ||
              'Unknown Street',
            date:
              item.properties?.created ||
              item.properties?.lastUpdated ||
              'Unknown Date',
          };
        },
      );

      setIncidents(mappedResults);
    } catch (error) {
      console.log('Error fetching NSW incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All NSW Traffic Incidents</Text>

      {loading ? (
        <Text style={styles.text}>Loading incidents...</Text>
      ) : incidents.length === 0 ? (
        <Text style={styles.text}>No incidents found.</Text>
      ) : (
        incidents.map((incident) => (
          <View key={incident.id} style={styles.card}>
            <Text style={styles.cardTitle}>{incident.incidentType}</Text>
            <Text>Region: {incident.region}</Text>
            <Text>Street: {incident.streetName}</Text>
            <Text>Date: {incident.date}</Text>
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
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'Arial',
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 16,
  },
});
