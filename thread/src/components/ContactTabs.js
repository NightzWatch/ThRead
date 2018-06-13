import React from 'react';
import { Container, Header, Content, Button, Text, Tabs, Tab, ScrollableTab } from 'native-base';

import Contacts from './Contacts';
import RequestsReceived from './RequestsReceived';
import RequestsSent from './RequestsSent';

const ContactTabs = () => (
  <Container>
    <Tabs renderTabBar={()=> <ScrollableTab />}>
      <Tab activeTabStyle={{backgroundColor:'#8bc34a'}} activeTextStyle={{color:'white'}} tabStyle={{backgroundColor:'#8bc34a'}} textStyle={{color: 'white'}} heading="Contacts" children={<Contacts />} />
      <Tab activeTabStyle={{backgroundColor:'#8bc34a'}} activeTextStyle={{color:'white'}} tabStyle={{backgroundColor:'#8bc34a'}} textStyle={{color: 'white'}} heading="Requests Received" children={<RequestsReceived />} />
      <Tab activeTabStyle={{backgroundColor:'#8bc34a'}} activeTextStyle={{color:'white'}} tabStyle={{backgroundColor:'#8bc34a'}} textStyle={{color: 'white'}} heading="Requests Sent" children={<RequestsSent />} />
    </Tabs>
  </Container>
);

export default ContactTabs;
