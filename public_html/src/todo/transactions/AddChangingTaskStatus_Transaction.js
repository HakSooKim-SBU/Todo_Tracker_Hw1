'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddChangingTaskStatus_Transaction extends jsTPS_Transaction {
    constructor(initModel, listitemidToChange,newStatus) {
        super();
        this.model = initModel;
        this.listitemid = listitemidToChange;
        this.newStatus = newStatus;
        this.indexOflistitem = this.model.currentList.getIndexOfItem(this.listitemid);
        this.itemlist = this.model.currentList.getItemAtIndex(this.indexOflistitem);

    }

    doTransaction() {   
        this.pastStatus = this.itemlist.getStatus();
        this.itemlist.setStatus(this.newStatus);
        this.model.view.viewList(this.model.currentList);

    }

    undoTransaction() {
        this.itemlist.setStatus(this.pastStatus);
        this.model.view.viewList(this.model.currentList);

    }
}