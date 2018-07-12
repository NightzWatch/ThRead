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

const FooterTabs = ({ navigationState }) => {
    const { index, routes } = navigationState;

    return (
        <Footer style={{height: 27}}>
            <FooterTab style={{backgroundColor: '#66bb6a'}}>
                {routes.map(({ key }, routeIndex) => {
                    const iconName = getRouteIcon(key);
                    const active = index === routeIndex;

                    return (
                        <Button onPress={() => Actions[key]()} key={key} active={active}>
                            <Icon style={{color: '#fff'}} name={iconName} active={active} />
                        </Button>
                    );
                })}
            </FooterTab>
        </Footer>
    );
}

export default FooterTabs;
