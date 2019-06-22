import React from 'react';
import '../App.css';
import DisplayListContent from './DisplayListContent';

const DisplayList = (props) => {

    return (
        <div className="list-items">
            <div className="list-items-header">{props.userList.name}
                <i className="material-icons" onClick={props.deleteList}>archive</i>
            </div>
            <DisplayListContent listId={props.userList.id} listName={props.userList.name}/>
        </div>
    )
}

export default DisplayList;