import { User } from '../user-card/user-card.component';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}
