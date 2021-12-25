import Groups from '../components/social/groups/groups';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import db from './dbmock';
import { render, screen } from './test-utils';
import { BrowserRouter } from 'react-router-dom';

describe('Groups', () => {
  it('renders without crashing', () => {
    const preloadedState = db;
    render(
      <BrowserRouter>
        <Groups />
      </BrowserRouter>
    );
  });
  describe('if user has Groups', () => {
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
          <Groups />
        </BrowserRouter>
      );
    });
    it('renders Groups', () => {
      expect(screen.getByText(/Create/i)).toBeInTheDocument();
    });
  });
  describe('if user has no Groups', () => {
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
          <Groups />
        </BrowserRouter>
      );
    });
    it('dont render Groups', () => {
      expect(screen.queryByText(/Rolo/i)).not.toBeInTheDocument();
    });
  });
});
