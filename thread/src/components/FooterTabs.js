import React from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

const getRouteIcon = (name) => {
    switch (name) {
        case 'contacts':
            return 'people';
        case 'threads':
            return 'logo-octocat';
        case 'profile':
            return 'ios-settings';
    }
};

const FooterTabs = (props) => {
    const { index, routes } = props.navigationState;

    return (
        <Footer>
            <FooterTab>
                {routes.map(({ key }, routeIndex) => {
                    const iconName = getRouteIcon(key);
                    const active = index === routeIndex;

                    return (
                        <Button onPress={() => Actions[key]()} key={key} active={active}>
                            <Icon name={iconName} active={active} />
                        </Button>
                    );
                })}
            </FooterTab>
        </Footer>
    );
}

export default FooterTabs;
