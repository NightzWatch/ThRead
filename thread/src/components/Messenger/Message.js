import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    StyleSheet
} from 'react-native';

import { Avatar, Day, utils } from 'react-native-gifted-chat';
import Bubble from './Bubble';
import PropTypes from 'prop-types';

const { isSameUser, isSameDay } = utils;

class Message extends Component {
    
    getInnerComponentProps() {
        const { containerStyle, ...props } = this.props;

        return {
            ...props,
            position: 'left',
            isSameUser,
            isSameDay,
            renderAvatarOnTop: true
        };
    }

    renderDay() {
        if (this.props.currentMessage.createdAt) {
            const dayProps = this.getInnerComponentProps();

            if (this.props.renderDay) {
                return this.props.renderDay(dayProps);
            }

            return <Day {...dayProps} />;
        }
        
        return null;
    }

    renderBubble() {
        const bubbleProps = this.getInnerComponentProps();

        if (this.props.renderBubble) {
            return this.props.renderBubble(bubbleProps);
        }
        
        return <Bubble {...bubbleProps} />;
    }

    renderAvatar() {        
        const avatarProps = this.getInnerComponentProps();

        return (
            <Avatar
                {...avatarProps}
                imageStyle={{ left: [styles.slackAvatar, avatarProps.imageStyle] }}
            />
        );
    }

    render() {
        const marginBottom = isSameUser(this.props.currentMessage, this.props.nextMessage) ? 2 : 10;

        return (
            <View>
                {this.renderDay()}
                    <View
                        style={[
                            styles.container,
                            { marginBottom },
                            this.props.containerStyle,
                        ]}
                    >
                        {this.renderAvatar()}
                        {this.renderBubble()}
                </View>
            </View>
        );
    }
}

export default Message;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 8,
        marginRight: 0,
    },
    slackAvatar: {
        /** The bottom should roughly line up with the first line of message text. */
        height: 45,
        width: 45,
        borderRadius: 3,
    },
});

Message.defaultProps = {
    renderAvatar: undefined,
    renderBubble: null,
    renderDay: null,
    currentMessage: {},
    nextMessage: {},
    previousMessage: {},
    user: {},
    containerStyle: {}
};

Message.propTypes = {
    renderAvatar: PropTypes.func,
    renderBubble: PropTypes.func,
    renderDay: PropTypes.func,
    currentMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    user: PropTypes.object,
    containerStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    })
};
