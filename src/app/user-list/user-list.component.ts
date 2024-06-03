import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/users-api.service';
import { UserService } from '../services/users.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditCard } from '../create-edit-component/create-edit-card.component';
import { User } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [NgFor, AsyncPipe, CreateEditCard],
})
export class UserList implements OnInit {
  public readonly users$ = this.userService.users$;

  constructor(
    private userApiService: UserApiService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const usersFromLocalStorage = localStorage.getItem('users');
    console.log(usersFromLocalStorage);
    if (
      !usersFromLocalStorage ||
      JSON.parse(usersFromLocalStorage).length === 0
    ) {
      this.userApiService.getUsers().subscribe((data: any[]) => {
        this.userService.setUsers(data);
      });
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  editUser(user: User): void {
    this.openModal(user);
  }

  openModal(user?: User) {
    const isEdit = Boolean(user);
    const dialogRef = this.dialog.open(CreateEditCard, {
      hasBackdrop: true,
      data: {
        user: user || { id: '', name: '', email: '', username: '' },
        isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((newUser) => {
      if (!newUser) return;

      if (isEdit) {
        this.userService.editUser(newUser);
      } else {
        this.userService.addUser(newUser);
      }
    });
  }
}
