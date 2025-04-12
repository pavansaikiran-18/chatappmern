import React, { useEffect } from 'react'
import { useAuthStore } from '../Store/useAuthStore'
import { useChatStore } from '../Store/useChatStore'

export const ChatContainer = () => {
  const {getMessages,}=useChatStore()
  useEffect{()=>{
getMessages(selected._id)
  },[selected._id,getMessages]}
  return (
    <div>ChatContainer</div>
  )
}
