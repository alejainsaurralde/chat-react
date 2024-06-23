
import { useState } from 'react'
import './App.css'

import io from 'socket.io-client'
import Chat from './Chat'
import { Container, Divider } from 'semantic-ui-react'
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react'
import { FormField, Button, Checkbox, Form, Label } from 'semantic-ui-react'

const socket = io.connect("http://localhost:3001")

function App() {
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if (username != "" && room != "") {
            socket.emit("join_room", room)
            setShowChat(true)
        }
    }

    return (

        <Container>
            {!showChat ? (
                <Card color='purple' fluid>
                    <Image
                        floated='right'
                        size='tiny'
                        src='https://cdn-icons-png.flaticon.com/512/5087/5087579.png'
                    />
                    <CardContent>
                        {/* <Message color='purple'>Purple</Message> */}
                        <CardHeader style={{ color: 'purple', fontSize: '20px' }}>Unirme al chat</CardHeader>
                        <CardMeta>AlejaChat</CardMeta>
                        <CardDescription>
                            <Form>
                                <FormField>
                                    <label>Username:</label>
                                    <input type="text" placeholder="Ale..." onChange={e => setUsername(e.target.value)} />
                                    <Divider />
                                </FormField>
                                <FormField>
                                    <label>Room:</label>
                                    <input type="text" placeholder="Id Sala:" onChange={e => setRoom(e.target.value)} />
                                </FormField>
                                <FormField>
                                    <Checkbox label='Acepto los Términos y Condiciones.' />
                                </FormField>
                                <Button color='purple' onClick={joinRoom}>Unirme</Button>
                            </Form>
                        </CardDescription>
                    </CardContent>
                    <CardContent extra>
                        <a href="https://github.com/alejainsaurralde" target="_blank" rel="noopener noreferrer">
                            <Icon name='github' color='black' size='big' />
                            Mi GitHub
                        </a>
                        <Divider />
                    </CardContent>
                </Card>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </Container>

    )
}

export default App