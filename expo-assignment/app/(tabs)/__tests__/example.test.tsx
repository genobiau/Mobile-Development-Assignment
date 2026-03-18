import { render } from '@testing-library/react-native';
import SearchPage from '../home/search-incidents';

test('renders the title and button count', () => {
  const { getByText } = render(<SearchPage />);
  expect(getByText('NSW Traffic Incidents')).toBeTruthy();
  expect(getByText('Search Region (0)')).toBeTruthy();
  expect(getByText('Search Incident Type (0)')).toBeTruthy();
});
