/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

let API = import.meta.env.VITE_API_KEY;    
let TOKEN = import.meta.env.VITE_API_TOKEN; 
let BaseUrl = import.meta.env.VITE_BASE_URL;


//  Crud operation for board

export const getAllBoards = async () => {
    let boardsResponse = await axios.get(`${BaseUrl}/members/me/boards?fields=name,url&key=${API}&token=${TOKEN}`);
    return boardsResponse.data;
}

export const createBoard = async (boardName) => {
    let createdBoard = await axios.post(`${BaseUrl}/boards/?name=${boardName}&key=${API}&token=${TOKEN}`);
    return createdBoard.data;
}

// Crud operation for List

export const getLists = async (boardId) => {
    let lists = await axios.get(`${BaseUrl}/boards/${boardId}/lists?key=${API}&token=${TOKEN}`);
    return lists.data;
}

export const createList = async (listName, boardID) => {
    let createdList = await axios.post(`${BaseUrl}/lists/?name=${listName}&idBoard=${boardID}&key=${API}&token=${TOKEN}`);
    return createdList.data;
}

export const deleteList = async (listID) => {
    await axios.put(`${BaseUrl}/lists/${listID}/closed?value=true&key=${API}&token=${TOKEN}`);
}

// Crud operation for Card

export const getCards = async (listID) => {
    let cards = await axios.get(`${BaseUrl}/lists/${listID}/cards?key=${API}&token=${TOKEN}`);
    return cards.data;
}

export const createCard = async (name, listID) => {
    let createdCard = await axios.post(`${BaseUrl}/cards?idList=${listID}&name=${name}&key=${API}&token=${TOKEN}`);
    return createdCard.data;
}

export const deleteCard = async (cardId) => {
     await axios.delete(`/cards/${cardId}?key=${API}&token=${TOKEN}`);
}

// Crud operation for CheckList
export const getChecklists = async (listID) => {
    let lists = await axios.get(`${BaseUrl}/cards/${listID}/checklists?key=${API}&token=${TOKEN}`);
    return lists.data;
}
export const createChecklist = async (name, cardId) => {
    let createdChecklist = await axios.post(`${BaseUrl}/checklists?idCard=${cardId}&name=${name}&key=${API}&token=${TOKEN}`);
    return createdChecklist.data;
}

export const deleteChecklist = async (checklistId) => {
    await axios.delete(`${BaseUrl}/checklists/${checklistId}?key=${API}&token=${TOKEN}`);
}


// Crud operation for CheckItems

export const getCheckitems = async (checklistId) => {
    let checkItems = await axios.get(`${BaseUrl}/checklists/${checklistId}/checkItems?key=${API}&token=${TOKEN}`);
    return checkItems.data;
}



export const createCheckitem = async (name, checklistId) => {
    let createdChecklist = await axios.post(`${BaseUrl}/checklists/${checklistId}/checkItems?name=${name}&key=${API}&token=${TOKEN}`);
    return createdChecklist.data;
}


export const deleteCheckitem = async (checkitemId, checklistId) => {
     await axios.delete(`${BaseUrl}/checklists/${checklistId}/checkItems/${checkitemId}?key=${API}&token=${TOKEN}`);

}

export const updateCheckitem = async (cardId, checkitemId, state) => {
    let stateQuery = "state=" + state;
    let updatedCheckitem = await axios.put(`${BaseUrl}/cards/${cardId}/checkItem/${checkitemId}?${stateQuery}&key=${API}&token=${TOKEN}`);
    return updatedCheckitem.data;
}