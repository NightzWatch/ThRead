import React from 'react';
import { Container, Header, Content, Button, Text, Tabs, Tab, ScrollableTab } from 'native-base';

import Contacts from './Contacts';
import RequestsReceived from './RequestsReceived';
import RequestsSent from './RequestsSent';

const ContactTabs = () => {
	return (
		<Container>
			<Tabs renderTabBar={()=> <ScrollableTab />}>
				<Tab heading="Contacts">
					<Contacts />
				</Tab>
				<Tab heading="Requests Received">
					<RequestsReceived />
				</Tab>
				<Tab heading="Requests Sent">
					<RequestsSent />
				</Tab>
			</Tabs>
		</Container>
	);
}

export default ContactTabs;
