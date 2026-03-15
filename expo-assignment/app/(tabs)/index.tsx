import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function CountScreen() {
  const [count, setCount] = useState(0);

  const buttonPress = () => {
    setCount(count + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NSW Traffic Incidents</Text>
      <Button title={`Count: ${count}`} onPress={buttonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#53f7aa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
