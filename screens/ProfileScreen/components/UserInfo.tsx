import { useTheme } from '@react-navigation/native'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { FC } from 'react'

import { AvatarMaker, CustomBtn, CustomText, TCustomText } from '@/components'
import { CustomTheme } from '@/styles/theme'
import { useAppSelector } from '@/store/hooks'

export const UserInfo: FC = ({
  photo,
  onPress,

  profileType,
}: any) => {
  const { colors } = useTheme() as CustomTheme

  const { user } = useAppSelector((state) => state.auth)

  const { fullName, bloodType } = user

  const btnColor = {
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBG,
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.image}>
          <View style={styles.img}>
            <AvatarMaker fullName={fullName} height={40} />
          </View>
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
        title={!!profileType ? 'send_message' : 'edit_profile'}
        titleStyle={{ ...styles.btnText, ...{ color: colors.text } }}
        onPress={onPress}
        // style={[styles.btn, btnColor]}
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
