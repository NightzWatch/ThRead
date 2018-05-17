import React from 'react';
import { Container, Header, Content, Button, Text, Tabs, Tab, ScrollableTab } from 'native-base';

import Contacts from './Contacts';
import RequestsReceived from './RequestsReceived';
import RequestsSent from './RequestsSent';

const ContactTabs = () => {
  return (
  	<Container>
  		<Tabs renderTabBar={()=> <ScrollableTab />}>
  			<Tab heading="Contacts" children={<Contacts />} />
  			<Tab heading="Requests Received" children={<RequestsReceived />} />
  			<Tab heading="Requests Sent" children={<RequestsSent />} />
  		</Tabs>
    </Container>
  );
}

export default ContactTabs;
