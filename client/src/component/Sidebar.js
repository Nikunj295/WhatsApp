import React, {useState} from 'react'
import {Tab,Nav, Button} from "react-bootstrap"
import Conversations from "./Conversations"
import Contacts from "./Contacts"

function Sidebar({id}) {
    const [activekey,setActiveKey] = useState("conversations")
    const conversationsOpem = activekey === 'conversations'

    return (
        <div style={{width:'250px'}} className="d-flex flex-column">
            <Tab.Container activeKey={activekey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey="conversations">Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="contacts" >Contacts</Nav.Link>
                    </Nav.Item>   
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey="conversations">
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey="contacts">
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your Id: <span className="text-muted">{id}</span>
                </div>
                <Button>
                    New {conversationsOpem ? 'Conversations':'Contacts'}
                </Button>
            </Tab.Container>
        </div>
    )
}

export default Sidebar
