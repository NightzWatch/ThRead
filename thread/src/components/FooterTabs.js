import React from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {StyleSheet} from 'react-native';

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
        <Footer>
            <FooterTab style={styles.footerStyle}>
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

const styles = StyleSheet.create({

    footerStyle: {
          position: 'absolute',
       flex:0.1,
       left: 0,
       right: 0,
       bottom: -10,
       backgroundColor:'green',
       flexDirection:'row',
       height:80,
       alignItems:'center',
  }


})

export default FooterTabs;
