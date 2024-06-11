import { Component, Inject } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { User } from '../user-card/user-card.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-card',
  templateUrl: './create-edit-card.component.html',
  styleUrls: ['./create-edit-card.component.scss'],
  standalone: true,
  imports: [FormsModule, MatDialogModule, ReactiveFormsModule],
})
export class CreateEditCard {
  isEdit: boolean;

  form = new FormGroup({
    name: new FormControl(''),
    id: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
  });
  constructor(
    // MAT_DIALOG_DATA private readonly user?: User
    @Inject(MAT_DIALOG_DATA) private data: { user: User; isEdit: boolean },
    private dialogRef: MatDialogRef<CreateEditCard>
  ) {
    this.form.patchValue(data?.user);
    this.isEdit = data.isEdit;
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }
}
