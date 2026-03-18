import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(false);

  const hitEndpoint = () => {
    setLoading(true);

    fetch('https://api.transport.nsw.gov.au/v1/live/hazards/incident/all', {
      headers: {
        Authorization:
          'apikey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJzTDM3QzNKTnhNWmJtMWNFbjV4YS1xeVJBOWtXSVZWWW5HTWVKXzFabHJZIiwiaWF0IjoxNzczMDM1ODgwfQ.8Lu8M1nvj9jGZ47HlzTxZ5gUT1g636x1ISznvWS62SM',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error: ', error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NSW Traffic Incidents</Text>
      <Button
        title={loading ? 'Loading...' : 'Load Incidents'}
        onPress={hitEndpoint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
