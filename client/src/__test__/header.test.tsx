import React from 'react';
import { render, screen } from './test-utils';
import Header from '../components/core/header/header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });
  test('renders header as it is', () => {
    expect(screen.getByText(/Bark Parks/i)).toBeInTheDocument();
  });
});
describe('When user is logged', () => {
  beforeEach(() => {
    let user = {
      data: {
        _id: '61b8cd554d77630ede35c833',
      },
    };
    const preloadedState = {
      user: { user: { _id: '61b8cd554d77630ede35c833' } },
    };
    JSON.parse = jest.fn().mockReturnValue(user);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      { preloadedState }
    );
  });
  test('renders header logged', () => {
    expect(screen.getByText(/Kennel/i)).toBeInTheDocument();
  });
});
describe('When user is not logged', () => {
  beforeEach(() => {
    const preloadedState = {
      user: { user: null },
    };
    let user = {
      data: false,
    };
    JSON.parse = jest.fn().mockReturnValue(user);
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      { preloadedState }
    );
  });
  test('renders header not logged', () => {
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
  });
});
