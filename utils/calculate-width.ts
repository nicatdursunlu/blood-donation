import { Dimensions } from 'react-native'

export function getWidthByPercents(
  percents: number = 100,
  spacesCount: number = 0
) {
  return ((Dimensions.get('window').width - 15 * spacesCount) / 100) * percents
}
