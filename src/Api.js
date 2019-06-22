let key = "83b5188c12c2396e30d85474db321618";
let token = "4d8bc7625d07204d2d2ec28eb10214cd16dc132327e63cfa288f1475f7c5e27f";
let boardId = "5c134cd6da58aa4eec0259a3"

module.exports = {
    getBoard: function () {
        return fetch(`https://api.trello.com/1/boards/${boardId}/lists?key=${key}&token=${token}`)
            .then(res => res.json())
    },
    getListData: function (listId) {
        return fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`)
            .then(res => res.json())
    },
    addNewList: function (listName) {
        return fetch(`https://api.trello.com/1/lists?name=${listName}&idBoard=${boardId}&key=${key}&token=${token}`, {
            method: 'post'
        })
            .then(res => res.json())
    },
    deleteList: function (listId) {
        return fetch(`https://api.trello.com/1/lists/${listId}/closed?value=true&key=${key}&token=${token}`, {
            method: 'put'
        })
            .then(response => response.json())
    },
    getCardDetails: function (selectedCardId) {
        return fetch(`https://api.trello.com/1/cards/${selectedCardId}/checklists?key=${key}&token=${token}`)
            .then(response => response.json())
    },
    addNewCheckList: function (idCard, checkListName) {
        return fetch(`https://api.trello.com/1/checklists?idCard=${idCard}&name=${checkListName}&key=${key}&token=${token}`, {
            method: 'post'
        })
            .then(response => response.json())
    },
    deleteCheckList: function (checkListId) {
        return fetch(`https://api.trello.com/1/checklists/${checkListId}?key=${key}&token=${token}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
    },
    addNewCard: function (listId, cardName) {
        return fetch(`https://api.trello.com/1/cards?name=${cardName}&idList=${listId}&keepFromSource=all&key=${key}&token=${token}`, {
            method: 'post'
        })
            .then(response => response.json())
    },
    deleteCard: function (cardId) {
        return fetch(`https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`, {
            method: 'Delete'
        })
            .then(response => response.json())
    },
    getCheckList: function (checkListId) {
        return fetch(`https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${key}&token=${token}`)
            .then(response => response.json())
    },
    addNewItem: function (checkListId,itemName) {
        return fetch(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${itemName}&pos=bottom&checked=false&key=${key}&token=${token}`, {
            method: "POST"
        })
            .then(response => response.json())
    },
    deleteItem: function(checkListId,itemId){
        return fetch(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${itemId}?key=${key}&token=${token}`,{method:'DELETE'})
        .then(response => response.json())
    }

}