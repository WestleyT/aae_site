import React from 'react';
import './Tag.css';

export default function Tag(props) {
  return (
    <button className='tag' onClick={() => props.deleteTag(props)}>{`${props.tag.name} X`}</button>
  )
}
