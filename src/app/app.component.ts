import { Component } from '@angular/core';

import { Product } from './models/product.model';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}
  onLoaded(img: string) {}

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService
      .create({
        name: 'Sebas',
        email: 'sebas@gmail.com',
        password: '1212',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  login() {
    this.authService.login('sebas@gmail.com', '1212').subscribe(rta=>{
      console.log(rta)
     // this.token = rta.access_token;
    });
  }

  getProfile(){
    this.authService.profile().subscribe(profile=>{
      console.log(profile)
    })
  }
}
