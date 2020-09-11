import React from 'react'
import { useConversations } from '../contexts/ConversationsProvider'
import OpenCoversation from './OpenCoversation'
import Sidebar from './Sidebar'

function DashBoard({id}) {
    const { selectedConversation } = useConversations()
    return (
        <>
        <div className="d-flex" style={{height:'100vh'}}>
            <Sidebar id={id}/>
            {selectedConversation && <OpenCoversation /> }
        </div>
        </>
    )
}

export default DashBoard
