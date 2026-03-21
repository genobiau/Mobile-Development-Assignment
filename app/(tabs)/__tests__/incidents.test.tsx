import { fireEvent, render } from '@testing-library/react-native';
import { Button } from 'react-native';
import IncidentsPage from '../home/incidents';

test('renders incidents page title', () => {
  const { getByText } = render(<IncidentsPage />);
  expect(getByText('NSW Traffic Incidents')).toBeTruthy();
});

test('calls onPress when Save Incident is clicked', () => {
  const onPressMock = jest.fn();

  const { getByText } = render(
    <Button title="Save Incident" onPress={onPressMock} />,
  );

  fireEvent.press(getByText('Save Incident'));
  expect(onPressMock).toHaveBeenCalled();
});
