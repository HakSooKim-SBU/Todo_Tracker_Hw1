'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddRemoveItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, listItemidToRemove) {
        super();
        this.model = initModel;
        this.itemidToRemove = listItemidToRemove
        this.indexOfItemToRemove = this.model.currentList.getIndexOfItem(this.itemidToRemove);

    }

    doTransaction() {   
    this.itemRemoved = this.model.removeItemWithdIndexCurrentlist(this.indexOfItemToRemove)
    }

    undoTransaction() {
    this.model.addItemOnIndexToCurrentlist(this.indexOfItemToRemove, this.itemRemoved)

    }
}