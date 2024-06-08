import { User } from '../user-card/user-card.component';
import { UserState } from '../NGRX/state';
import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { USER_KEY } from '../NGRX/reducer';

export const featureSelector = createFeatureSelector<UserState>('user');

export const usersSelector = createSelector(
  featureSelector,
  (state) => state.users
);

export const loadingSelector = createSelector(
  featureSelector,
  (state) => state.loading
);
