import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const { contacts } = useContacts()
  const [selectedConversationIndex,setSelectedConversationIndex] = useState(0)
 
  function createConversations(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, message:[] }]
    })
  }

  function addMessageToConversation({recipients,text,sender}){
    setConversations(prevConversations=>{
      let madeChange = false
      const newMessage = {sender,text}
      const newConversations = prevConversations.map(conversation=>{
        if(arrayEquality(conversation.recipient, recipients)){
          madeChange=true
          return {...conversation,messages:[...conversation.messages,newMessage]}
        }
        return conversation
      })

      if(madeChange){
        return newConversations
      }
      else{
        return [...prevConversations,{recipients,messages:[newMessage]}]
      }
    })
  }

  function sendMessage(recipients,text){
    addMessageToConversation({recipients,text,sender:id})
  }

  const formattedConversations = conversations.map((conversation,index)=>{
    const recipients = conversation.recipients.map(recipient=>{
      const contact = contacts.find(contact=>{
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return {id:recipient, name}
    })
    const messages = conversation.messages.map(message=>{
      const contact = contacts.find(contact=>{
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return {...message,senderName:name,fromMe}
    })
    const selected = index === selectedConversationIndex
    return {...conversations,messages, recipients, selected}
  })

  return (
    <ConversationsContext.Provider value={{ sendMessage, conversations: formattedConversations, selectedConversation: formattedConversations[selectedConversationIndex] ,selectConversationIndex: setSelectedConversationIndex,createConversations }}>
      {children}
    </ConversationsContext.Provider>
  )
}


function arrayEquality(a,b){
  if(a.length !== b.length){
    return false
  }
  a.sort()
  b.sort()
  return a.every((element,index)=>{
    return element === b[index]
  })
}