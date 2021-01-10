import React, { useState, useEffect} from 'react'

import {Avatar, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';

import {useParams} from 'react-router-dom';

import db from './firebase';

function Chat() {

    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        const unsubscribe = () => {
            if (roomId) {
                db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                    setRoomName(snapshot.data().name)
                });
                db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ));
            }
        }
        return () => {
            unsubscribe();
        }
        
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    },[]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed >> ', input);

        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last Seen at ...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${true && 'chat__receiver'}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            { new Date(message.timestamp?.toDate()).toUTCString() }
                            </span> 
                    </p>
                ))} 
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a Message"/>
                    <button type="submit" onClick={sendMessage}>Send a Message</button>
                </form>
                <MicIcon />
            </div>    
        </div>
    )
}

export default Chat;
