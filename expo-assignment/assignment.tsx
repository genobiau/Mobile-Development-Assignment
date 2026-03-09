import { useState, useEffect } from 'react';
import {Button, FlatList, StyleSheet, Text, TextInput, View, Image,} from 'react-native';


export default function App() {


const [region, setRegion] = useState('');
const [incidentType, setIncidentType] = useState([]);
const [streetName, setStreetName] = useState([]);
const [date, setDate] = useState([]);
const [loading, setLoading] = useState(true);

const hitEndpoint = () => {
    fetch("https://api.transport.nsw.gov.au/v1/live/hazards/incident/all", {
      headers: {
        Authorization: "apikey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJzTDM3QzNKTnhNWmJtMWNFbjV4YS1xeVJBOWtXSVZWWW5HTWVKXzFabHJZIiwiaWF0IjoxNzczMDM1ODgwfQ.8Lu8M1nvj9jGZ47HlzTxZ5gUT1g636x1ISznvWS62SM",
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then(json => {
        console.log(json)
        setIncidentType(json.list)
        setLoading(false)
      })
      .catch(error => console.log('Error: ', error));
    };

  return (
    <View>
      <Text>NSW Traffic Incidents</Text>
    </View>
  );
};


