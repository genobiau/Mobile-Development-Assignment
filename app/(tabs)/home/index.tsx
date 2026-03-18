import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function Homepage() {
  const [region, clickRegion] = useState('');
  const [incident, clickIncident] = useState('');
  const [nameOfStreet, clickStreetName] = useState('');
  const [date, clickDate] = useState('');

  return (
    <View>
      <View>
        <Link href="/home/search-incidents">
          <Text>
            Go to Search Incidents to search NSW Traffic Incidents through
            region, incidents, street name and date (within 3months)
          </Text>
        </Link>
      </View>
      <View>
        <Link href="/home/incidents">
          <Text>Go to Incidents to view NSW Traffic Incidents</Text>
        </Link>
      </View>
      <View>
        <View>
          <Link href="/home/incidents">
            <Text>Go to Incidents to view all the NSW Traffic Incidents</Text>
          </Link>
        </View>
        <View>
          <Link href="/home/saved-incidents">
            <Text>
              Go to Saved Incidents to view all the saved NSW Traffic Incidents
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
