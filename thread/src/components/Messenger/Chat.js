import React, { Component }  from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { View, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import Message from './Message';
import emojiUtils from 'emoji-utils';
import  * as actions from '../../actions';
import axios from 'axios';

class Chat extends Component {
	state = {
		messages: [],
		loadEarlier: true,
		isLoadingEarlier: true,
		typingText: null
	}

	constructor(props) {
		super(props);

		this.fetchOlderMessages();

		props.chatUser.subscribeToRoom({
			roomId: props.roomID,
			hooks: {
				onNewMessage: message => {
					this.addMessage(message);
				},
				onUserStartedTyping: user => {
					this.setState({ typingText: `${this.props.first_name} ${this.props.last_name} is typing` });
				},
				onUserStoppedTyping: user => {
					this.setState({ typingText: null });
				},
				onUserJoined: user => {
					this.props.addUserToRoom(user);
				}
			},
			messageLimit: 0
		});
	}

	componentWillUnmount() {
		try {
			this.props.chatUser.roomSubscriptions[this.props.roomID].cancel();
		} catch (err) {
			console.log('chatkit error, either connection to chat is closed or chatkit is not responding');
		}

		try {
			this.props.clearChatRoom();
		} catch (err) {
			console.log('device error with clearing redux state for current chat room');
		}
	}

	addMessage(message, newMessage = true) {
		const isGif = this.checkTextIsMediaLink(message.text);
		const messageText = isGif ? '' : message.text;

		const messages = [{
			_id: message.id,
			text: messageText,
			createdAt: new Date(message.createdAt),
			user: {
				_id: message.sender.id,
				// TODO: WE CAN SEARCH THE CONTACTS IF WE KNOW THIS PERSON TO GET THE NAME BY ID, ELSE LEAVE IT AS IT IS
				name: message.sender.name,
				avatar: message.sender.avatarURL,
			}
		}];

		if (isGif) {
			messages[0].image = message.text;
		}

		if (newMessage) {
			this.setState(previousState => ({
				messages: GiftedChat.append(previousState.messages, messages),
			}));
		} else {
			this.setState(previousState => ({
				messages: GiftedChat.prepend(previousState.messages, messages),
			}));
		}
	}

	onFetchOlderMessages = () => {
		this.setState({
			isLoadingEarlier: true
		});

		const oldestMessageIdReceived = Math.min(...this.state.messages.map(m => m._id));

		this.fetchOlderMessages(oldestMessageIdReceived);
	}

	fetchOlderMessages(oldestMessageID = false) {
		const payload = {
			roomId: this.props.roomID,
			direction: 'older',
			limit: 15
		};

		if (oldestMessageID) {
			payload.initialId = oldestMessageID;
		}

		this.props.chatUser.fetchMessages(payload)
			.then(messages => {
				messages.forEach(message => {
					if (oldestMessageID) {
						this.addMessage(message, false);
					} else {
						this.addMessage(message, true);
					}
				});

				this.setState({
					loadEarlier: (messages.length === 15),
					isLoadingEarlier: false
				});

			})
			.catch(err => {
				console.log(`Error fetching messages: ${err}`);
				this.setState({
					isLoadingEarlier: false
				});
			});
	}

	checkTextIsMediaLink(text) {
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

	onUserTyping = async cat => {
		const shavedCat = cat.trim();

		if (shavedCat) {
			try {
				await this.props.chatUser.isTypingIn({ roomId: this.props.roomID });
			} catch (error) {
				console.log(`Error sending typing indicator: ${error}`)
			}
		}
	}

	onSend = async (messages = []) => {
		const message = messages[0];
		let text = message.text.trim();
		
		if (!text) {
			text = this.getCatGif();
		}
		
		Keyboard.dismiss();

		try {
			const messageId = await this.props.chatUser.sendMessage({
				text: text,
				roomId: this.props.roomID
			});

			console.log(`Added message to ${this.props.title}, with the ID of ${messageId}`);

			const { users, first_name, last_name, chatName, roomID, isGroup } = this.props;
			const userIds = users.map(user => user.id);
			const title = isGroup ? `${first_name} ${last_name} @ ${chatName}` : `${first_name} ${last_name}`;
			const isGif = this.checkTextIsMediaLink(text);
			const messageBody = isGif ? '🐱 GIF' : text; // THIS IS TEMP, TBH WE SHOULD REALLY DO THIS ON THE SERVER
			const index = userIds.indexOf(this.props.user.uid);

			if (index > -1) {
				userIds.splice(index, 1);
			}

			await axios.post('https://us-central1-reactnative-auth-66287.cloudfunctions.net/messengerMessageNotification', {
				userIds, text: messageBody, title, roomID, isGroup
			});
		} catch (err) {
			switch (err.message) {
				case 'Request failed with status code 500':
					console.log(`Error with push notification server for room ${this.props.title}`);
					break;
				case 'Request failed with status code 408':
					console.log(`Push notification server for room ${this.props.title} timeout`);
					break;
				default:
					console.log(`Error adding message to ${this.props.title}: ${err}`);
					break;
			}
		}
	}

	renderSend = (props) => {
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

	renderMessage(props) {
		const { currentMessage: { text: currText } } = props;

		let messageTextStyle;

		/** Make "pure emoji" messages much bigger than plain text. */
		if (currText && emojiUtils.isPureEmojiString(currText)) {
			messageTextStyle = {
				fontSize: 28,
				/** Emoji get clipped if lineHeight isn't increased; make it consistent across platforms. */
				lineHeight: Platform.OS === 'android' ? 34 : 30,
			};
		}

		return (
			<Message {...props} messageTextStyle={messageTextStyle} />
		);
	}

	renderFooter = (props) => {
		if (this.state.typingText) {
			return (
				<View style={styles.footerContainer}>
					<Text style={styles.footerText}>
						{this.state.typingText}
					</Text>
				</View>
			);
		}

		return null;
	}

	render() {
		return (
			<GiftedChat
				messages={this.state.messages}
				onSend={this.onSend}
				user={{
					_id: this.props.user.uid
				}}
				renderSend={this.renderSend}
				renderMessage={this.renderMessage}
				loadEarlier={this.state.loadEarlier}
				onLoadEarlier={this.onFetchOlderMessages}
				isLoadingEarlier={this.state.isLoadingEarlier}
				renderFooter={this.renderFooter}
				onInputTextChanged={this.onUserTyping}
				alwaysShowSend={true}
				isAnimated={true}
			/>
		);
	}
}

const mapStateToProps = ({ auth, chatRoom, profile }) => {
	const { user, chatUser } = auth;
	const { id, users, name, isGroup } = chatRoom;
	const { first_name, last_name } = profile;

	return { user, users, chatUser, first_name, last_name, chatId: id, chatName: name, isGroup };
};

export default connect(mapStateToProps, actions)(Chat);


const styles = StyleSheet.create({
	footerContainer: {
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10
	},
	footerText: {
		fontSize: 14,
		color: '#aaa'
	}
});
