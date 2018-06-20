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

/*renderSubmitButton() {
    if (this.props.loading) {
        return (
            <Button full disabled style={{ marginTop: 25 }}>
                <Spinner size="small" color="#fff" />
                <Text>Resetting Password</Text>
            </Button>
        );
    }

    return (
        <Button rounded style={styles.buttonStyle} onPress={this.onSubmitPress.bind(this)}>
            <Text>Reset password</Text>
        </Button>
    );
}*/
