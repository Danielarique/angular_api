import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token: string = '';
  profile: User = {
    id: 0,
    email: '',
    password: '',
    name: ''
  }
  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(product =>{
      this.counter = product.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
   /*  this.authService.login('sebas@gmail.com', '1212').subscribe(rta=>{
      this.token = rta.access_token;
      this.getProfile();
    }); */

    this.authService.loginAndProfile('sebas@gmail.com', '1212').subscribe(rta=>{
      this.profile = rta;
    })
  }

  getProfile(){
    this.authService.profile().subscribe(user=>{
      this.profile = user;
   //   this.profile.email = user.email;
    })
  }

}
