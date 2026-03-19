import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NSW Traffic Incidents</Text>
      <Text style={styles.subtitle}>Choose an option below</Text>

      <Link href="/home/search-incidents" style={styles.linkButton}>
        Search incidents by region, type, street name, and date
      </Link>

      <Link href="/home/incidents" style={styles.linkButton}>
        View all NSW traffic incidents
      </Link>

      <Link href="/home/saved-incidents" style={styles.linkButton}>
        View saved NSW traffic incidents
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1eef5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  linkButton: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
    textAlign: 'center',
    color: '#222',
    fontSize: 16,
    overflow: 'hidden',
  },
});
