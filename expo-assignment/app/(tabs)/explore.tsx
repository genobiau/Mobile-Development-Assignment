import { StyleSheet, Text, View } from 'react-native';

export default function ExploreTrafficNSW() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore NSW Traffic</Text>
      <Text style={styles.paragraph}>
        Browse NSW traffic information by region:
      </Text>

      <View style={styles.list}>
        <View style={styles.row}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>Northern NSW</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>Southern NSW</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>Metro Sydney</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>Western Sydney</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>North Sydney</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>South Sydney</Text>
        </View>
      </View>

      <Text style={styles.paragraph}>
        Browse NSW traffic information by incidents type:
      </Text>

      <View style={styles.list}>
        <View style={styles.row}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>Accident</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>Hazard</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>Building Fire</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>Scheduled Roadwork</Text>
        </View>
      </View>

      <Text style={styles.paragraph}>
        Use the Home tab for full search of NSW Traffic Region and saved Traffic
        Incidents.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#53f7aa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 18,
    marginRight: 8,
  },
  itemText: {
    fontSize: 16,
  },
});
