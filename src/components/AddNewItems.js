import React from 'react';
import '../App.css'

const AddNewItems = (props) => {
    return (
        <div>
            <input type="text" placeholder="+ Add an item..."
                className="addnewcard" onKeyPress={props.addNewItem} />
        </div>
        )
}

export default AddNewItems;