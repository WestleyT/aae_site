import './Write.css';
import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Context } from '../../context/Context';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Write() {
    const [title, setPostTitle] = useState('');
    const [body, setPostBody] = useState('');
    const [publishLaterChecked, setPublishLaterChecked] = useState(false);
    const [date, setDate] = useState('');

    const params = useParams();
    const {user} = useContext(Context);

    useEffect(() => {
        const fetchContent = async() => {
            const response = await axios.get(`/posts/${params.postId}`);
            setPostContent(response.data);
        };

        if (params.postId) {
            fetchContent();
        }  
    }, []);

    const setPostContent = (content) => {
        setPostTitle(content.title);
        setPostBody(content.body);
        setDate(content.publishDate);
        setPublishLaterChecked(true);
    }

    const publishLaterChange = (e) => {
        setPublishLaterChecked(!publishLaterChecked);
    }

    const handleSave = (e) => {
        e.preventDefault();
        const newPost = {
            title,
            body,
            userId: user._id,
            published : false,
            publishDate : null
        }

        submitPost(newPost);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title,
            body,
            userId: user._id,
            published : !publishLaterChecked,
            publishDate : publishLaterChecked ? date : new Date()
        }

        submitPost(newPost);
    }

    const submitPost = async (post) => {
        try {
            let res;
            if (params.postId) {
                res = await axios.post(`/posts/${params.postId}`, post, {headers: {authorization: "Bearer " + user.accessToken}})
            } else {
                res = await axios.post('/posts', post, {headers: {authorization: "Bearer " + user.accessToken}});
            }
            //window.location.replace('/posts/' + res.data._id);
        } catch(error) {
            console.log('error ', error);
        }
    }

    return (
        <div className="write">
            <form className='write-form' onSubmit={handleSubmit}>
                <div className='write-form-group'>
                    {/* <input type='file' id='file-input' /> */}
                    <input type='text' className='write-input' autoFocus={true} onChange={e => setPostTitle(e.target.value)} value={title} placeholder='Title' />
                </div>
                <ReactQuill theme='snow' value={body} onChange={setPostBody} />
                <div className='submit-wrapper'>
                    <button className="write-submit" name='save' onClick={handleSave}>Save</button>
                    <span> ~or~ </span>
                    <input type='checkbox' id='publish-later' checked={publishLaterChecked} onChange={publishLaterChange}></input>
                    <label htmlFor='publish-later'>Publish Later</label>
                    {publishLaterChecked && <input type='date' id='publishDate' name='publishDate' value={date} onChange={(e) => setDate(e.currentTarget.value)}></input>}
                    <button className="write-submit" type='submit' name='publish'>{publishLaterChecked ? 'Publish Later' : 'Publish Now'}</button>
                </div>
            </form>
        </div>
    )
}
