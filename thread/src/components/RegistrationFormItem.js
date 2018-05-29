import React, { Component } from 'react';
import { Item, Icon, Label, View } from 'native-base';

import { Input, Tooltip } from './common'

class FromItem extends Component {

    state = { visible: false }

    render() {
        const { visibleTooltip, invisibleTooltip, view } = styles;
        const { secure, tooltip, onChangeText, label } = this.props;

        return(
            <View style={view}>
                <Item>
                    <Label>{label}</Label>
                    <Input
                        onChangeText={onChangeText}
                        secureTextEntry={secure}
                    />
                    <Icon name="help" onPress={() => this.setState({ visible: !this.state.visible })}/>
                </Item>
                <Tooltip
                    tooltip={tooltip}
                    visible={this.state.visible}
                />
            </View>
            )
        };
    }
export default FromItem;

const styles = {

    view: {
        marginLeft: 5,
        marginRight: 5,        
    }
}
