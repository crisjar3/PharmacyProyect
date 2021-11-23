import { Component } from "@angular/core";
import { DialogPosition, MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl:'Dialog_delete.html'
})
export class dialogdelete{
    constructor(
        public dialogref:MatDialogRef<dialogdelete>){

    }
}