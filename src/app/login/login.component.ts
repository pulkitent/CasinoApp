import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor( private request : LoginService, private router: Router) { }
  title = 'Roulette';
  lognotsuccess : boolean = false;
  ngOnInit() {

  }
  loginUser(username) {
    this.request.LoginAccess(username)
      .subscribe(data => {
        if (data.Name == null) {
          this.lognotsuccess = true;
        } else {
          Cookie.set('loggedDetails', JSON.stringify(data));
          this.router.navigateByUrl('/home', data.id);
        }
      });
  }
}
