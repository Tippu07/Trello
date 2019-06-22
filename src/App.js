import React, { Component } from 'react';
import './App.css';
import Api from './Api'
import DisplayList from './components/DisplayList';
import AddNewList from './components/AddNewList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      AllLists: []
    };
  }

  componentDidMount() {
    Api.getBoard().then(result => {
      this.setState({
        isLoaded: true,
        AllLists: result
      });
    },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  addnewlist = (e) => {
    let listName = e.target.value;
    if (e.key === "Enter") {
      Api.addNewList(listName)
        .then(newList => {
          this.setState({
            AllLists: [
              ...this.state.AllLists, newList
            ]
          });
        })
      e.target.value = ""
    }
  }
  deleteList = (listId) => {
    Api.deleteList(listId)
      .then(data => {
        let prevData = this.state.AllLists.filter(
          list => list.id !== listId
        );
        this.setState({
          AllLists: prevData
        })
      })
  }

  render() {
    const { error, isLoaded, AllLists } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <div className="header">
            <h1 className="title-name">Trello</h1>
          </div>
          <div className="container">
            <div className="list">
              {AllLists.map((list, i) => {
                return (<DisplayList userList={list} key={i}
                  deleteList={this.deleteList.bind(this, list.id)} />)
              })}
              <AddNewList addnewlist={this.addnewlist} />
            </div>
          </div>

        </div>

      );
    }
  }
}
export default App;