import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  recievedUser;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ) {
    this.recievedUser = data;
   }

  ngOnInit(): void {
  }

}
