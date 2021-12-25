import LocalShelters from '../components/local-shelters/local-shelters';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import db from './dbmock';
import { render, screen } from './test-utils';
import { BrowserRouter } from 'react-router-dom';

describe('LocalShelters', () => {
  it('renders without crashing', () => {
    const preloadedState = db;
    render(
      <BrowserRouter>
        <LocalShelters />
      </BrowserRouter>
    );
  });
  describe('if user has LocalShelters', () => {
    beforeEach(() => {
      let user = {
        data: {
          user: {
            _id: '61b8cd554d77630ede35c833',
          },
        },
      };
      const store = db;

      JSON.parse = jest.fn().mockReturnValue(user);
      render(
        <BrowserRouter>
          <LocalShelters />
        </BrowserRouter>
      );
    });
    it('renders LocalShelters', () => {
      expect(screen.getByText(/mail/i)).toBeInTheDocument();
    });
  });
  describe('if user has no LocalShelters', () => {
    beforeEach(() => {
      let user = {
        data: {
          user: {
            _id: '61b8cd554d77630ede35c833',
          },
        },
      };
      const preloadedState = db;
      preloadedState.user.user.LocalShelters = [];
      JSON.parse = jest.fn().mockReturnValue(user);
      render(
        <BrowserRouter>
          <LocalShelters />
        </BrowserRouter>
      );
    });
    it('dont render LocalShelters', () => {
      expect(screen.queryByText(/Italy/i)).not.toBeInTheDocument();
    });
  });
});
