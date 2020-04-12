import React from 'react';
import { render } from '@testing-library/react';
import MapViewer from './MapViewer';

test('renders MapViewer', () => {
  const { getByText } = render(<MapViewer />);
  //const linkElement = getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
