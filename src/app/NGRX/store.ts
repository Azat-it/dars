// src/app/NGRX/store.ts
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { User } from '../user-card/user-card.component';
import * as UserActions from './actions';

export interface AppState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUserSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(UserActions.editUser, (state, { editedUser }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    ),
  })),
  on(UserActions.deleteUser, (state, { userId }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId),
  }))
);

// export const reducers: ActionReducerMap<AppState> = {
//   userState: userReducer,
// };
