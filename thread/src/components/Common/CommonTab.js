import React from 'react';
import {Container} from 'native-base';


const CommonContainer = (props) => (

  <Tab activeTabStyle={{backgroundColor:'#66bb6a'}}
    activeTextStyle={{color:'white'}}
    tabStyle={{backgroundColor:'#66bb6a'}}
    textStyle={{color: 'white'}} heading="Contacts" children={<Contacts />} />
);


export default CommonContainer;
