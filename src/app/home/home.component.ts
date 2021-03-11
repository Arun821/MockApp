import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

import { UserModel } from '../Model/dataModel';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:ServiceService, private dialog:MatDialog) { }

  id:any;
  users: UserModel[] = [];
  user:UserModel = new UserModel(null, null, null, null, null, null);
  displayedColumns: string[] = ['userName', 'email', 'phone', 'gender', 'age', 'action']
  namePattern = "^[a-zA-Z0-9_-]{3,50}$";
  phonePattern = "^((\\91+-?)|0)?[0-9]{10}$";
  agePattern = "^[0-9]{1,3}$";
  genPattern ="^[m|f|M|F]{1}$";

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl('',[
    Validators.required,
    Validators.pattern(this.namePattern)
  ]);
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.phonePattern)
  ]);
  ageFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.agePattern)
  ]);
  genderFormControl = new FormControl('' , [
    Validators.required,
    Validators.pattern(this.genPattern)
  ]);

  ngOnInit(): void {
    this.service.getUser().subscribe(data => {
      this.users = JSON.parse(JSON.stringify(data))
      console.log(this.users);
    })
  }

  // addUser(){
  //   this.service.addUser(this.user)
  //     console.log(this.user);    
  // }

  addUser(){
    console.log(this.user);
    this.service.addUser(this.user).subscribe(res => {
      console.log("Successfully aded");
    })
  }

  // delete(id){
  //   console.log(id);
  //   if(confirm("Do you want delete this item ?")){
  //     this.service.deleteUser(id)
  //   }
  // }

  delete(id){
    if(confirm("Do you want to delete this user ?")){
      this.service.deleteUser(id).subscribe(res => {
        this.users = this.users.filter(item => item.id !== id);
        console.log("Deleted");
      })
    }
  }

  openDialog(id){
    console.log(id)
    // this.dialog.open(DialogComponent, {data: {name: this.users}})
    this.service.singleUser(id).subscribe((data:UserModel) => {
      console.log(data);
    })
  }
}
