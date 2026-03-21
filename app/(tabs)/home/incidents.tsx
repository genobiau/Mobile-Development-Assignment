import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchNSWIncidents } from '../../../services/nswTrafficAPI';

interface IncidentResult {
  id: string;
  region: string;
  incidentType: string;
  streetName: string;
  date: string;
  rawDateValue: number | null;
}

export default function IncidentsPage() {
  const router = useRouter();

  const { region, incidentType, streetName } = useLocalSearchParams<{
    region?: string;
    incidentType?: string;
    streetName?: string;
    date?: string;
  }>();

  const [incidents, setIncidents] = useState<IncidentResult[]>([]);
  const [loading, setLoading] = useState(true);

  const normalizeText = (value: string) => value.toLowerCase().trim();

  const normalizeRegion = (value: string) => {
    const text = normalizeText(value);

    if (
      text.includes('sydney') ||
      text.includes('metro') ||
      text.includes('city') ||
      text.includes('central coast')
    ) {
      return 'sydney';
    }

    if (text.includes('north sydney')) {
      return 'north sydney';
    }

    if (text.includes('south sydney')) {
      return 'south sydney';
    }

    if (text.includes('northern')) {
      return 'northern';
    }

    if (text.includes('southern')) {
      return 'southern';
    }

    if (text.includes('western sydney')) {
      return 'western sydney';
    }

    if (text.includes('western')) {
      return 'western';
    }

    if (text.includes('north')) {
      return 'north';
    }

    if (text.includes('south')) {
      return 'south';
    }

    return text;
  };

  const normalizeIncidentType = (value: string) => {
    const text = normalizeText(value);

    if (text.includes('accident') || text.includes('crash')) {
      return 'accident';
    }

    if (text.includes('hazard')) {
      return 'hazard';
    }

    if (text.includes('fire')) {
      return 'fire';
    }

    if (text.includes('roadwork') || text.includes('maintenance')) {
      return 'roadwork';
    }

    if (
      text.includes('traffic conditions') ||
      text.includes('changed traffic conditions')
    ) {
      return 'traffic conditions';
    }

    return text;
  };

  const getRawTimestamp = (rawDate: any): number | null => {
    if (!rawDate) return null;

    const numericValue = Number(rawDate);
    if (!isNaN(numericValue)) {
      return numericValue;
    }

    const parsedDate = new Date(rawDate);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.getTime();
    }

    return null;
  };

  const formatDate = (rawDate: any): string => {
    const timestamp = getRawTimestamp(rawDate);

    if (timestamp === null) return 'Unknown Date';

    return new Date(timestamp).toLocaleString();
  };

  const isWithinLastThreeMonths = (timestamp: number | null): boolean => {
    if (timestamp === null) return false;

    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    return (
      timestamp >= threeMonthsAgo.getTime() && timestamp <= today.getTime()
    );
  };

  const loadIncidents = async () => {
    try {
      setLoading(true);

      const data = await fetchNSWIncidents();
      const features = data?.features || [];

      const mappedResults: IncidentResult[] = features.map(
        (item: any, index: number) => {
          const properties = item?.properties || {};
          const firstRoad = properties?.roads?.[0] || {};

          const rawRegion =
            properties?.region ||
            firstRoad?.region ||
            firstRoad?.suburb ||
            properties?.suburb ||
            'Unknown Region';

          const rawIncidentType =
            properties?.incidentType ||
            properties?.displayName ||
            properties?.headline ||
            properties?.title ||
            'Unknown Incident';

          const rawStreetName =
            properties?.streetName ||
            firstRoad?.roadName ||
            properties?.roadName ||
            firstRoad?.crossStreet ||
            firstRoad?.crossStreet1 ||
            firstRoad?.crossStreet2 ||
            'Unknown Street';

          const rawDate =
            properties?.created ||
            properties?.lastUpdated ||
            properties?.start ||
            properties?.updated ||
            properties?.publishDate ||
            properties?.createdTime ||
            null;

          const rawDateValue = getRawTimestamp(rawDate);

          return {
            id: properties?.id?.toString?.() || index.toString(),
            region: String(rawRegion),
            incidentType: String(rawIncidentType),
            streetName: String(rawStreetName),
            date: formatDate(rawDate),
            rawDateValue,
          };
        },
      );

      const selectedRegionNormalized = region
        ? normalizeRegion(String(region))
        : '';

      const selectedIncidentNormalized = incidentType
        ? normalizeIncidentType(String(incidentType))
        : '';

      const selectedStreetNormalized = streetName
        ? normalizeText(String(streetName))
        : '';

      const filteredAndSortedResults = mappedResults
        .filter((incident) => isWithinLastThreeMonths(incident.rawDateValue))
        .filter((incident) => {
          const incidentRegionNormalized = normalizeRegion(incident.region);
          const incidentTypeNormalized = normalizeIncidentType(
            incident.incidentType,
          );
          const incidentStreetNormalized = normalizeText(incident.streetName);

          const matchesRegion =
            !selectedRegionNormalized ||
            incidentRegionNormalized.includes(selectedRegionNormalized);

          const matchesIncidentType =
            !selectedIncidentNormalized ||
            incidentTypeNormalized.includes(selectedIncidentNormalized);

          const matchesStreetName =
            !selectedStreetNormalized ||
            incidentStreetNormalized.includes(selectedStreetNormalized);

          return matchesRegion && matchesIncidentType && matchesStreetName;
        })
        .sort((a, b) => (b.rawDateValue || 0) - (a.rawDateValue || 0));

      setIncidents(filteredAndSortedResults);
    } catch (error) {
      console.log('Error fetching NSW incidents:', error);
      setIncidents([]);
    } finally {
      setLoading(false);
    }
  };

  const saveIncident = async (incident: IncidentResult) => {
    try {
      const existingValue = await AsyncStorage.getItem('savedIncidents');
      const existingIncidents: IncidentResult[] = existingValue
        ? JSON.parse(existingValue)
        : [];

      const alreadyExists = existingIncidents.some(
        (savedIncident) => savedIncident.id === incident.id,
      );

      if (alreadyExists) {
        router.push('/home/saved-incidents');
        return;
      }

      const updatedIncidents = [...existingIncidents, incident];

      await AsyncStorage.setItem(
        'savedIncidents',
        JSON.stringify(updatedIncidents),
      );

      router.push('/home/saved-incidents');
    } catch (error) {
      console.log('Error saving incident:', error);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, [region, incidentType, streetName]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.title}>NSW Traffic Incidents</Text>

      {loading ? (
        <Text style={styles.text}>Loading incidents...</Text>
      ) : incidents.length === 0 ? (
        <Text style={styles.text}>No incidents found.</Text>
      ) : (
        incidents.map((incident) => (
          <View key={incident.id} style={styles.card}>
            <Link
              href={{
                pathname: '/home/[id]',
                params: {
                  id: incident.id,
                  source: 'api',
                  region: incident.region,
                  incidentType: incident.incidentType,
                  streetName: incident.streetName,
                },
              }}
              style={styles.cardLink}
            >
              {incident.incidentType}
            </Link>

            <Text style={styles.text}>Region: {incident.region}</Text>
            <Text style={styles.text}>Street Name: {incident.streetName}</Text>
            <Text style={styles.text}>Date: {incident.date}</Text>

            <View style={styles.buttonSpacing}>
              <Button
                title="Save Incident"
                onPress={() => saveIncident(incident)}
              />
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
    marginBottom: 8,
    fontFamily: 'Arial',
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#555',
    fontFamily: 'Arial',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardLink: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
    color: '#222',
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 16,
    marginBottom: 4,
    color: '#222',
  },
  buttonSpacing: {
    marginTop: 10,
  },
});
