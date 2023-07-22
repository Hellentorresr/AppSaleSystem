import { Injectable } from '@angular/core';

//
import { MatSnackBar } from '@angular/material/snack-bar'; //To display simple alerts
import { Session } from '../Interfaces/session'; // where I have the session schema defined

//
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  //injecting the small alerts
  constructor(private _snackBar: MatSnackBar, private jwtHelper: JwtHelperService) { }

  //
  showAlert(message: string, type: string) {
    this._snackBar.open(message, type, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });

  }

   //saving Token
  saveUserSession(token: string) {
    localStorage.setItem('token', token); ////I will change this to work with JWT-- //user key name 
  }

  getUserSession(): Session | null {
    const token = localStorage.getItem('token'); // Token key name
    if (!token) {
      return null; // Token not found, return null or handle accordingly
    }
    const session: Session = this.extractTokenInformation(token);
    return session;
  }


  // Method to extract token information
  extractTokenInformation(token: string): Session {
    const decodedToken = this.jwtHelper.decodeToken(token);

    // Now you can access the information sent in the token
    const userId = decodedToken['nameid'];
    const fullName = decodedToken['unique_name'];
    const email = decodedToken['email'];
    const role = decodedToken['role'];

    const session: Session = {
      idUser: userId,
      fullName: fullName,
      email: email,
      rolDescription: role
    }
    return session;
  }

  deleteSession() {
    localStorage.removeItem('token');//user key name 
  }
}