import React, { useState, useEffect, useRef } from "react"
import { useUserInfo } from "hooks"

function getMessageTimestamp() {
    const currTime = new Date()
    const hours = ("0" + currTime.getHours()).slice(-2)
    const mins = ("0" + currTime.getMinutes()).slice(-2)
    return `${hours}:${mins}`
}

function checkFromCurrentUser(currentUser, message) {
    return currentUser.id === message.userId
}

const Chat = ({ socket, roomId }) => {
    const [msg, setMsg] = useState("")
    const messagesEndRef = useRef(null)
    const [messages, setMessages] = useState([
        {
            userId: 12345,
            userName: "bot",
            message: "test",
            time: getMessageTimestamp(),
        },
    ])
    const userInfo = useUserInfo()
    const handleMsgChange = (e) => {
        setMsg(e.target.value)
    }

    const handleSend = () => {
        console.log("Trying to send message")
        if (roomId && socket) {
            console.log("Able to send message")
            const { id, email, firstName, lastName } = userInfo
            const from = firstName ? `${firstName} ${lastName}` : email
            socket.emit("chatMessage", {
                room: roomId,
                messageObj: {
                    userId: id,
                    time: getMessageTimestamp(),
                    userName: from,
                    message: msg,
                },
            })
            setMsg("")
            console.log("Sent")
        }
    }
    const onKeyUp = (event) => {
        if (event.charCode === 13) {
            handleSend()
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    useEffect(() => {
        socket.on("chatMessage", (msgFromServer) => {
            setMessages((oldMessages) => [...oldMessages, msgFromServer])
        })
    }, [])
    return (
        <div className="card border-dark chat-window">
            <div className="card-body d-flex flex-column pb-1">
                {messages.map((m, i) => {
                    const fromCurrentUser = checkFromCurrentUser(userInfo, m)
                    return (
                        <div
                            key={`chatmessage-${i}`}
                            className={`card chat-message ${
                                fromCurrentUser && "current-user-message"
                            } mb-3 shadow ${fromCurrentUser ? "ml-5" : "mr-5"}`}
                        >
                            <div className="card-body">
                                <span className="card-title">
                                    {fromCurrentUser ? "Ty" : m.userName}
                                    <small className="ml-2 text-muted">
                                        {m.time}
                                    </small>
                                </span>
                                <p className="card-text">{m.message}</p>
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="card-header bg-transparent">
                <div className="input-group mb-1">
                    <input
                        type="text"
                        className="form-control"
                        aria-describedby="chat-input"
                        value={msg}
                        placeholder="Wciśnij enter, aby wysłać"
                        onChange={handleMsgChange}
                        onKeyPress={onKeyUp}
                    />
                    <div className="input-group-prepend">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={handleSend}
                        >
                            Wyślij
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function propsAreEqual(prevChatProps, nextChatProps) {
    return (
        prevChatProps.roomId === nextChatProps.roomId &&
        prevChatProps.socket.id === nextChatProps.socket.id
    )
}

const MemoizedChat = React.memo(Chat, propsAreEqual)

export default MemoizedChat
