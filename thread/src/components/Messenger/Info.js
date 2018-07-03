import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Text, Left, Body, Thumbnail, Separator, Header, Icon, Right, Button, Title } from 'native-base';

import { Actions } from 'react-native-router-flux';

class Info extends Component {
	getMembersTitle() {
		return this.props.users.length < 2 ? 'Member' : 'Members';
	}

	renderAddMemberRow() {
		const { users, roomId } = this.props;

		return (
			<ListItem
				icon
				onPress={() => Actions.addMembersForm({ users, roomId })}
			>
				<Left>
					<Icon name="ios-person-add" />
				</Left>
				<Body>
					<Text>Add Member</Text>
				</Body>
			</ListItem>
		);
	}

	renderList() {
		const listItems = this.props.users.map(this.renderListItem);

		return listItems;
	}

	renderListItem(user) {
		const avatarURL = user.avatarURL ? user.avatarURL : 'http://cdn.onlinewebfonts.com/svg/img_568656.png'; 

		return (
			<ListItem avatar key={user.id}>
				<Left>
                	<Thumbnail source={{ uri: avatarURL }} />
              	</Left>
				<Body>
					<Text>{user.name}</Text>
					<Text note>Joined: {user.createdAt}</Text>
				</Body>
			</ListItem>
		);
	}

	render() {
		return (
			<Container>
				<Content>
					<Separator bordered>
						<Text>{this.props.users.length} {this.getMembersTitle()}</Text>
					</Separator>
					{this.renderAddMemberRow()}
					{this.renderList()}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ chatRoom }) => {
	const { createdAt, createdByUserId, id, isPrivate, name, updatedAt, users } = chatRoom;

	return { createdAt, createdByUserId, roomId: id, isPrivate, name, updatedAt, users };
};

export default connect(mapStateToProps, {})(Info);
