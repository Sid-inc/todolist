import { Component, inject, input, output, signal, OnInit } from '@angular/core';
import { TodoItem } from '../../../core/models/todo-item.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIcon],
  template: `
    <form [formGroup]="todoForm" (ngSubmit)="onSubmit()" class="todo-form">
      <mat-form-field>
        <mat-label>Todo name</mat-label>
        <input matInput formControlName="title" required />
        @if (todoForm.get('title')?.invalid) {
          <mat-error>Name is required</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Todo text</mat-label>
        <input matInput formControlName="description" />
      </mat-form-field>

      <button mat-rised-button color="primary" type="submit" class="todo-form__submit" [disabled]="todoForm.invalid">
        @if (!this.todo()?.id)
          {
            <mat-icon>add</mat-icon>
            Add
          } @else {
            <mat-icon>check</mat-icon>
            Apply
          }
      </button>
    </form>`,
  styleUrl: './todo-form.css',
})
export class TodoForm implements OnInit {
  private formBuilder = inject(FormBuilder);

  todo = input<TodoItem | null>(null);
  submitForm = output<TodoItem>();

  todoForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['']
  });

  ngOnInit(): void {
    if (this.todo()?.id) {
      this.todoForm.setValue({
        title: this.todo()?.title,
        description: this.todo()?.description
      });
    }
  }

  onSubmit(): void {
    if(!this.todoForm.valid)
          return;

    const todoModel: TodoItem = {
      id: this.todo()?.id ?? '',
      title: this.todoForm.value.title,
      description: this.todoForm.value.description || null,
      isCompleted: this.todo()?.isCompleted ?? false,
      createdAt: this.todo()?.createdAt ?? "",
      updatedAt: null
    };

    this.submitForm.emit(todoModel);
    this.todoForm.reset();
  }
}
