import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { TodoItem, UpdateTodRequest } from '../../../core/models/todo-item.model';

@Component({
  selector: 'app-todo-item',
  imports: [MatCardModule, MatCheckboxModule, FormsModule, MatButtonModule, MatIconModule],
  template: `
  <mat-card class="todo-item">
    <mat-card-content class="todo-item__content">
      <mat-checkbox [ngModel]="todo().isCompleted" (ngModelChange)="onToggleComplete($event)">
        <span class="todo-item__title">{{ todo().title }}</span>
      </mat-checkbox>

      @if (todo().description) {
        <p class="todo-item__description">{{ todo().description }}</p>
      }

      <div class="todo-item__actions">
        <button mat-icon-button color="primary" (click)="onEdit()">
          <mat-icon>edit</mat-icon>
        </button>

        <button mat-icon-button color="warn" (click)="onDelete()">
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </mat-card-content>
  </mat-card>`,
  styleUrl: './todo-item.scss',
})
export class TodoItemComponent {
  todo = input.required<TodoItem>();

  update = output<{ id: string; request: UpdateTodRequest }>();
  delete = output<string>();

  onToggleComplete(isCompleted: boolean): void {
    this.update.emit({
      id: this.todo().id,
      request: { isCompleted }
    })
  }

  onEdit(): void {
    const currentTitle = this.todo().title;
    const newTitle = prompt('New name', currentTitle);

    if (newTitle && newTitle !== currentTitle) {
      this.update.emit({
        id: this.todo().id,
        request: { title: newTitle }
      });
    }
  }

  onDelete(): void {
    if (confirm('Delete?')) {
      this.delete.emit(this.todo().id);
    }
  }
}
