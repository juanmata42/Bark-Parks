import About from "../components/about/about";
import { Provider } from 'react-redux';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { render } from '@testing-library/react';

describe('About', () => {
    it('renders without crashing', () => {
        const store = createStore(reducers, compose(applyMiddleware(thunk)));
        render(
        <Provider store={store}>
            <About />
        </Provider>
        );
    });
    });
