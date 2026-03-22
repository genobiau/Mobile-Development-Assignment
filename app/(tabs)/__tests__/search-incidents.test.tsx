import { render } from '@testing-library/react-native';
import SearchPage from '../home/search-incidents';

test('renders search page text', () => {
  const { getByText } = render(<SearchPage />);

  expect(getByText('NSW Traffic Incidents Search')).toBeTruthy();
});
