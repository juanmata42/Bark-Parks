import ProfileSettings from '../components/local-shelters/local-shelters';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import db from './dbmock';
import { render, screen } from './test-utils';
import { BrowserRouter } from 'react-router-dom';

describe('ProfileSettings', () => {
  it('renders without crashing', () => {
    const preloadedState = db;
    render(
      <BrowserRouter>
        <ProfileSettings />
      </BrowserRouter>
    );
  });
  describe('if user has ProfileSettings', () => {
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
          <ProfileSettings />
        </BrowserRouter>
      );
    });
    it('renders ProfileSettings', () => {
      expect(screen.getByText(/mail/i)).toBeInTheDocument();
    });
  });
  describe('if user has no ProfileSettings', () => {
    beforeEach(() => {
      let user = {
        data: null,
      };
      const preloadedState = db;
      JSON.parse = jest.fn().mockReturnValue(user);
      render(
        <BrowserRouter>
          <ProfileSettings />
        </BrowserRouter>
      );
    });
    it('dont render ProfileSettings', () => {
      expect(screen.queryByText(/ERROR/i)).not.toBeInTheDocument();
    });
  });
});
