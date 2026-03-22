jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-router', () => ({
  Link: ({ children }: any) => children,
  useFocusEffect: (callback: any) => callback(),
}));

import { render } from '@testing-library/react-native';
import SavedIncidentsPage from '../home/saved-incidents';

test('renders saved incidents page title', () => {
  const { getByText } = render(<SavedIncidentsPage />);
  expect(getByText('Saved NSW Traffic Incidents')).toBeTruthy();
});
