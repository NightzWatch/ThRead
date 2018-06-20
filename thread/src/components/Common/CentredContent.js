import React from 'react';
import { Content } from 'native-base';

const CentredContent = (props) => (
    <Content 
        contentContainerStyle={{ 
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        {...props}
    />
);

export default CentredContent;
