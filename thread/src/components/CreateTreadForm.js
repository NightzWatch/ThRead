import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast, Spinner, ListItem, CheckBox, Body, List } from 'native-base';
import { LoadingButton } from './Common';
import { Actions } from 'react-native-router-flux';

class CreateTreadForm extends Component {
	state = {
		room_name: '',
		create_button_loading: false,
		added_contacts: []
	}

	onRoomNameChange = (text) => {
		this.setState({
			room_name: text
		});
	}

	createThread = () => {
		if (!this.state.room_name) {
			return Toast.show({
				text: 'ThRead name cannot be empty!',
				position: 'bottom',
				buttonText: ''
			});
		}

		this.setState({ create_button_loading: true });

		this.props.chatUser.createRoom({
			name: this.state.room_name,
			private: true,
			addUserIds: this.state.added_contacts
		}).then(room => {
			console.log(`Created room called ${room.name}`);
			Actions.pop();
		})
		.catch(err => {
			console.log(`Error creating room ${err}`)
			this.setState({ create_button_loading: false });
		});
	}

	onCheckboxPress(item) {
		const added_index = this.state.added_contacts.indexOf(item.id);

		if (added_index === -1) {
			this.setState({
				added_contacts: [
					...this.state.added_contacts,
					item.id
				]
			});
		} else {
			const cloneArray = [...this.state.added_contacts];
			cloneArray.splice(added_index, 1);
			this.setState({
				added_contacts: cloneArray
			});
		}
	}

	renderContacts() {
		if (this.props.loading) {
			return <Spinner color="blue" />;
		}

		const listItems = this.props.contact_list.map((d) => {
			const isChecked = this.state.added_contacts.indexOf(d.id) !== -1;

			return (
				<ListItem key={d.id}>
					<CheckBox checked={isChecked} onPress={() => {
						this.onCheckboxPress(d);
					}} />
					<Body>
						<Text>{d.first_name} {d.last_name}</Text>
					</Body>
				</ListItem>
			);
		});

		return (
			<List>
				{listItems}
			</List>
		);
	}

	render() {
		return (
			<Container>
				<Content>
					<Form>
						<Item stackedLabel>
							<Label>ThRead Name</Label>
							<Input onChangeText={this.onRoomNameChange} />
						</Item>
					</Form>
					{this.renderContacts()}
					<LoadingButton
						loading={this.state.create_button_loading}
						style={{ marginTop: 50 }}
						onPress={this.createThread}
						text="Create ThRead"
					/>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ auth, contacts }) => {
	const { chatUser } = auth;
	const { contact_list, loading } = contacts;

	return { chatUser, contact_list, loading };
};

export default connect(mapStateToProps, {})(CreateTreadForm);
