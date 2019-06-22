import React, { Component } from 'react';
import '../App.css';
import Api from '../Api'
import AddNewCard from './AddNewCard';
import DisplayCheckList from './DisplayCheckList';

class DisplayListContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCard: [],
            checkListFlag: false,
            selectedCardName: ""
        }
    }
    componentDidMount() {
        Api.getListData(this.props.listId)
            .then(cards => {
                this.setState({
                    listCard: cards
                })
            })
    }
    addnewcard = (e) => {
        let cardName = e.target.value;
        let listId = this.props.listId;
        if (e.key === "Enter") {
            Api.addNewCard(listId,cardName)
                .then(newcard => {
                    console.log(newcard)
                    this.setState({
                        listCard: [...this.state.listCard, newcard]
                    })
                })
            e.target.value = ''
        }
    }
    deletecard = (cardId) => {
        Api.deleteCard(cardId)
            .then(deletedCard => {
                let prevData = this.state.listCard.filter(
                    card => card.id !== cardId
                );
                this.setState({
                    listCard: prevData
                })
            })
    }
    checkList = (cardId, cardName) => {
        this.setState({
            checkListFlag: !this.state.checkListFlag,
            selectedCardName: cardName,
            selectedCardId: cardId

        })
    }
    render() {
        return (
            <div>
                {this.state.listCard.map(card => {
                    return <div className="card" key={card.id} onClick={() => this.checkList(card.id, card.name)}>
                        <div className="card-name">
                            <div>{card.name}</div>
                            <div>
                                <i className="material-icons dialog-icons" onClick={this.deletecard.bind(this, card.id)}>delete</i>
                            </div>
                        </div>
                        <div className="badges">
                            <img src="https://img.icons8.com/windows/32/000000/checked-checkbox.png" alt="" />
                            {card.badges.checkItems}
                        </div>
                    </div>
                })}
                <AddNewCard addnewcard={this.addnewcard} />
                {this.state.checkListFlag ? (<DisplayCheckList selectedCardId={this.state.selectedCardId} selectedCardData={this.state.selectedCardData} selectedCardName={this.state.selectedCardName} selectedListName={this.props.listName} />) : null}
            </div>
        )
    }


}

export default DisplayListContent;