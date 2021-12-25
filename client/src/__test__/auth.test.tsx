import Auth from '../components/auth/auth';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

describe('Auth', () => {
  jest.mock('../actions/auth');
  it('renders without crashing', () => {
    const store = createStore(reducers, compose(applyMiddleware(thunk)));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );
  });

  describe('when user clicks the button Sign up', () => {
    it('should navigate to /profile-settings', () => {
      const store = createStore(reducers, compose(applyMiddleware(thunk)));
      const { getByText } = render(
        <Provider store={store}>
          <BrowserRouter>
            <Auth />
          </BrowserRouter>
        </Provider>
      );
      const button = getByText('Sign up');
      fireEvent.click(button);
      setTimeout(() => {
        expect(window.location.pathname).toBe('/profile-settings');
      }, 2100);
    });
  });
  describe('when user clicks the button Sign in', () => {
    it('should navigate to /', () => {
      const store = createStore(reducers, compose(applyMiddleware(thunk)));
      const { getByText } = render(
        <Provider store={store}>
          <BrowserRouter>
            <Auth />
          </BrowserRouter>
        </Provider>
      );
      const button = getByText('Sign in');
      fireEvent.click(button);
      setTimeout(() => {
        expect(window.location.pathname).toBe('/');
      }, 2100);
    });
  });
});
