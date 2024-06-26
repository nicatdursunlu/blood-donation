import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Image } from 'react-native-elements'
import { FC } from 'react'

import { AvatarMaker, CustomBtn, CustomText, TCustomText } from '@/components'
import { useAppSelector } from '@/store/hooks'
import { CustomTheme } from '@/styles/theme'
import { ProfileScreenProps } from '..'
import { generateChatId } from '@/utils/helper'

export const UserInfo: FC<ProfileScreenProps> = ({ navigation, route }) => {
  const { colors } = useTheme() as CustomTheme

  const { user } = useAppSelector((state) => state.auth)

  const { fullName, bloodType, photo, uid } = user

  const isMyProfile = !route.params?.authorId

  const btnColor = {
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBG,
  }

  const editProfile = () => {
    navigation.navigate('EditProfile')
  }

  const goToChatsScreen = () => {
    navigation.navigate('SingleChat', {
      chatId: generateChatId(uid, route.params?.authorId!),
      authorFullName: route?.params?.authorFullName!,
      authorPhoto: route?.params?.authorPhoto!,
    })
  }

  const onPressHandler = () => {
    if (isMyProfile) editProfile()
    else goToChatsScreen()
  }

  //  const onPressHandler = () => {
  //    if (!!profileType)
  //      navigation.navigate('SingleChat', {
  //        companion_name: otherProfile.fullname,
  //        companion_img: otherProfile.photo,
  //        chatID: generateChatID(userID, otherProfile.userID),
  //        companion_id: otherProfile.userID,
  //      })
  //    else navigation.navigate('Edit Profile')
  //  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.image}>
          {photo ? (
            <Image
              style={styles.img}
              source={{ uri: photo }}
              PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={{ backgroundColor: '#f2f4f8' }}
            />
          ) : (
            <View style={styles.img}>
              <AvatarMaker fullName={fullName} height={40} />
            </View>
          )}
        </View>
        <View style={styles.info}>
          <CustomText weight="bold" style={styles.value}>
            {bloodType || '?'}
          </CustomText>
          <TCustomText style={styles.text}>blood_type</TCustomText>
        </View>
      </View>
      <CustomText weight="bold" style={styles.name}>
        {fullName}
      </CustomText>

      <CustomBtn
        width="100%"
        title={isMyProfile ? 'edit_profile' : 'send_message'}
        titleStyle={{ ...styles.btnText, ...{ color: colors.text } }}
        onPress={onPressHandler}
        style={{ ...styles.btn, ...btnColor }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '35%',
    alignItems: 'flex-start',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 18,
    marginVertical: 10,
  },
  info: {
    alignItems: 'center',
    width: '65%',
    justifyContent: 'center',
  },
  value: {
    fontSize: 20,
    color: '#ff6767',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 13,
  },
  btn: {
    height: 34,
    borderWidth: 1,
  },
  btnText: {
    textTransform: 'none',
    fontSize: 15,
  },
})
