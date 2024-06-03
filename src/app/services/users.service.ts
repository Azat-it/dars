import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user-card/user-card.component';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _users$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this._users$.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadUsersFromLocalStorage();
  }

  // Загружаем пользователей из localStorage при инициализации сервиса
  private loadUsersFromLocalStorage(): void {
    if (this.isBrowser) {
      const usersFromLocalStorage = localStorage.getItem('users');
      if (usersFromLocalStorage) {
        this.setUsers(JSON.parse(usersFromLocalStorage));
      }
    }
  }

  // Сохраняем пользователей в localStorage
  private saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public setUsers(users: User[]): void {
    this._users$.next(users);
    this.saveUsersToLocalStorage(users); // Сохраняем в localStorage
  }

  public deleteUser(userId: number): void {
    const currentUsers = this._users$.getValue();
    const updatedUsers = currentUsers.filter((user) => user.id !== userId);
    this._users$.next(updatedUsers);
    this.saveUsersToLocalStorage(updatedUsers); // Сохраняем в localStorage
  }

  public addUser(newUser: User): void {
    const currentUsers = this._users$.getValue();
    const updatedUsers = [...currentUsers, newUser];
    this._users$.next(updatedUsers);
    this.saveUsersToLocalStorage(updatedUsers); // Сохраняем в localStorage
  }

  public editUser(user: User): void {
    const currentUsers = this._users$.getValue();
    const updatedUsers: User[] = [...currentUsers];
    const index = currentUsers.findIndex(
      (currentUser) => user.id === currentUser.id
    );
    updatedUsers[index] = user;
    this._users$.next(updatedUsers);
    this.saveUsersToLocalStorage(updatedUsers); // Сохраняем в localStorage
  }
}
