import React, { Component } from 'react'
import '../App.css';
import Api from '../Api'
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DisplayCheckListContent from './DisplayCheckListContent'
import AddNewCheckList from './AddNewCheckList';


class DisplayCheckList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            selectedCardData: []
        }
    }
    componentDidMount() {
        Api.getCardDetails(this.props.selectedCardId)
            .then(cardData => {
                this.setState({
                    selectedCardData: cardData
                })
            })
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    addnewchecklist = (e) => {
        let checkListName = e.target.value;
        let idCard = this.props.selectedCardId;
        if (e.key === "Enter") {
            Api.addNewCheckList(idCard, checkListName)
                .then(newCheckList => {
                    this.setState({
                        selectedCardData: [...this.state.selectedCardData, newCheckList]
                    })
                })
            e.target.value = ''
        }
    }
    deleteCheckList = (checkListId) => {
        Api.deleteCheckList(checkListId)
            .then(data => {
                let prevData = this.state.selectedCardData.filter(
                    checklist => checklist.id !== checkListId
                );
                this.setState({
                    selectedCardData: prevData
                })
            })
    }
    render() {
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={true} maxWidth={'md'}>
                    <DialogContent >
                        <div className="dialog-content">
                            <div className="dialog-header">
                                <i className="material-icons dialog-icons">subtitles</i>
                                <div>
                                    <span className="dialog-title">{this.props.selectedCardName}</span>
                                    <span className="selected-card-name">in list {this.props.selectedListName}</span>
                                </div>
                            </div>
                            <div className="dialog-description-container">
                                <div className="description">
                                    <i className="material-icons dialog-icons">subject</i>
                                    <div className="description-content">
                                        <span className="dialog-name">Description</span>
                                        <textarea placeholder="Add a more detailed description..." rows="3" cols="50" />
                                    </div>
                                </div>
                                <AddNewCheckList addnewchecklist={this.addnewchecklist} />
                                {this.state.selectedCardData.map((checklist, i) => {
                                    return (
                                        <div className="check-list-container" key={i}>
                                            <i className="material-icons dialog-icons">check_box</i>
                                            <div className="check-list">
                                                <div className="check-list-items">
                                                    <span className="dialog-name">{checklist.name}</span>
                                                    <span onClick={this.deleteCheckList.bind(this, checklist.id)}>Delete...</span>
                                                </div>
                                                <DisplayCheckListContent checkListName={checklist.name} checkListId={checklist.id} />
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="add-comment-container">
                                    <i className="material-icons dialog-icons">mode_comment</i>
                                    <div className="add-comment">
                                        <span className="dialog-name">Add Comment</span>
                                        <textarea placeholder="Write a comment..." rows="3" cols="50" />
                                        <button >save</button>
                                    </div>
                                </div>
                                <div className="activity-container">
                                    <i className="material-icons dialog-icons">art_track</i>
                                    <div className="activity">
                                        <span className="dialog-name">Activity</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

}

export default DisplayCheckList