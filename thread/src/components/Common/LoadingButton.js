import React from 'react';
import { Button, Spinner, Text } from 'native-base';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    ${props => props.noMargin ? '' : 'margin-top: 20px;'}
`;

const LoadingButton = ({ loading, text, onPress, noMargin = false }) => {
    if (loading) {
        return (
            <StyledButton disabled full rounded noMargin={noMargin}>
                <Spinner size="small" color="#fff" />
            </StyledButton>
        );
    }

    return (
        <StyledButton light full rounded onPress={onPress} noMargin={noMargin}>
            <Text>{text}</Text>
        </StyledButton>
    );
};

export default LoadingButton;
