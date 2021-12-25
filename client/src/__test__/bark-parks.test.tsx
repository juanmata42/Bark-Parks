import BarkParks from '../components/bark-parks/bark-parks';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { render, screen } from './test-utils';
import { BrowserRouter } from 'react-router-dom';
import db from './dbmock';

describe('BarkParks', () => {
  it('renders without crashing', () => {
    const store = createStore(reducers, compose(applyMiddleware(thunk)));
    render(
      <BrowserRouter>
        <BarkParks />
      </BrowserRouter>
    );
  });
  describe('if user is logged', () => {
    beforeEach(() => {
      let user = {
        data: {
          user: {
            _id: '61b8cd554d77630ede35c833',
          },
        },
      };
      const preloadedState = db;
      JSON.parse = jest.fn().mockReturnValue(user);
      render(
        <BrowserRouter>
          <BarkParks />
        </BrowserRouter>
      );
    });
    it('renders form', () => {
      expect(screen.getByText(/Add Dog Spot/i)).toBeInTheDocument();
    });
  });
  describe('if user is not logged', () => {
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
          <BarkParks />
        </BrowserRouter>
      );
    });
    it('dont render form', () => {
      expect(screen.queryByText(/Add Dog Spot/i)).not.toBeInTheDocument();
    });
  });
});
