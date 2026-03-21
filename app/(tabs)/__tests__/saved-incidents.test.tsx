import { render } from '@testing-library/react-native';
import SavedIncidentsPage from '../home/saved-incidents';

test('renders saved incidents page title', () => {
  const { getByText } = render(<SavedIncidentsPage />);

  expect(getByText('My Saved Incidents')).toBeTruthy();
});
