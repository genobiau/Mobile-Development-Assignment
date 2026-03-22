jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-router', () => ({
  Link: ({ children }: any) => children,
  useLocalSearchParams: () => ({ id: '123' }),
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

import { render } from '@testing-library/react-native';
import IncidentsPage from '../home/incidents';

test('renders incidents page title', () => {
  const { getByText } = render(<IncidentsPage />);
  expect(getByText('NSW Traffic Incidents')).toBeTruthy();
});

test('renders loading text initially', () => {
  const { getByText } = render(<IncidentsPage />);
  expect(getByText('Loading incidents...')).toBeTruthy();
});
