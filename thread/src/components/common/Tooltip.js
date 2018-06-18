import React from 'react';
import { Label } from 'native-base';

const Tooltip = ({ visible, tooltip }) => {
    return (
        <Label
            visible={visible}
            style={visible ? styles.visibleTooltip : styles.invisibleTooltip}>{tooltip}
        </Label>
    );
};

export { Tooltip };

const styles = {
    visibleTooltip: {
        paddingTop: 5,
        height: 'auto',
        textAlign: 'center',
        position: 'relative',
        flexDirection: 'row',
        flex: 1,
        fontSize: 15,
        color: 'red'
    },

    invisibleTooltip: {
        height: 0,
        textAlign: 'center'
    }
}