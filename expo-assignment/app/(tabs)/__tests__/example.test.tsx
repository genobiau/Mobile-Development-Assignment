import { render } from '@testing-library/react-native';
import CountScreen from '..';

test('renders the title and button count', () => {
  const { getByText } = render(<CountScreen />);
  expect(getByText('NSW Traffic Incidents')).toBeTruthy();
  expect(getByText('Count: 0')).toBeTruthy();
});
