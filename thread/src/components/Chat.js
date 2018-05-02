import React, { Component }  from 'react';
import { GiftedChat, Actions, SystemMessage, Send } from 'react-native-gifted-chat';
import { View, Button, Icon } from 'native-base';
import { connect } from 'react-redux';

class Chat extends Component {
	state = {
		messages: [],
	}

	constructor(props) {
		super(props);

		props.chatUser.subscribeToRoom({
			roomId: props.roomID,
			hooks: {
				onNewMessage: message => {
					const isGif = this.checkMessageIsGif(message.text);
					const messageText = isGif ? '' : message.text;

					const messages = [{
						_id: message.id,
						text: messageText,
						createdAt: new Date(message.createdAt),
						user: {
							_id: message.sender.id,
							name: message.sender.name,
							avatar: message.sender.avatarURL,
						}
					}];

					if (isGif) {
						messages[0].image = message.text;
					}

					this.setState(previousState => ({
						messages: GiftedChat.append(previousState.messages, messages),
					}));
				}
			},
			messageLimit: 100
		});
	}

	// TODO: ADD FUNCTIONALITY TO FETCH OLD MESSAGES
	fetchOlderMessages(lastMessageID) {
		this.props.chatUser.fetchMessages({
			roomId: this.props.roomID,
			direction: 'older',
			limit: 10,
			initialId: lastMessageID
		})
		.then(messages => {
			console.log('messages', messages);
		})
		.catch(err => {
			console.log(`Error fetching messages: ${err}`);
		});
	}

	checkMessageIsGif(text) {
		const allowedContentTypes = ['.gif', '.png', '.jpg', '.jpeg'];

		return allowedContentTypes.indexOf(text.slice(-4)) !== -1;
	}

	getCatGif() {
		const cat = [
			'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
			'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
			'https://media.giphy.com/media/xBAreNGk5DapO/giphy.gif',
			'https://media.giphy.com/media/l1J3pT7PfLgSRMnFC/giphy.gif',
			'https://media.giphy.com/media/Nm8ZPAGOwZUQM/giphy.gif',
			'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
			'https://media.giphy.com/media/8vQSQ3cNXuDGo/giphy.gif',
			'https://media.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif',
			'https://media.giphy.com/media/VxbvpfaTTo3le/giphy.gif'
		];

		const kitten = Math.floor(Math.random() * (cat.length));

		return cat[kitten];
	}

	onSend(messages = []) {
		const message = messages[0];
		let text = message.text.trim();

		if (!text) {
			text = this.getCatGif();
		}

		this.props.chatUser.sendMessage({
			text: text,
			roomId: this.props.roomID
		})
		.then(messageId => {
			console.log(`Added message to ${this.props.title}`);
		})
		.catch(err => {
			console.log(`Error adding message to ${this.props.title}: ${err}`)
		});
	}

	renderSend(props) {
		return (
			<Send
				{...props}
				alwaysShowSend={true}
			>
				<View style={{marginRight: 10 }}>
					<Icon name='logo-octocat' style={{ fontSize: 24, color: '#007aff', marginRight: 0, marginLeft: 16 }} />
				</View>
			</Send>
		);
	}

	render() {
		return (
			<GiftedChat
				messages={this.state.messages}
				onSend={messages => this.onSend(messages)}
				user={{
					_id: this.props.user.uid,
				}}
				renderSend={this.renderSend.bind(this)}
			/>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { user, chatUser } = auth;

	return { user, chatUser };
};

export default connect(mapStateToProps, {})(Chat);
