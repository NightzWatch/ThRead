import React from 'react';
import { Container, Header, Content, Button, Text, Tabs, Tab, ScrollableTab } from 'native-base';

import ContactList from './ContactList';
import RequestsReceived from './RequestsReceivedList';
import RequestsSent from './RequestsSent';

const ContactsTabs = () => (
	<Container>
		<Tabs renderTabBar={()=> <ScrollableTab />}>
			<Tab heading="Contacts" children={<ContactList />} />
			<Tab heading="Requests Received" children={<RequestsReceived />} />
			<Tab heading="Requests Sent" children={<RequestsSent />} />
		</Tabs>
	</Container>
);

export default ContactsTabs;
