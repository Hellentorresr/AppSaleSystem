import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';//to receive data through this Modal
import { Rol } from 'src/app/Interfaces/rol';
import { User } from 'src/app/Interfaces/user';

import { RolService } from 'src/app/Services/rol.service';
import { UserService } from 'src/app/Services/user.service';
import { UtilityService } from 'src/app/Reusable/utility.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {
  userForm: any;
  hidePassword: boolean = true;
  actionName: string = 'Create'; // as befault is create but also will be update
  actionButton: string = 'Save'; // could also be defined as Edit
  rolList: Rol[] = [];

  constructor(private actualModal: MatDialogRef<ModalUserComponent>,    //MatDialogRef<ModalUserComponent>, Meaning reconize this class as modal
    @Inject(MAT_DIALOG_DATA) public userData: User, fb: FormBuilder, //injeting 'MAT_DIALOG_DATA' as dependency using The @Inject decorator
    private _rolService: RolService, private _userService: UserService, private _utilityService: UtilityService) {

    this.userForm = fb.group({
      fullName: ['', [Validators.required, Validators.minLength(8)]],
      email: ["", [Validators.required, Validators.email]],
      idRol: ['', Validators.required],
      password: [''],
      active: ['1', Validators.required]
    });

    if (this.userData) { this.actionName = 'Edit', this.actionButton = 'Update' }; //if userData has values
    //getting the rol list to show it in the select
    this._rolService.List().subscribe({
      next: (data) => { if (data.status) this.rolList = data.value }, //if status == true
      error: (error: any) => console.error('Error fetching roles:', error)
    });
  }

  /*The ngOnInit() method is a lifecycle hook that is called after the component has been initialized
   and its dependencies have been resolved. It is commonly used for initialization tasks or to fetch data from APIs.*/
  ngOnInit(): void {
    //if the dataUser var has data, means that the modal it show Edit, 
    if (this.userData) {
      this.userForm.patchValue({ //  method from FormGroup class. It is used to update the values of the form controls within a form group.
        fullName: this.userData.fullName,
        email: this.userData.email,
        idRol: this.userData.idRol,
        password: this.userData.password,
        active: this.userData.active.toString()
      });
    }
  }

  //method to update or create an user
  createOrUpdate_User() {
    const _user: User = {
      idUser: this.userData ? this.userData.idUser : 0,
      fullName: this.userForm.value.fullName,
      email: this.userForm.value.email,
      idRol: this.userForm.value.idRol,
      rolDescription: '',
      password: this.userForm.value.password,
      active: parseInt(this.userForm.value.active)
    }

    if (this.userData) { //update
      this._userService.Update(_user).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilityService.showAlert('The user was updated successfully', 'Great!');
            this.actualModal.close('true');
          } else {

            this._utilityService.showAlert('The user was not updated', 'Error')
          }

        },
        error: () => this._utilityService.showAlert('The user was not updated', 'Error')
      });


    } else { //create

      this._userService.Create(_user).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilityService.showAlert('The user was created succesfully', 'Great!');
            this.actualModal.close('true');
          }
          else {
            this._utilityService.showAlert(data.message, 'Error');
          }
        },

        error: () => this._utilityService.showAlert('The user was not created', 'Error')

      });
    }
  }

  get fc() {
    return this.userForm.controls;//retorning all the instances = properties
  }
}
