import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, Image, StyleSheet, ImageBackground } from 'react-native'
import Swiper from 'react-native-swiper'
import { FC } from 'react'

import { TCustomText, CustomBtn, Link } from 'components'
import { getWidthByPercents } from 'utils/calculate-width'
import { AuthStackParams } from 'navigation/AuthStack'
import { SLIDER_IMAGES } from 'utils/dummy'
import { IMAGES } from 'styles/images'

type WelcomeScreenProps = NativeStackScreenProps<AuthStackParams, 'Welcome'>

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground style={styles.body} source={IMAGES.footer}>
      <Swiper autoplay={true}>
        {SLIDER_IMAGES.map((image) => (
          <Image key={image.uri} source={image.uri} style={styles.img} />
        ))}
      </Swiper>
      <View style={styles.actions}>
        <CustomBtn
          title="start"
          style={{ borderWidth: 0 }}
          width={getWidthByPercents(80, 2)}
          onPress={() => navigation.push('SignUp')}
        />
        <View style={styles.row}>
          <TCustomText weight={500} style={styles.text}>
            have_an_account
          </TCustomText>
          <Link
            title="login"
            style={{ color: '#fff' }}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  img: {
    alignSelf: 'center',
  },
  actions: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 70,
  },
  row: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  text: {
    fontSize: 17,
    color: '#fff',
    marginRight: 10,
  },
})
