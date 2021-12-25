import Friends from '../components/social/friends/friends';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import db from './dbmock';
import { render, screen } from './test-utils';
import { BrowserRouter } from 'react-router-dom';

describe('Friends', () => {
  it('renders without crashing', () => {
    const preloadedState = db;
    render(
      <BrowserRouter>
        <Friends />
      </BrowserRouter>
    );
  });
  describe('if user has friends', () => {
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
            <Friends />
          </BrowserRouter>
      );
    });
    it('renders friends', () => {
      expect(screen.getByText(/Add/i)).toBeInTheDocument();
    });
  });
  describe('if user has no friends', () => {
    beforeEach(() => {
      let user = {
        data: {
          user: {
            _id: '61b8cd554d77630ede35c833',
          },
        },
      };
      const preloadedState = db;
      preloadedState.user.user.friends = [];
      JSON.parse = jest.fn().mockReturnValue(user);
      render(
        <BrowserRouter>
          <Friends />
        </BrowserRouter>
      );
    });
    it('dont render friends', () => {
      expect(screen.queryByText(/Rolo/i)).not.toBeInTheDocument();
    });
  });
});
