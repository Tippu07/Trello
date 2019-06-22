import React from 'react';
import '../App.css'

const AddNewCheckList = (props) => {
    return (
        <div>
            <input type = 'text' className='addnewcard addnewchecklist'
            placeholder='+ Add another checklist' onKeyPress={props.addnewchecklist}/>
        </div>
        
        )
}

export default AddNewCheckList;