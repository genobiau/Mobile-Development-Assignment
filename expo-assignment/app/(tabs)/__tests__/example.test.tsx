import { render } from '@testing-library/react-native';
import HomePage from '../home/index';

test('renders the title and button count', () => {
  const { getByText } = render(<HomePage />);
  expect(getByText('NSW Traffic Incidents')).toBeTruthy();
  expect(getByText('Search Region (0)')).toBeTruthy();
  expect(getByText('Search Incident Type (0)')).toBeTruthy();
});
