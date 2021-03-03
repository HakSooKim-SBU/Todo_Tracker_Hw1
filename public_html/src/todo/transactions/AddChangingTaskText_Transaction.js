'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddChangingTaskText_Transaction extends jsTPS_Transaction {
    constructor(initModel, listitemidToChange,newTaskText) {
        super();
        this.model = initModel;
        this.listitemid = listitemidToChange;
        this.newTaskText = newTaskText;
        this.indexOflistitem = this.model.currentList.getIndexOfItem(this.listitemid);
        this.itemlist = this.model.currentList.getItemAtIndex(this.indexOflistitem);

    }

    doTransaction() {   
        this.oldText = this.itemlist.getDescription();
        this.itemlist.setDescription(this.newTaskText);
        this.model.view.viewList(this.model.currentList);


    }

    undoTransaction() {
        this.itemlist.setDescription(this.oldText);
        this.model.view.viewList(this.model.currentList);

    }
}