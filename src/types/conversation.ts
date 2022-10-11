export interface IConversation {
  id: number
  lastMessageTimestamp: number
  recipientId: number
  recipientNickname: string
  senderId: number
  senderNickname: string
}