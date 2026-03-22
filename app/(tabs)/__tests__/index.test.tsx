import { render } from '@testing-library/react-native';
import HomePage from '../home/index';

test('renders home page content', () => {
  const { getByText, getByTestId } = render(<HomePage />);

  expect(getByText('NSW Traffic Incidents')).toBeTruthy();
  expect(getByTestId('traffic-sign-image')).toBeTruthy();
});
