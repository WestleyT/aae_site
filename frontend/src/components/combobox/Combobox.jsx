import { useEffect, useState } from "react";
import axios from "axios";
import Tag from "./Tag";
import './Combobox.css';


export default function Combobox(props) {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedTagValue, setSelectedTagValue] = useState('');

    useEffect(() => {
        const fetchCategories = async() => {
            const response = await axios.get('/categories');
            setOptions(response.data);
        };

        fetchCategories();
    }, []);

    const addSelection = (e) => {
        const matchedOption = options.find(opt => opt.name === selectedTagValue);
        setSelectedOptions(selectedOptions => [...selectedOptions, matchedOption ? matchedOption : {name: selectedTagValue, _id: ''}]);
        setSelectedTagValue('');
    }

    const deleteTag = (tag) => {
        console.log(tag);
        const filteredOptions = selectedOptions.filter(opt => opt.name !== tag.name);
        setSelectedOptions(filteredOptions);
        console.log('selected options after splice ', selectedOptions);
    }

    return (
        <div className="combobox">
            <div className="tag-list">
                {selectedOptions.map(o => <Tag key={o.name} tag={o} deleteTag={deleteTag}></Tag>)}
            </div>
            <div>
                <label htmlFor="tag-input">Select Tag(s): </label>
                <input type="text" list="tag-options" value={selectedTagValue} onChange={e => setSelectedTagValue(e.target.value)} />
                <datalist id='tag-options'>
                    {options.map(o => <option key={`${o._id}optionslist`} value={o.name}></option>)}
                </datalist>
                <button className="add-tag-button" onClick={addSelection}>Add</button>
            </div>
        </div>
    )
}