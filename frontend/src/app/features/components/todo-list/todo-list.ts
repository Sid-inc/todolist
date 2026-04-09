import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { TodoStoreService } from '../../services/todo-store.service';
import { CreateTodoRequest, TodoItem, UpdateTodRequest } from '../../../core/models/todo-item.model';
import { TodoItemComponent } from '../todo-item/todo-item';
import { TodoForm } from '../todo-form/todo-form';

@Component({
  selector: 'app-todo-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatListModule,
    TodoItemComponent,
    TodoForm
  ],
  template: `<div class="todo-container">
    <mat-card>
      <mat-card-title class="todo-container__title">Todo list</mat-card-title>
      <mat-card-content>
        <app-todo-form (submitForm)="onSubmit($event)"/>

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
              <app-todo-item
                class="todo-list__item"
                [todo]="todo"
                (delete)="onDelete($event)"/>
                <!-- (update)="onUpdate($event)" -->
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

  todos = this.todoStore.todos;
  loading = this.todoStore.loading;
  error = this.todoStore.error;

  ngOnInit(): void {
    this.todoStore.reloadTodos();
  }

  onSubmit(item: TodoItem): void {
    if(item.id !== "") {
      const updateRequest: UpdateTodRequest = {
        title: item.title,
        description: item.description || undefined
      }
      this.onUpdate(item.id, updateRequest);
    } else {
      const createRequest: CreateTodoRequest = {
        title: item.title,
        description: item.description || null
      }
      this.onCreate(createRequest);
    }
  }

  onCreate(request: CreateTodoRequest): void  {
    this.todoStore.addTodo(request);
  }

  onUpdate(id: string, request: UpdateTodRequest): void  {
    this.todoStore.updateTodo(id, request);
  }

  onDelete(id:string): void  {
    this.todoStore.deleteTodo(id);
  }
}
