import React from 'react';
import '../App.css'

const AddNewCard = (props) => {
    return (
        <div>
            <input type = 'text' className='addnewcard'
            placeholder='+ Add another card' onKeyPress={props.addnewcard}/>
        </div>
        
        )
}

export default AddNewCard;