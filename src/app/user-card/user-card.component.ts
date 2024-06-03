import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

export interface User {
  id: any;
  name: any;
  email: string;
  username: string;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCard implements OnInit {
  @Input() user!: User;
  @Output() deleteUserRequest = new EventEmitter<number>(); // Создание события удаления пользователя

  title = 'title';
  constructor() {}

  ngOnInit(): void {}
}
