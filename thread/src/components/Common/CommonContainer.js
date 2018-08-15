import React from 'react';
import { Container, Content } from 'native-base';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    background-color: ${props => props.inverse ? '#fff' : '#66bb6a'};
`;

const StyledContent = styled(Content)`
    padding-left: 20px;
    padding-right: 20px;
`;

const CommonContainer = ({ children, paddedContent = false, centerContent = false, inverse = false }) => {
    if (paddedContent) {
        return (
            <StyledContainer inverse={inverse}>
                <StyledContent children={children} contentContainerStyle={centerContent ? { alignItems: 'center' } : {}} />
            </StyledContainer>
        );
    }

    return <StyledContainer inverse={inverse} children={children} />;
};

export default CommonContainer;
