import React, { Component } from 'react';
import '../App.css';
import Api from '../Api'
import AddNewItems from './AddNewItems'

class DisplayCheckListContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkListItems: []
        }
    }
    componentDidMount() {
        Api.getCheckList(this.props.checkListId)
            .then(listItems => {
                this.setState({
                    checkListItems: listItems
                })
            })
    }
    addNewItem = (e) => {
        let itemName = e.target.value
        let checkListId = this.props.checkListId
        if (e.key === "Enter") {
            Api.addNewItem(checkListId, itemName)
                .then(newItem => {
                    this.setState({
                        checkListItems: [...this.state.checkListItems, newItem]
                    })
                })
            e.target.value = ""
        }

    }
    deleteItem = (itemId) => {
        let checkListId = this.props.checkListId
        Api.deleteItem(checkListId, itemId)
            .then(item => {
                let newCheckListItems = this.state.checkListItems.filter(items => items.id !== itemId)
                this.setState({
                    checkListItems: newCheckListItems
                })
            })
    }
    render() {
        return (
            <div>
                {this.state.checkListItems.map((item) => {
                    return (
                        <div className="check-items" key={item.id}>
                            <input type="checkbox" className="check"/>
                            <span className="">{item.name}</span>
                            <i className="material-icons dialog-icons" onClick={this.deleteItem.bind(this, item.id)}>delete</i>
                        </div>
                    )
                })
                }
                <AddNewItems addNewItem={this.addNewItem} />
            </div>
        )
    }

}
export default DisplayCheckListContent;