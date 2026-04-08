import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { TodoStoreService } from '../../services/todo-store.service';
import { CreateTodoRequest } from '../../../core/models/todo-item.model';

@Component({
  selector: 'app-todo-list',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatListModule
],
  template: `<div class="todo-container">
    <mat-card>
      <mat-card-title>Todo list</mat-card-title>
      <mat-card-content>
        <form [formGroup]="todoForm" (ngSubmit)="onSubmit()" class="todo-form">
          <mat-form-field>
            <mat-label>Todo name</mat-label>
            <input matInput formControlName="title" required />
            @if (todoForm.get('title')?.invalid)
            {
              <mat-error>Name is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field>
            <mat-label>Todo text</mat-label>
            <input matInput formControlName="description" />
          </mat-form-field>

          <button mat-rised-button color="primary" type="submit" [disabled]="todoForm.invalid">
            <mat-icon>add</mat-icon>
            Add
          </button>
        </form>

        @if (loading()) {
          <div>
            <mat-spinner diameter="50"></mat-spinner>
          </div>
        }

        @if(error()) {
          <mat-card class="card-error">
            <mat-card-content>
              <mat-icon color="warn">error</mat-icon>
              <span>{{ error()?.message }}</span>
            </mat-card-content>
          </mat-card>
        }

        @if (!loading() && !error()) {
          <mat-list class="todo-list">
            @for (todo of todos(); track todo.id) {
              {{ todo.title }}
            } @empty {
              <mat-list-item>Empty</mat-list-item>
            }
          </mat-list>
        }
      </mat-card-content>
    </mat-card>
  </div>`,
  styleUrl: './todo-list.scss',
})
export class TodoList implements OnInit {
  private todoStore = inject(TodoStoreService);
  private formBuilder = inject(FormBuilder);

  todos = this.todoStore.todos;
  loading = this.todoStore.loading;
  error = this.todoStore.error;

  todoForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['']
  });

  ngOnInit(): void {
    this.todoStore.reloadTodos();
  }

  onSubmit(): void {
    if(!this.todoForm.valid)
      return;

    const request: CreateTodoRequest = {
      title: this.todoForm.value.title,
      description: this.todoForm.value.description || null
    }
    this.onCreate(request);
    this.todoForm.reset();
    this.todoForm.markAsPristine();
  }

  onCreate(request: CreateTodoRequest) {
    this.todoStore.addTodo(request);
  }
}
