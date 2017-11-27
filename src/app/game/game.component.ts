import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login.service";
import {Router} from "@angular/router";
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  sum: number;
  message : string ;
  random : number;
  loggedDetails : string ;
  loggedObj :{AccountBalance:number, Name:string, BlockedAmount:number, EmailId:string};
  inpbox : number[];
  multiple : number ;
  balance:number ;

  constructor( private request : LoginService, private router: Router) { }
  ngOnInit() {
    this.loggedDetails  = Cookie.get('loggedDetails');
    this.loggedObj = JSON.parse(this.loggedDetails);
    this.request.LoginAccess(this.loggedObj.EmailId)
      .subscribe(data =>{
        Cookie.set('loggedDetails', JSON.stringify(data));
        this.balance = data.AccountBalance;
      });

    this.inpbox =  [0 ,0 ,0 ,0,0,0,0,0];
  }

  setCookie(){
    Cookie.set("loggedDetails", null);
  }

  playGame(user, where){
    var win = false;
    this.random = Math.floor((Math.random() * 36) + 0);
    if((this.random == 0) && where == 3){
      this.multiple = 10;
      win = true;
    }
    else if((this.random >= 1 && this.random <= 12) && where == 0){
      this.multiple = 1.5;
      win = true;
    }
    else if((this.random >= 13 && this.random <= 24) && where == 1){
      this.multiple = 1.5;
      win = true;
    }
    else if((this.random >= 25 && this.random <= 36) && where == 2){
      this.multiple = 1.5;
      win = true;
    }
    else if((this.random >= 1 && this.random <= 18) && where == 4){
      this.multiple = 1.25;
      win = true;
    }
    else if((this.random >= 19 && this.random <= 36) && where == 5){
      this.multiple = 1.25;
      win = true;
    }
    else if((this.random %2 == 0) && where == 6){
      this.multiple = 1.25;
      win = true;
    }
    else if((this.random %2 != 0) && where == 7){
      this.multiple = 1.25;
      win = true;
    }
    else{
      this.multiple = 0;
      win = false;
    }
    this.request.addmoney(user, this.multiple)
      .subscribe(data =>{
        this.balance = data.AccountBalance;
      });
    if(win){
      this.message = "You Win"
    }
    else{
      this.message = "You Lose"
    }
    (<HTMLInputElement>(document.getElementById("result"))).click();
  }
  Reset(){
    location.href = "/home";
  }
  block(){
    var wherePlaced : number;
    var email = JSON.parse(this.loggedDetails).EmailId;
    let counter = 0;
    this.sum = 0;
    for(var i=0; i < this.inpbox.length;i++){
      if(this.inpbox[i] != 0){
        counter++;
        wherePlaced = i;
        this.sum += this.inpbox[i];
      }
    }
    if(counter == 1){
      if(this.sum % 500 != 0){
        (<HTMLInputElement>(document.getElementById("multipleOf"))).click();
      }
      else{
        let user = {
          emailid : email,
          amount: this.sum
        }
        if(this.sum > this.balance){
          (<HTMLInputElement>(document.getElementById("lessAmount"))).click();
        }
        else {
          this.request.block(user)
            .subscribe(data => {
              this.playGame(user, wherePlaced);
            });
        }
      }
    }
    else{
      (<HTMLInputElement>(document.getElementById("selectOne"))).click();
    }


  }


}
