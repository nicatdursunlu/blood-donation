import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IndexPath, Select, SelectItem } from '@ui-kitten/components'
import { Alert, StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { FC, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { CustomBtn, Field, TCustomText } from '@/components'
import { AvatarUploader } from './components/AvatarUploader'
import { updateUserInfo } from '@/store/features/authSlice'
import { AppStackParams } from '@/navigation/AppStack'
import { updateUser } from '@/services/user.service'
import { TUpdateUser } from '@/types/user.type'
import { CustomTheme } from '@/styles/theme'
import { getWidthByPercents } from '@/utils'
import { BLOOD_TYPES } from '@/utils/dummy'
import { Container } from '@/commons'

export type EditProfileScreenProps = NativeStackScreenProps<
  AppStackParams,
  'EditProfile'
>

export const EditProfileScreen: FC<EditProfileScreenProps> = ({
  navigation,
}) => {
  const width = getWidthByPercents(65, 2)
  const btnWidth = getWidthByPercents(45, 2)

  const dispatch = useAppDispatch()
  const { colors } = useTheme() as CustomTheme
  const { user } = useAppSelector((state) => state.auth)

  const { fullName, username, bloodType, uid } = user

  const initialIndex = BLOOD_TYPES.indexOf(bloodType || '')
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(initialIndex !== -1 ? initialIndex : 0)
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [fields, setFields] = useState<TUpdateUser>({
    uid,
    fullName,
    username,
    bloodType,
    photo: null,
  })

  const fieldsChangeHandler = (name: keyof TUpdateUser, value: string) =>
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }))

  const goBack = () => navigation.goBack()

  const onSubmit = async () => {
    try {
      setLoading(true)
      await updateUser(fields)
      dispatch(updateUserInfo(fields))
      goBack()
    } catch (error: any) {
      console.log('error', error.message)
      Alert.alert('Update user error', error.message)
    } finally {
      setLoading(false)
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

  return (
    <Container>
      <AvatarUploader navigation={navigation} />
      <View style={styles.row}>
        <TCustomText>fullName</TCustomText>
        <Field
          style={{ width }}
          value={fields.fullName}
          placeholder={fields.fullName}
          onChangeText={(val) => fieldsChangeHandler('fullName', val)}
        />
      </View>
      <View style={styles.row}>
        <TCustomText>username</TCustomText>
        <Field
          style={{ width }}
          value={fields.username}
          placeholder={fields.username}
          onChangeText={(val) => fieldsChangeHandler('username', val)}
        />
      </View>
      <View style={styles.row}>
        <TCustomText>blood_type</TCustomText>
        <Select
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
      </View>
      <View style={styles.actions}>
        <CustomBtn
          title="cancel"
          onPress={goBack}
          width={btnWidth}
          titleStyle={{ color: colors.secondaryText }}
          style={{ backgroundColor: colors.card }}
        />
        <CustomBtn
          title="save"
          width={btnWidth}
          loading={loading}
          onPress={onSubmit}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  row: {
    width: '100%',
    marginVertical: 7,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  actions: {
    zIndex: -2,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  select: {
    width: '67%',
  },
})
