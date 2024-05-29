import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { FC, useState } from 'react'

import { useAppSelector } from '@/store/hooks'
import { getMessageTime } from '@/utils/date'
import { TMessage } from '@/types/chat.type'
import { CustomTheme } from '@/styles/theme'
import { CustomText } from '@/components'

interface IChatMessageBubbleProps {
  message: TMessage
}

export const ChatMessageBubble: FC<IChatMessageBubbleProps> = ({ message }) => {
  const { colors } = useTheme() as CustomTheme
  const { user } = useAppSelector((state) => state.auth)

  const { authorId, text, createdAt } = message

  const [show, setShow] = useState<boolean>(false)

  const isMyMessage = user.uid === authorId

  const companionBubble: ViewStyle = {
    alignSelf: 'flex-start',
    backgroundColor: colors.otherMsg,
    borderBottomEndRadius: 18,
  }

  const myBubble: ViewStyle = {
    alignSelf: 'flex-end',
    backgroundColor: colors.link,
    borderBottomStartRadius: 18,
  }

  const bubbleStyles: ViewStyle[] = [styles.bubble]

  if (isMyMessage) bubbleStyles.push(myBubble)
  else bubbleStyles.push(companionBubble)

  const showTime = () => setShow((v) => !v)

  return (
    <View style={[styles.container, { opacity: show ? 0.6 : 1 }]}>
      {show && (
        <CustomText
          weight="semi"
          style={{ ...styles.time, ...{ color: colors.time } }}
        >
          {getMessageTime(createdAt)}
        </CustomText>
      )}
      <TouchableWithoutFeedback onLongPress={showTime} onPressOut={showTime}>
        <View style={bubbleStyles}>
          <CustomText
            weight="semi"
            style={{
              ...styles.text,
              ...{ color: !isMyMessage ? colors.text : '#fff' },
            }}
          >
            {text}
          </CustomText>
          {/* <CustomText
            weight="semi"
            style={{ ...styles.time, ...{ color: colors.time } }}
          >
            {getMessageTime(createdAt)}
          </CustomText> */}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  bubble: {
    maxWidth: '75%',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderTopEndRadius: 18,
    borderTopStartRadius: 18,

    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
  },
  time: {
    // margin: 5,
    // fontSize: 10,
    // textAlign: 'center',
    margin: 8,
    fontSize: 10,
    textAlign: 'center',
  },
})
