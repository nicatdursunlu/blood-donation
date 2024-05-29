export const generateChatId = (firstId: string, secondId: string) => {
  return [firstId, secondId].join('_')
}
