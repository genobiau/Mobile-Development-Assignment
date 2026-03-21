import { fireEvent, render } from '@testing-library/react-native';
import SearchPage from '../home/search-incidents';

test('renders search page text', () => {
  const { getByText } = render(<SearchPage />);

  expect(getByText('NSW Traffic Incidents Search')).toBeTruthy();
  expect(getByText('Region')).toBeTruthy();
  expect(getByText('Incident Type')).toBeTruthy();
  expect(getByText('Street Name')).toBeTruthy();
  expect(getByText('Date')).toBeTruthy();
});

test('renders and presses the Search Incidents button', () => {
  const { getByText } = render(<SearchPage />);

  const searchButton = getByText('Search Incidents');
  fireEvent.press(searchButton);

  expect(searchButton).toBeTruthy();
});
