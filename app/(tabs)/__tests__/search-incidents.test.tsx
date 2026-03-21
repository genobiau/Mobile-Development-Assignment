import { render } from '@testing-library/react-native';
import SearchPage from '../home/search-incidents';

test('renders search page text', () => {
  const { getByText } = render(<SearchPage />);

  expect(getByText('NSW Traffic Incidents Search')).toBeTruthy();
  expect(getByText('Region')).toBeTruthy();
  expect(getByText('Incident Type')).toBeTruthy();
  expect(getByText('Street Name')).toBeTruthy();
  expect(getByText('Date')).toBeTruthy();
  expect(getByText('Search Incidents')).toBeTruthy();
});
