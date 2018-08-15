import React from 'react';
import styled from "styled-components";
import {Text} from 'native-base';

const TermsButtonStyle = styled(Text)`
  font-size:14px;
  text-align:center;
  color:blue;
  text-decoration:underline;
  margin-top:10px;
`;

const CommonHyperlink = ({onPress, text}) => (
	<TermsButtonStyle>
		{text}
		{onPress}
	</TermsButtonStyle>
);

export default CommonHyperlink;
