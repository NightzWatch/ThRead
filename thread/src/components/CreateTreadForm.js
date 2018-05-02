import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { 
	chatRoomCreated
} from '../actions';

class CreateTreadForm extends Component {
	state = {
		room_name: '',
		create_button_loading: false
	}

	onRoomNameChange(text) {
		this.setState({
			room_name: text
		});
	}

	createThread() {
		console.log('ROOM NAME: ', this.state.room_name);

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
			addUserIds: []
		}).then(room => {
			console.log(`Created room called ${room.name}`);
			this.props.chatRoomCreated(room);
			Actions.pop();
		})
		.catch(err => {
			console.log(`Error creating room ${err}`)
			this.setState({ create_button_loading: false });
		})
	}

	renderCreateButton() {
		if (this.state.create_button_loading) {
			return (
				<Button disabled full style={{ marginTop: 50 }}>
					<Spinner size="small" color="#fff" />
				</Button>
			);
		}

		return (
			<Button full style={{ marginTop: 50 }} onPress={this.createThread.bind(this)}>
				<Text>Create ThRead</Text>
			</Button>
		);
	}

	render() {
		return (
			<Container style={{ backgroundColor: '#fff' }}>
				<Content>
					<Form>
						<Item stackedLabel>
							<Label>ThRead Name</Label>
							<Input onChangeText={this.onRoomNameChange.bind(this)} />
						</Item>
					</Form>
					{this.renderCreateButton()}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { chatUser } = auth;

	return { chatUser };
};

export default connect(mapStateToProps, { chatRoomCreated })(CreateTreadForm);
