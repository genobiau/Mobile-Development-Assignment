import { render } from '@testing-library/react-native';
import SavedIncidentsPage from '../home/saved-incidents';

test('renders saved incidents page title', () => {
  const { getByText } = render(<SavedIncidentsPage />);

  expect(getByText('Saved NSW Traffic Incidents')).toBeTruthy();
  expect(getByText('ID:')).toBeTruthy();
  expect(getByText('Region:')).toBeTruthy();
  expect(getByText('Street Name:')).toBeTruthy();
  expect(getByText('Date:')).toBeTruthy();
});
