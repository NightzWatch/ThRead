import React from 'react';
import { Button, Spinner, Text } from 'native-base';

const LoadingButton = ({ loading, style, text, onPress}) => {
    if (loading) {
        return (
            <Button disabled full rounded style={style}>
                <Spinner size="small" color="#fff" />
            </Button>
        );
    }

    return (
        <Button light full rounded style={style} onPress={onPress}>
            <Text>{text}</Text>
        </Button>
    );
};

export default LoadingButton;
