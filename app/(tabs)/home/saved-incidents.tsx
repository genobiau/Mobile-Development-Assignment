import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
interface incident {
  name: string;
  streetName: string;
}
export default function SaveIncidentsPage() {
  const [savedItems, setSavedItem] = useState<incident[]>([]);

  const readData = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('');
      const incidents =
        jsonValue != null ? (JSON.parse(jsonValue) as incident[]) : null;
      if (incidents != null) {
        setSavedItem(incidents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readData();
  }, []);
  return (
    <View>
      <Text>Saved Incidents</Text>
      {savedItems.map((incident) => {
        return <Text key={incident.name}>{incident.name}</Text>;
      })}
    </View>
  );
}
