import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateUserDTO, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private api = `${environment.path}/api/users`;
  constructor(private http: HttpClient) {}

  create(dto: CreateUserDTO) {
    return this.http.post<User>(this.api, dto);
  }

  getAll(){
    return this.http.get<User[]>(this.api)
  }
}
