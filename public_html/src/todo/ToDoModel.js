'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import AddRemoveItem_Transaction from './transactions/AddRemoveItem_Transaction.js'
import AddMoveUpItem_Transaction from './transactions/AddMoveUpItem_Transaction.js'
import AddMoveDownItem_Transaction from './transactions/AddMoveDownItem_Transaction.js'
import AddChangingTaskText_Transaction from './transactions/AddChangingTaskText_Transaction.js'
import AddChangingTaskDueDate_Transaction from './transactions/AddChangingTaskDueDate_Transaction.js'
import AddChangingTaskStatus_Transaction from './transactions/AddChangingTaskStatus_Transaction.js'






/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
    }
//
    /**
     * addRemoveItemTransaction
     * 
     */
    addRemoveItemTransaction(listItemidToRemove){
        let transaction = new AddRemoveItem_Transaction(this,listItemidToRemove);
        this.tps.addTransaction(transaction);
    }

    addMoveUpItemTransaction(listItemidToMoveUp){
        if (this.currentList.getIndexOfItem(listItemidToMoveUp) === 0){
            console.log("First item cannot move up");
            return
        }

        let transaction = new AddMoveUpItem_Transaction(this,listItemidToMoveUp);
        this.tps.addTransaction(transaction);
    }

    addMoveDownItemTransaction(listItemidToMoveDown){
        if (this.currentList.getIndexOfItem(listItemidToMoveDown) === this.currentList.items.length - 1){
            console.log("last item cannot move down");
            return
        }

        let transaction = new AddMoveDownItem_Transaction(this,listItemidToMoveDown);
        this.tps.addTransaction(transaction);

    }

    addChangingTaskTextTransaction(listitemidToChange, newTaskText){
        if (this.currentList.getItemAtIndex(this.currentList.getIndexOfItem(listitemidToChange)).getDescription() === newTaskText) {
            this.view.viewList(this.currentList);
            return;
        }
        let transaction = new AddChangingTaskText_Transaction(this,listitemidToChange,newTaskText);
        this.tps.addTransaction(transaction);
    }

    addChangingTaskDueDateTransaction(listitemidToChange, newDueDate){
        if ((this.currentList.getItemAtIndex(this.currentList.getIndexOfItem(listitemidToChange)).getDueDate() === "No Date" &&
            newDueDate === "") || (this.currentList.getItemAtIndex(this.currentList.getIndexOfItem(listitemidToChange)).getDueDate() === newDueDate)){
                this.view.viewList(this.currentList);
                return;
            }
        let transaction = new AddChangingTaskDueDate_Transaction(this,listitemidToChange,newDueDate);
        this.tps.addTransaction(transaction);

    }

    addChangingTaskStatusTransaction(listitemidToChange,newStatus){
        if (this.currentList.getItemAtIndex(this.currentList.getIndexOfItem(listitemidToChange)).getStatus() === newStatus){
                this.view.viewList(this.currentList);
                return;
            }
        let transaction = new AddChangingTaskStatus_Transaction(this,listitemidToChange,newStatus);
        this.tps.addTransaction(transaction);

    }

    closeList(){
        this.currentList = null;
        this.tps = new jsTPS();
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
        }


    removeItemWithdIndexCurrentlist(indexOfItemToRemove){
        let removed = this.currentList.items.splice(indexOfItemToRemove,1)
        this.view.viewList(this.currentList);
        return removed[0]
    }
    /**
     * addItemOnIndexToCurrentlist
     * 
     *
     */
    addItemOnIndexToCurrentlist(indexOfItemToAdd, itemToAdd){
    this.currentList.items.splice(indexOfItemToAdd,0,itemToAdd)
    this.view.viewList(this.currentList);

    }
    /**
     * addMoveUpItemTransaction
     * 
     */

    

//

    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        return newItem;
    }

    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }

    /**
     * Load the items for the listId list into the UI.
     */                                                                                 //////////reset transaction !!!!
    loadList(listId) {
        this.tps = new jsTPS();
        document.getElementById("close-list-button").classList.remove("disable_button");
        document.getElementById("delete-list-button").classList.remove("disable_button");
        document.getElementById("add-item-button").classList.remove("disable_button");
        document.getElementById("add-list-button").classList.add("disable_button");
        document.getElementById("redo-button").classList.add("disable_button");
        document.getElementById("undo-button").classList.add("disable_button");
        document.getElementById("list-controls-col-header").classList.remove("shrink_controls");



        
        
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
            this.view.viewList(this.currentList);
// move current list to the first index
            let currentList = this.toDoLists[listIndex];
            if (listIndex > -1){
                this.toDoLists.splice(listIndex,1);
            this.toDoLists.unshift(currentList);
            this.view.refreshLists(this.toDoLists);
            document.getElementById('todo-list-'+currentList.getId()).classList.add("first_list");

        }
    }

    
}


    /**
     * Remove the itemToRemove from the current list and refresh.
     */ 
    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        //
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.toDoLists.splice(indexOfList, 1);
        this.currentList = null;
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
    } 

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
    }   
}