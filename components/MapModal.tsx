import MapView, { LatLng, Marker, Region } from 'react-native-maps'
import { StyleSheet, Modal, Alert, View } from 'react-native'
import { Icon } from '@ui-kitten/components'
import { StatusBar } from 'expo-status-bar'
import { FC, useState } from 'react'

interface IMapModalProps {
  onSave: (coordinates: LatLng) => void
  close: () => void
  visible: boolean
  initialRegion: Region
  type?: any
}

export const MapModal: FC<IMapModalProps> = ({
  onSave,
  close,
  visible,
  initialRegion,
  type,
}) => {
  const isStatic = type === 'static'

  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng | null>(
    isStatic ? { ...initialRegion } : null
  )

  const saveHandler = () => {
    if (markerCoordinates) {
      onSave(markerCoordinates)
    } else {
      Alert.alert('Choose location', 'For save you need set location first')
    }
  }

  const startCoordinates = {
    ...initialRegion,
    latitude: initialRegion.latitude || 52.22901405521079,
    longitude: initialRegion.longitude || 20.997697038300334,
  }

  return (
    <Modal visible={visible} animationType="slide">
      <StatusBar hidden={true} />
      <MapView
        style={styles.map}
        initialRegion={{ ...startCoordinates }}
        onPress={(e) => {
          isStatic
            ? setMarkerCoordinates(initialRegion)
            : setMarkerCoordinates(e.nativeEvent.coordinate)
        }}
      >
        {markerCoordinates && <Marker coordinate={markerCoordinates} />}
      </MapView>
      <View style={styles.top}>
        <Icon
          name="arrow-back"
          pack="ion"
          style={styles.icon}
          onPress={close}
        />
        <Icon
          name="save"
          pack="ion"
          style={styles.icon}
          onPress={saveHandler}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  top: {
    top: 20,
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  icon: {
    color: '#000',
    height: 25,
  },
})
