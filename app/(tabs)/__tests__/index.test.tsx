import { render } from '@testing-library/react-native';
import HomePage from '../home';

test('renders saved incidents page title', () => {
  const { getByText, getByTestId } = render(<HomePage />);

  expect(getByText('My Saved Incidents')).toBeTruthy();
  expect(getByText('Choose an option below')).toBeTruthy();
  expect(getByTestId('traffic-sign-image')).toBeTruthy();
  expect(
    getByText('Search incidents by Region, Type, Street name, and Date'),
  ).toBeTruthy();
  expect(getByText('View all NSW Traffic Incidents')).toBeTruthy();
  expect(getByText('View saved NSW Traffic Incidents')).toBeTruthy();
});
