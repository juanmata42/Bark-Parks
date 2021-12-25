import React from 'react';
import { render, screen } from './test-utils';
import App from '../App';
import '@testing-library/jest-dom';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Showing/i);
  expect(linkElement).toBeInTheDocument();
});
