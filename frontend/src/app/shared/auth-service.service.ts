import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  CurrentUserSig = signal<UserInterface | undefined | null>(undefined);
}
