import React from 'react';
import styled from "styled-components";
import {Text} from 'native-base';

const TermsTextStyle = styled(Text)`
  font-size:14px;
  text-align:center;
  color:white;
  margin-top:20px;
`;

const CommonText = ({text, secondaryText}) => (
	<TermsTextStyle>
		{text}
		
		{secondaryText}
	</TermsTextStyle>
);

export default CommonText;
