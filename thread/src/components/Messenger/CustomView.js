import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

export default function CustomView(props) {
    const regex = /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/gm;

    if (regex.test(props.currentMessage.text)) {
        const [latitude, longitude] = props.currentMessage.text.split(',');

        return (
            <View style={props.containerStyle}>
                <MapView
                provider={PROVIDER_GOOGLE}
                style={[styles.mapView]}
                region={{
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                >
                <MapView.Marker
                    coordinate={{
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude)
                    }}
                    children={<Icon name='logo-octocat' />}
                />
                </MapView>
            </View>
        );
    }

    return null;
}