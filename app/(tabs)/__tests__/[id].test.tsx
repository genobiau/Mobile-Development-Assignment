import { render } from '@testing-library/react-native';
import IncidentDetailsPage from '../home/[id]';

test('renders saved incidents page title', () => {
  const { getByText } = render(<IncidentDetailsPage />);

  expect(getByText('My Saved Incidents')).toBeTruthy();
  expect(getByText('ID:')).toBeTruthy();
  expect(getByText('Region:')).toBeTruthy();
  expect(getByText('Street Name:')).toBeTruthy();
  expect(getByText('Date:')).toBeTruthy();
  expect(getByText('Headline:')).toBeTruthy();
  expect(getByText('Advice A:')).toBeTruthy();
  expect(getByText('Main Category:')).toBeTruthy();
  expect(getByText('Main Street:')).toBeTruthy();
  expect(getByText('Cross Street:')).toBeTruthy();
  expect(getByText('Affected Direction:')).toBeTruthy();
});
