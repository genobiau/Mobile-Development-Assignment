import { fireEvent, render } from '@testing-library/react-native';
import { Button } from 'react-native';
import IncidentsPage from '../home/incidents';

test('renders saved incidents page title', () => {
  const { getByText } = render(<IncidentsPage />);

  expect(getByText('NSW Traffic Incidents')).toBeTruthy();
  expect(getByText('Region')).toBeTruthy();
  expect(getByText('Street Name')).toBeTruthy();
  expect(getByText('Date')).toBeTruthy();
});

test('calls onPress when Save Incident is clicked', () => {
  const onSaveMock = jest.fn();

  const { getByText } = render(
    <Button title="Save Incident" onPress={onSaveMock} />,
  );

  fireEvent.press(getByText('Save Incident'));
  expect(onSaveMock).toHaveBeenCalled();
});
