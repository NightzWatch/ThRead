import React, { Component }  from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import { GiftedChat, Actions, SystemMessage, Send } from 'react-native-gifted-chat';
import { View, Button, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import Message from './Message';
import emojiUtils from 'emoji-utils';

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
					this.setState({ typingText: `${user.name} is typing` });
				},
				onUserStoppedTyping: user => {
					this.setState({ typingText: null });
				}
		},
			messageLimit: 0
		});
	}

	addMessage(message, newMessage = true) {
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

	onFetchOlderMessages() {
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

	onUserTyping(text) {
		const shavedCat = text.trim();

		if (shavedCat) {
			this.props.chatUser.isTypingIn({ roomId: this.props.roomID })
				.then(() => {
					console.log('Success!')
				})
				.catch(err => {
					console.log(`Error sending typing indicator: ${err}`)
				});
		}
	}

	onSend(messages = []) {
		const message = messages[0];
		let text = message.text.trim();

		if (!text) {
			text = this.getCatGif();
		}

		Keyboard.dismiss();

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

	renderFooter(props) {
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
				onSend={messages => this.onSend(messages)}
				user={{
					_id: this.props.user.uid
				}}
				renderSend={this.renderSend.bind(this)}	
				renderMessage={this.renderMessage}
				alwaysShowSend={true}
				loadEarlier={this.state.loadEarlier}
				onLoadEarlier={this.onFetchOlderMessages.bind(this)}
				isLoadingEarlier={this.state.isLoadingEarlier}
				renderFooter={this.renderFooter.bind(this)}
				onInputTextChanged={this.onUserTyping.bind(this)}
			/>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { user, chatUser } = auth;

	return { user, chatUser };
};

export default connect(mapStateToProps, {})(Chat);


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
