import './Write.css';
import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Context } from '../../context/Context';
import Combobox from '../../components/combobox/Combobox';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Write() {
    const [publishLater, setPublishLater] = useState(false);
    const [postContent, setPostContent] = useState({});
    const [selectedTags, setSelectedTags] = useState([]);

    const params = useParams();
    const {user} = useContext(Context);
    const nav = useNavigate();

    useEffect(() => {
        const fetchContent = async() => {
            const response = await axios.get(`/posts/${params.postId}`);
            console.log(response);
            setPostContent(response.data);
        };

        if (params.postId) {
            fetchContent();
        }  
    }, []);

    const publishLaterChange = (e) => {
        setPublishLater(!publishLater);
    }

    const handleChange = (e) => {
        setPostContent({...postContent, [e.target.name]: e.target.value});
    }

    //ReactQuill does not send an event object, so we need a different change handler that just accepts the value
    const handleBodyChange =(value) => {
        setPostContent({...postContent, body: value});
    }

    const handleSave = (e) => {
        const newPostContent = {...postContent, userId: user._id, published: false, publishDate: null, tags: selectedTags}
        setPostContent(newPostContent);
        submitPost(newPostContent, true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setPostContent({...postContent, userId : user._id, published: !publishLater, publishDate: publishLater ? postContent.publishDate : new Date(), tags: selectedTags});
        submitPost(postContent, false);
    }

    const submitPost = async (post, routeToDraft) => {
        try {
            let res;
            if (params.postId) {
                res = await axios.post(`/posts/${params.postId}`, post, {headers: {authorization: "Bearer " + user.accessToken}})
            } else {
                res = await axios.post('/posts', post, {headers: {authorization: "Bearer " + user.accessToken}});
            }
            routeToDraft ? nav(`/write/${res.data._id}`) : nav(`/drafts/`);
            //window.location.replace('/posts/' + res.data._id);
        } catch(error) {
            console.log('error ', error);
        }
    }

    return (
        <div className="write">
            <form className='write-form' onSubmit={handleSubmit}>
                <div className='write-form-group'>
                    <input type='text' className='write-input' autoFocus={true} name='title' onChange={handleChange} value={postContent.title || ''} placeholder='Title' />
                </div>
                <ReactQuill theme='snow' value={postContent.body || ''} name='body' onChange={handleBodyChange} />
                <Combobox passSelectedTags={setSelectedTags} />
                <div className='submit-wrapper'>
                    <button className="write-submit" type='button' name='save' onClick={handleSave}>Save</button>
                    <span> ~or~ </span>
                    <input type='checkbox' id='publish-later' name='publishLater' checked={publishLater} onChange={publishLaterChange}></input>
                    <label htmlFor='publish-later'>Publish Later</label>
                    {publishLater && <input type='date' id='publishDate' name='publishDate' value={postContent.publishDate} onChange={handleChange}></input>}
                    <button className="write-submit" type='submit' name='publish'>{publishLater ? 'Publish Later' : 'Publish Now'}</button>
                </div>
            </form>
        </div>
    )
}
