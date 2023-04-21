import './Write.css';
import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Write() {
    const [title, setPostTitle] = useState('');
    const [body, setPostBody] = useState('');
    const {user} = useContext(Context);

    console.log('user ', user);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPost = {
            title,
            body,
            userId: user._id
        }

        try {
            const res = await axios.post('/posts', newPost, {headers: {authorization: "Bearer " + user.accessToken}});
            window.location.replace('/posts/' + res.data._id);
        } catch(error) {
            //console.log('error ', error);
        }
        
    }

    return (
        <div className="write">
            <form className='write-form' onSubmit={handleSubmit}>
                <div className='write-form-group'>
                    {/* <input type='file' id='file-input' /> */}
                    <input type='text' className='write-input' autoFocus={true} onChange={e => setPostTitle(e.target.value)} placeholder='Title' />
                </div>
                <ReactQuill theme='snow' value={body} onChange={setPostBody} />
                <button className="write-submit" type='submit'>Publish</button>
            </form>
        </div>
    )
}
