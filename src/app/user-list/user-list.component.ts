import { Component, OnInit, inject } from '@angular/core';
import { UserApiService } from '../services/users-api.service';
import { UserService } from '../services/users.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditCard } from '../create-edit-component/create-edit-card.component';
import { User } from '../user-card/user-card.component';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from '../NGRX/actions';
import * as selectUser from '../NGRX/selector';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [NgFor, AsyncPipe, CreateEditCard],
})
export class UserList implements OnInit {
  public users$?: Observable<User[]>;
  public loadingUsers$?: Observable<User[]>;

  private store = inject(Store);

  constructor(
    private userApiService: UserApiService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(selectUser.usersSelector));
    this.loadingUsers$ = this.store.pipe(select(selectUser.loadingUsers$));

    this.store.subscribe((state) => {
      console.log(state);
    });

    this.users$.subscribe((users) => {
      console.log('Current Users:', users);
    });

    const usersFromLocalStorage = localStorage.getItem('users');
    if (
      !usersFromLocalStorage ||
      JSON.parse(usersFromLocalStorage).length === 0
    ) {
      this.userApiService.getUsers().subscribe((data: any[]) => {
        this.store.dispatch(UserActions.loadUsers()); // Загружаем пользователей
      });
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id); // Используем сервис
  }

  editUser(user: User): void {
    this.openModal(user);
  }

  openModal(user?: User) {
    const isEdit = Boolean(user);
    const dialogRef = this.dialog.open(CreateEditCard, {
      hasBackdrop: true,
      data: {
        user: user ?? { id: '', name: '', email: '', username: '' },
        isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((newUser) => {
      if (!newUser) return;

      // Приведение типов данных
      newUser.id = +newUser.id;

      console.log('User to save:', newUser);

      if (isEdit) {
        this.userService.editUser(newUser);
      } else {
        this.userService.addUser(newUser);
      }
    });
  }
}
