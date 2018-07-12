import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

jest.mock('../App', () => {
    const RealComponent = require.requireActual('../App');
    const React = require('React');

    class AppNavigator extends React.Component {
        render() {
            return React.createElement('AppNavigator', this.props, this.props.children);
        }
    }

    AppNavigator.propTypes = RealComponent.propTypes;

    return AppNavigator;
});

it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
});
