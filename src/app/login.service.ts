import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map';

const header = {headers: new Headers({'Content-Type': 'application/json'})};
const BASE_URL = "http://localhost:51869/api/UserApi/";


@Injectable()
export class LoginService {

  constructor(private http: Http) { }
  LoginAccess(username) {
    return this.http.get(BASE_URL+"GetUserByEmailID?email="+username)
      .map((res)=> {
        console.log(res.json().Name);
        return res.json();
      });
  }

  block(user){
    return this.http.patch(BASE_URL+"BlockBetAmount?email="+user.emailid+"&betAmount="+user.amount , user, header)
      .map(res =>res.json())
  }

  addmoney(user, multiple){
    console.log(user.AccountBalance);
    return this.http.patch("http://localhost:51869/api/UserApi/AddWinningPrize?email="+user.emailid+"&betAmount="+user.amount+"&multiplyFactor="+multiple
      , user, header)
      .map(res =>res.json())
  }
}
