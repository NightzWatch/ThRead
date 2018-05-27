import React from 'react';
import { Spinner } from 'native-base';
import CentredContent from './CentredContent';

const ContentSpinner = ({ color }) => (
	<CentredContent>
        <Spinner color={color} />
    </CentredContent>
);

export default ContentSpinner;
