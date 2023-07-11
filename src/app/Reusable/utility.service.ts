import { Injectable } from '@angular/core';

//
import { MatSnackBar } from '@angular/material/snack-bar'; //To display simple alerts
import { Session } from '../Interfaces/session'; // where I have the session schema defined

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  //injecting the small alerts
  constructor(private _snackBar: MatSnackBar) { }

  //
  showAlert(message: string, type: string) {
    this._snackBar.open(message, type, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });

  }

  //
  saveUserSession(userSession: Session) {
    localStorage.setItem('user', JSON.stringify(userSession)); ////I will change this to work with JWT-- //user key name 
  }

  getUserSession() {
    const dataAsString = localStorage.getItem("user"); //user key name 

    const user = JSON.parse(dataAsString!); // exclamation mark = not null

    return user;
  }

  deleteSession(){
    localStorage.removeItem('user');//user key name 
  }

}
