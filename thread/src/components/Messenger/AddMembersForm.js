import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast, Spinner, ListItem, CheckBox, Body, List } from 'native-base';
import { LoadingButton, CommonContainer } from '../Common';
import { Actions } from 'react-native-router-flux';
import {StyleSheet} from 'react-native';

class AddMembersForm extends Component {
    state = {
        button_loading: false,
        added_contacts: []
    }

    onAddButtonPress = () => {
        this.setState({
            button_loading: true
        });

        this.state.added_contacts.forEach(userId => {
            this.props.chatUser
                .addUserToRoom({
                    userId,
                    roomId: this.props.roomId
                })
                .then(response => {
                    console.log(`Added ${userId} to room ${this.props.roomId}`);
                })
                .catch(err => {
                    console.log(`Error adding ${userId} to room ${this.props.roomId}: ${err}`);
                });
        });

        Actions.pop();

        return Toast.show({
            text: 'Users added successfully',
            position: 'bottom',
            buttonText: ''
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

    search(keyValue, array){
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === keyValue) {
                return array[i];
            }
        }

        return null;
    }

    isUserMember(userID) {
        var weFoundSomeoneThatLikesCats = this.search(userID, this.props.users);

        return weFoundSomeoneThatLikesCats ? true : false;
    }

    renderNote(isMember) {
        if (isMember) {
            return <Text note>Is already member of the ThRead</Text>;
        }
    }

    renderContacts() {
        if (this.props.loading) {
            return <Spinner color="blue" />;
        }

  const listItems = this.props.contact_list.map((d) => {
      const isMember = this.isUserMember(d.id);
      const isChecked = isMember ? true : this.state.added_contacts.indexOf(d.id) !== -1;
      const color = isMember ? 'blue' : '';

      return (
          <ListItem key={d.id}>
              <CheckBox checked={isChecked} disabled={isMember} color={color} onPress={() => {
                  this.onCheckboxPress(d);
              }} />
              <Body>
                  <Text>{d.first_name} {d.last_name}</Text>
                  {this.renderNote(isMember)}
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
			<CommonContainer>
				<Content>
					{this.renderContacts()}
          <LoadingButton
            loading={this.props.loading}
            style={styles.buttonStyle}
            onPress={this.onAddButtonPress}
            text="Add New Members"
            rounded
            full
          />
				</Content>
			</CommonContainer>
		);
	}
}

let styles = StyleSheet.create({
      buttonStyle: {
         marginTop: 25,
      }
  })

const mapStateToProps = ({ auth, contacts }) => {
    const { chatUser } = auth;
    const { contact_list, loading } = contacts;

    return { chatUser, contact_list, loading };
};

export default connect(mapStateToProps, {})(AddMembersForm);
