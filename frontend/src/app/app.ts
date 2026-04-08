import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TodoList } from "./features/components/todo-list/todo-list";

@Component({
  selector: 'app-root',
  imports: [MatIconModule, TodoList],
  template: '<app-todo-list/>',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('todo-app');
}
