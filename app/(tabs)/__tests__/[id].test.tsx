import { render } from '@testing-library/react-native';
import IncidentDetailsPage from '../home/[id]';

test('renders loading text on incident details page', () => {
  const { getByText } = render(<IncidentDetailsPage />);
  expect(getByText('Loading incident details...')).toBeTruthy();
});
