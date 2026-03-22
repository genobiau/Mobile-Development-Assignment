import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NSW Traffic Incidents</Text>
      <Text style={styles.subtitle}>Choose an option below</Text>

      <Image
        source={require('../../../assets/images/trafficsign.png')}
        style={styles.image}
        resizeMode="contain"
        testID="traffic-sign-image"
      />

      <Link href="/home/search-incidents" style={styles.linkButton}>
        Search incidents by Region, Type, Street name, and Date
      </Link>

      <Link href="/home/incidents" style={styles.linkButton}>
        View all NSW Traffic Incidents
      </Link>

      <Link href="/home/saved-incidents" style={styles.linkButton}>
        View saved NSW Traffic Incidents
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
    fontFamily: 'Arial',
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Arial',
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  image: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 25,
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
