import React from 'react';
import '../App.css'

const AddNewList = (props) => {
    return (
        <div>
            <input type="text" placeholder="+ Add new list"
                className="add-another-list" onKeyPress={props.addnewlist} />
        </div>
        )
}

export default AddNewList;