import React from 'react';
import { Button, Spinner, Text } from 'native-base';

const LoadingButton = ({ loading, style, text, onPress }) => {
    if (loading) {
        return (
            <Button disabled full style={style}>
                <Spinner size="small" color="#fff" />
            </Button>
        );
    }

    return (
        <Button full style={style} onPress={onPress}>
            <Text>{text}</Text>
        </Button>
    );
};

export default LoadingButton;
