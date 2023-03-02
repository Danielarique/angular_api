import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = `${environment.path}/api/auth`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.api}/login`, { email, password }).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.access_token);
      })
    );
  }

  profile() {
    return this.http.get<User>(`${this.api}/profile`, {
     /*  headers: {
        Authorization: `Bearer ${token}`,
      }, */
    });
  }
  /*  return this.getProduct(3)
    .pipe(switchMap((product:any)=>this.update(product.id,{title:(product.price).toString()})),) */
  loginAndProfile(email: string, password: string) {
    return this.login(email, password).pipe(
      switchMap(() => this.profile())
    );
  }
}
