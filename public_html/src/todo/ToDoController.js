'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown = function() {
            document.getElementsByClassName("modal-overlay")[0].style.display = 'block'
            document.getElementById("modal-button-confirm").onmousedown = function() {
                document.getElementsByClassName("modal-overlay")[0].style.display = 'none'
                appModel.removeCurrentList();
                document.getElementById("close-list-button").classList.add("disable_button");
            document.getElementById("delete-list-button").classList.add("disable_button");
            document.getElementById("add-item-button").classList.add("disable_button");
            document.getElementById("add-list-button").classList.remove("disable_button");
            document.getElementById("redo-button").classList.add("disable_button");
            document.getElementById("undo-button").classList.add("disable_button");
            document.getElementById("list-controls-col-header").classList.add("shrink_controls");

            }
            document.getElementsByClassName("modal-cancel")[0].onmousedown = function(){
                document.getElementsByClassName("modal-overlay")[0].style.display = 'none'
            }
            document.getElementsByClassName("modal-cancel")[1].onmousedown = function(){
                document.getElementsByClassName("modal-overlay")[0].style.display = 'none'
            }

        }
        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
        }  

        document.getElementById("close-list-button").onmousedown = function(){
            appModel.closeList();
            document.getElementById("close-list-button").classList.add("disable_button");
            document.getElementById("delete-list-button").classList.add("disable_button");
            document.getElementById("add-item-button").classList.add("disable_button");
            document.getElementById("add-list-button").classList.remove("disable_button");
            document.getElementById("list-controls-col-header").classList.add("shrink_controls");




        }
    }

    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }

    setListItemEventListener(listItemid){
        let appModel = this.model;
        let ItemList = document.getElementById('todo-list-item-'+listItemid);
        let eachItemTaskCol = ItemList.childNodes[0];
        let eachItemDueDateCol = ItemList.childNodes[1];
        let eachItemStatusCol = ItemList.childNodes[2];
        let eachItemUp = ItemList.childNodes[3].childNodes[1];
        let eachItemDown = ItemList.childNodes[3].childNodes[3];
        let eachItemRemove = ItemList.childNodes[3].childNodes[5];

        eachItemTaskCol.onclick = function(){
            console.log("clicked Task");
            let textBox = document.createElement("input") ;
            textBox.setAttribute("value", eachItemTaskCol.textContent);
            textBox.setAttribute("type", "text");
            textBox.setAttribute("id","text_input");
            textBox.addEventListener ('focusout',(event) => {
                appModel.addChangingTaskTextTransaction(listItemid,event.target.value);
            });
            
            textBox.onfocus = function(){
                let value = this.value;
                this.value = null;
                this.value = value;
            }
            eachItemTaskCol.replaceWith(textBox);
            textBox.focus();
            

        }

        eachItemDueDateCol.onclick = function(){
            console.log("clicked Due Date");
            let dateBox = document.createElement("input") ;
            dateBox.setAttribute("type","date");
            dateBox.setAttribute("value", eachItemDueDateCol.textContent);
            dateBox.setAttribute("id","date_input");
            dateBox.addEventListener ('focusout',(event) => {
                appModel.addChangingTaskDueDateTransaction(listItemid, event.target.value);
            });
            
            eachItemDueDateCol.replaceWith(dateBox);

            dateBox.focus();

        }

        eachItemStatusCol.onclick = function(){
            console.log("clicked Status" );
            let statusBox =document.createElement("select") ;
            statusBox.setAttribute("id","status_input");
            statusBox.innerHTML = "<option value = 'complete'> complete  </div>"
                                + "<option value = 'incomplete'> incomplete  </div>";
             if (eachItemStatusCol.textContent === "complete"){
                statusBox.selectedIndex = 0;
             }
             else {
                statusBox.selectedIndex = 1;
             }
     
            statusBox.addEventListener ('focusout',(event) => {
                appModel.addChangingTaskStatusTransaction(listItemid, event.target.options[event.target.selectedIndex].value);
            });
            eachItemStatusCol.replaceWith(statusBox);   
            statusBox.focus();                             

        }

        eachItemUp.onmousedown = function(){
            console.log("clicked Up");
            appModel.addMoveUpItemTransaction(listItemid);


        }

        eachItemDown.onmousedown = function(){
            console.log("clicked Down");
            appModel.addMoveDownItemTransaction(listItemid);
        }

        eachItemRemove.onmousedown = function(){
            console.log("clicked Remove");
            appModel.addRemoveItemTransaction(listItemid);
        }

    }
}