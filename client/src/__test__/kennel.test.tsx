import Kennel from '../components/kennel/kennel';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import db from './dbmock';
import { render, screen } from './test-utils';
import { BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';

describe('Kennel', () => {
  it('renders without crashing', () => {
    const preloadedState = db;
    render(
      <BrowserRouter>
        <Kennel />
      </BrowserRouter>
    );
  });
  describe('if user has posts', () => {
    const store = db;
    /*  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch'); */
    jest.mock('react-redux', () => ({
      useSelector: jest.fn(),
      useDispatch: jest.fn(),
    }));
    beforeEach(() => {
      let user = {
        data: {
          user: {
            _id: '61b8cd554d77630ede35c833',
          },
        },
      };
      /* useSelectorMock.mockClear();
      useDispatchMock.mockClear(); */
      JSON.parse = jest.fn().mockReturnValue(user);
      render(
        <BrowserRouter>
          <Kennel />
        </BrowserRouter>
      );
    });
    it('renders Kennel posts', () => {
      /* useSelectorMock.mockReturnValue({
        store,
      }); */
      expect(screen.queryByText(/You/i)).toBeInTheDocument();
    });
  });
  describe('if user has no posts', () => {
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
          <Kennel />
        </BrowserRouter>
      );
    });
    it('dont render Kennel', () => {
      expect(screen.queryByText(/Rolo/i)).not.toBeInTheDocument();
    });
  });
});
