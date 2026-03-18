import { Text, View, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react'

export default function SaveIncidentsPage() {

  const [savedItems, setSavedItem] = useState('');

  const storeData = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('');
      jsonValue= jsonValue != null ? JSON.parse(jsonValue): null;
      setSavedItem(jsonValue)
    }
  return (
    <View>
      <Text>Saved Incidents</Text>
    </View>
  );
}
