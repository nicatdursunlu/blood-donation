import { Icon, IndexPath, Select, SelectItem } from '@ui-kitten/components'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { Alert, StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useState, useEffect, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LatLng } from 'react-native-maps'
import * as Location from 'expo-location'

import { CustomBtn, MapModal, Field, TCustomText } from '@/components'
import { BottomTabsParams } from '@/navigation/BottomTabs'
import { addPost } from '@/services/post.service'
import { TCreatePost } from '@/types/post.type'
import { useAppSelector } from '@/store/hooks'
import { getWidthByPercents } from '@/utils'
import { CustomTheme } from '@/styles/theme'
import { BLOOD_TYPES } from '@/utils/dummy'
import { Container } from '@/commons'

type CreatePostScreenProps = BottomTabScreenProps<
  BottomTabsParams,
  'CreatePost'
>

export const CreatePostScreen: FC<CreatePostScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { colors } = useTheme() as CustomTheme

  const { user } = useAppSelector((state) => state.auth)

  const [loading, setLoading] = useState<boolean>(false)
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  )
  const [fields, setFields] = useState<TCreatePost>({
    description: '',
    phoneNumber: '',
    bloodType: '',
    coordinates: [],
    location: '',
    userId: '',
    authorFullName: '',
  } as TCreatePost)

  const initialRegion = {
    latitude: location?.coords?.latitude!,
    longitude: location?.coords?.longitude!,
    latitudeDelta: 52.22901405521079,
    longitudeDelta: 20.997697038300334,
  }

  // GETTING PERMISSION FOR LOCATION
  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
      } else setErrorMsg(null)

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })
      setLocation(location)
    })()
  }, [])

  // SETTING FIELDS ACCORDING TO NAME
  const fieldsChangeHandler = (name: keyof TCreatePost, value: string) => {
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }))
  }

  // OPENING MAP IN ORDER TO WE GET LOCATION OR NOT
  const openMap = () => {
    console.log('location?.coords?.latitude', !!location?.coords?.latitude)
    if (!!location?.coords?.latitude) {
    }
    setIsMapOpen(true)
  }

  // ADDING POST TO DATABASE
  const onSubmit = () => {
    try {
      setLoading(true)
      const { uid: userId, fullName: authorFullName } = user
      addPost({ ...fields, userId, authorFullName })

      navigation.navigate('Home')
    } catch (error: any) {
      Alert.alert(error.code, error.message)
      console.log(error.code, error.message)
    } finally {
      setLoading(false)
    }
  }

  //GETTING LOCATION NAME BY COORDINATES AND SET LOCATION
  const getLocationName = async ({ latitude, longitude }: LatLng) => {
    const answer: Location.LocationGeocodedAddress[] =
      await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      })

    if (!!answer.length) {
      const locObj = answer[0] as { [key: string]: any }
      const location: string[] = []

      for (const key in locObj) {
        if (locObj[key] !== null && locObj[key] !== 'Unnamed Road') {
          location.push(locObj[key])
        }
      }

      setFields((field) => ({
        ...field,
        location: location.join(),
      }))
    }
  }

  const handleSelectBloodType = (index: IndexPath | IndexPath[]) => {
    if (index instanceof IndexPath) {
      setSelectedIndex(index)
      setFields((fields) => ({ ...fields, bloodType: BLOOD_TYPES[index.row] }))
    } else if (Array.isArray(index) && index[0] instanceof IndexPath) {
      setSelectedIndex(index[0])
      setFields((fields) => ({
        ...fields,
        bloodType: BLOOD_TYPES[index[0].row],
      }))
    }
  }

  const onSaveMapDetails = (coordinates: LatLng) => {
    getLocationName(coordinates)
    setFields((field) => ({
      ...field,
      coordinates: [coordinates.latitude, coordinates.longitude],
    }))
    setIsMapOpen(false)
  }

  return (
    <Container>
      <Select
        label={t('select_blood')}
        placeholder={t('select_blood')}
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          handleSelectBloodType(index)
        }}
        style={styles.select}
        value={BLOOD_TYPES[selectedIndex.row]}
      >
        {BLOOD_TYPES.map((type) => (
          <SelectItem key={type} title={type} />
        ))}
      </Select>
      <View style={styles.body}>
        <Field
          value={fields.phoneNumber}
          label="add_number"
          placeholder="example"
          style={styles.field}
          onChangeText={(val) => fieldsChangeHandler('phoneNumber', val)}
        />
        <Field
          placeholder="add_location"
          value={fields.location}
          disabled={true}
          accessoryRight={() => (
            <Icon
              name="arrow-forward"
              pack="ion"
              onPress={openMap}
              style={[styles.icon, { color: colors.inputText }]}
            />
          )}
        />
        <Field
          label="Description"
          multiline={true}
          textStyle={{ minHeight: 110 }}
          placeholder="tell_more"
          onChangeText={(val: string) =>
            fieldsChangeHandler('description', val)
          }
        />
        <CustomBtn
          title="post"
          loading={loading}
          onPress={onSubmit}
          style={{ borderWidth: 0 }}
          width={getWidthByPercents(80, 2)}
        />
      </View>
      <MapModal
        visible={isMapOpen}
        onSave={(coordinates) => onSaveMapDetails(coordinates)}
        initialRegion={initialRegion}
        close={() => setIsMapOpen(false)}
      />
      {errorMsg && <TCustomText>{errorMsg}</TCustomText>}
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    zIndex: -1,
    width: '100%',
    alignItems: 'center',
  },
  field: {
    marginBottom: 20,
  },
  select: {
    width: '100%',
    marginBottom: 20,
  },
  icon: {
    height: 18,
    marginRight: 12,
  },
})
