import {
  View,
  Alert,
  Platform,
  StyleSheet,
  ActionSheetIOS,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { doc, writeBatch } from 'firebase/firestore'
import { useTheme } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'react-native-elements'
import { Camera } from 'expo-camera'
import { FC, useState } from 'react'

import { deleteUserPhoto, setUserPhoto } from '@/store/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { AvatarMaker, TCustomText } from '@/components'
import { db, storage } from '@/utils/firebase'
import { CustomTheme } from '@/styles/theme'
import { ModalWindow } from './ModalWindow'
import { EditProfileScreenProps } from '..'

const imagePickerOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
}

export const AvatarUploader: FC<Pick<EditProfileScreenProps, 'navigation'>> = ({
  navigation,
}) => {
  const { colors } = useTheme() as CustomTheme

  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { fullName, photo, uid } = user

  const [isEdit, setIsEdit] = useState<boolean>(false)

  const uploadPhoto = async (uri: string) => {
    try {
      const response = await fetch(uri)
      const blob = await response.blob()

      const storageRef = ref(storage, `files/${user.uid}`)
      const snapshot = await uploadBytes(storageRef, blob)
      const url = await getDownloadURL(snapshot.ref)

      const batch = writeBatch(db)

      const userRef = doc(db, 'users', uid)
      batch.update(userRef, { photo: url })
      await batch.commit()

      dispatch(setUserPhoto(url))
    } catch (error: any) {
      console.log('error', error)
      Alert.alert('Error', error.message)
    }
  }

  const selectImage = async (isCamera: boolean) => {
    try {
      const permission = await requestCameraPermission()
      if (permission) {
        let image
        if (isCamera)
          image = await ImagePicker.launchCameraAsync(imagePickerOptions)
        else
          image = await ImagePicker.launchImageLibraryAsync(imagePickerOptions)

        const { canceled, assets } = image

        if (!canceled && assets[0].uri) uploadPhoto(assets[0].uri)
      }
    } catch (error) {
      console.log('selectImageError: ', error)
    }
  }

  const takePhoto = () => {
    selectImage(true)
    setIsEdit(false)
  }

  const chooseFromGallery = () => {
    selectImage(false)
    setIsEdit(false)
  }

  const deleteHandler = async () => {
    try {
      const photoRef = ref(storage, `files/${user.uid}`)

      await deleteObject(photoRef)
      const batch = writeBatch(db)
      const userRef = doc(db, 'users', uid)
      batch.update(userRef, { photo: null })
      await batch.commit()

      dispatch(deleteUserPhoto())
      setIsEdit(false)
    } catch (error: any) {
      Alert.alert(error.code, error.message)
    }
  }

  const changePhotoHandler = () => {
    if (Platform.OS === 'android') setIsEdit(!isEdit)
    else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            'Cancel',
            'Take Photo',
            'Choose from Gallery',
            'Remove Current Photo',
          ],
          destructiveButtonIndex: 3,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) takePhoto()
          else if (buttonIndex === 2) chooseFromGallery()
          else if (buttonIndex === 3) deleteHandler()
        }
      )
    }
  }

  return (
    <View style={styles.container}>
      {photo ? (
        <Image
          source={{ uri: photo }}
          style={styles.photo}
          PlaceholderContent={<ActivityIndicator />}
          placeholderStyle={{ backgroundColor: '#f2f4f8' }}
        />
      ) : (
        <View style={styles.photo}>
          <AvatarMaker fullName={fullName} height={45} />
        </View>
      )}
      <TouchableOpacity onPress={changePhotoHandler}>
        <TCustomText style={{ ...styles.text, ...{ color: colors.link } }}>
          change_photo
        </TCustomText>
      </TouchableOpacity>
      <ModalWindow
        visible={isEdit}
        takePhoto={takePhoto}
        deleteHandler={deleteHandler}
        onBackdropPress={() => setIsEdit(false)}
        chooseFromGallery={chooseFromGallery}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 15,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 80,
  },
  text: {
    fontSize: 16,
    color: '#6979f8',
    marginVertical: 10,
  },
})

const requestCameraPermission = async () => {
  try {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') return true
    else {
      Alert.alert(
        'Access denied',
        'Go to device settings and enable access',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      )
      return false
    }
  } catch (error: any) {
    Alert.alert(error.message)
  }
}
