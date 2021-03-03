'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddMoveUpItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, listItemidToMoveUp) {
        super();
        this.model = initModel;
        this.itemidToMoveUp = listItemidToMoveUp
        this.indexOfItemToMoveUp = this.model.currentList.getIndexOfItem(this.itemidToMoveUp);
        this.indexOfItemToMoveDown = this.indexOfItemToMoveUp - 1;

    }

    doTransaction() {   
    this.beforeBottomAfterTopItem = this.model.removeItemWithdIndexCurrentlist(this.indexOfItemToMoveUp)
    this.beforeTopAfterDownItem = this.model.removeItemWithdIndexCurrentlist(this.indexOfItemToMoveDown)
    this.model.addItemOnIndexToCurrentlist(this.indexOfItemToMoveDown, this.beforeBottomAfterTopItem)
    this.model.addItemOnIndexToCurrentlist(this.indexOfItemToMoveUp, this.beforeTopAfterDownItem)


    }

    undoTransaction() {
    this.beforeBottomAfterTopItem = this.model.removeItemWithdIndexCurrentlist(this.indexOfItemToMoveUp)
    this.beforeTopAfterDownItem = this.model.removeItemWithdIndexCurrentlist(this.indexOfItemToMoveDown)
    this.model.addItemOnIndexToCurrentlist(this.indexOfItemToMoveDown, this.beforeBottomAfterTopItem)
    this.model.addItemOnIndexToCurrentlist(this.indexOfItemToMoveUp, this.beforeTopAfterDownItem)
    }
}
