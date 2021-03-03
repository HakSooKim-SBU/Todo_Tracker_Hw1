'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddChangingTaskDueDate_Transaction extends jsTPS_Transaction {
    constructor(initModel, listitemidToChange,newDueDate) {
        super();
        this.model = initModel;
        this.listitemid = listitemidToChange;
        this.newDueDate = newDueDate;
        this.indexOflistitem = this.model.currentList.getIndexOfItem(this.listitemid);
        this.itemlist = this.model.currentList.getItemAtIndex(this.indexOflistitem);

    }

    doTransaction() {   
        if (this.newDueDate === ""){
            this.oldDueDate = this.itemlist.getDueDate();
            this.itemlist.setDueDate("No Date");
        }
        else{
            this.oldDueDate = this.itemlist.getDueDate();
            this.itemlist.setDueDate(this.newDueDate);

        }
        this.model.view.viewList(this.model.currentList);


    }

    undoTransaction() {
        this.itemlist.setDueDate(this.oldDueDate);
        this.model.view.viewList(this.model.currentList);

    }
}