import React, { useEffect, useState } from 'react'
import { Container, Divider } from 'semantic-ui-react'
import {
    CardHeader,
    CardContent,
    Card,
    Button,
    Icon,
    Form,
    FormField,
    Input,
    Image,
} from 'semantic-ui-react'
import { MessageHeader, Message } from 'semantic-ui-react'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messagesList, setMessagesList] = useState([])

    const sendMessage = async () => {
        if (username && currentMessage) {
            const info = {
                message: currentMessage,
                room,
                author: username,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),

            }
            await socket.emit("send_message", info)
            setMessagesList((list) => [...list, info]);
            // VACIA LA CAJA DE MSJ
            setCurrentMessage("")
        }
    }

    //ESTE CODIGO HACIA QUE SE REPITAN LOS MESAJES
    // useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //         // console.log(data)
    //         setMessagesList((list) => [...list, data]);
    //     })
    // }, [socket])

    useEffect(() => {
        const messageHandle = (data) => {
            setMessagesList((list) => [...list, data]);
        }
        socket.on("receive_message", messageHandle);
        return () => socket.off("receive_message", messageHandle);
    }, [socket])

    return (
        <Container>
            <Card fluid>
                <CardContent>
                    <Image
                        floated='right'
                        size='tiny'
                        src='https://cdn-icons-png.flaticon.com/512/5087/5087579.png' />
                    <CardHeader style={{ color: 'teal', fontSize: '20px' }}>{`Chat en vivo | Sala: ${room}`}</CardHeader>
                    <ScrollToBottom>
                        <CardContent style={{ height: "400px", padding: "5px" }}>
                            {messagesList.map((item, i) => {
                                return (
                                    // <h3>{item.message}</h3>
                                    <span key={i}>
                                        <Message style={{ textAlign: username === item.author ? "right" : "left", }} color='teal'
                                            success={username === item.author}
                                            info={username != item.author}
                                        >
                                            {/* NOMBRE DEL USER TIPO TITULO
                                        <MessageHeader>{item.author}</MessageHeader> */}
                                            {/* MSJ COMO PRINCIPAL */}
                                            <Message color='pink'>{item.message}</Message>
                                            <p><strong>{item.author} </strong>te escribió a las <i>{item.time}</i></p>
                                            {/* <p>{item.message}</p> */}
                                            {/* LA HORA DEL MSJ
                                        <i>{item.time}</i> */}
                                        </Message>
                                        <Divider />
                                    </span>
                                );
                            })
                            }
                        </CardContent>
                    </ScrollToBottom>
                    <CardContent extra>
                        <Form>
                            <FormField>
                                <Input
                                    action={{
                                        color: 'pink',
                                        labelPosition: 'right',
                                        icon: 'Send',
                                        content: 'Enviar',
                                        onClick: sendMessage,
                                    }}
                                    value={currentMessage}
                                    type="text" placeholder="Mensaje..."
                                    onChange={e => setCurrentMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        e.key === "Enter" && sendMessage(S)
                                    }}
                                />
                            </FormField>
                        </Form>
                        <Icon name='user' color='green' />
                        Conectado
                    </CardContent>
                </CardContent>
            </Card>
        </Container >
    )
}

export default Chat