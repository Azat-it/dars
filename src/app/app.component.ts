import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserList } from '../app/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserCard } from '../app/user-card/user-card.component';
import { CreateEditCard } from './create-edit-component/create-edit-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserList, HttpClientModule, UserCard, CreateEditCard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'title';
  currentUser: any;
}
