import { inject, Injectable, signal } from "@angular/core";
import { TodoApiService } from "../../core/services/todo-api.service";
import { CreateTodoRequest, TodoItem, UpdateTodRequest } from "../../core/models/todo-item.model";
import { firstValueFrom } from "rxjs";
import { rxResource } from "@angular/core/rxjs-interop";

@Injectable({ providedIn: 'root' })
export class TodoStoreService {
  private readonly todoApi = inject(TodoApiService);

  private todosResource = rxResource<TodoItem[], void>({
    stream: () => this.todoApi.getTodos(),
    defaultValue: []
  });

  public readonly todos = this.todosResource.value;
  public readonly loading = this.todosResource.isLoading;
  public readonly error = this.todosResource.error;

  public reloadTodos(): void {
    this.todosResource.reload();
  }

  public async addTodo(request: CreateTodoRequest): Promise<void> {
    try {
      await firstValueFrom(this.todoApi.createTodo(request));
      this.reloadTodos();
    } catch (error) {
      console.error('adding error', error)
    }
  }

  public async updateTodo(id: string, request: UpdateTodRequest): Promise<void> {
    try {
      await firstValueFrom(this.todoApi.updateTodo(id, request));
      this.reloadTodos();
    } catch (error) {
      console.error('update error', error)
    }
  }

  public async deleteTodo(id: string): Promise<void> {
try {
      await firstValueFrom(this.todoApi.deleteTodo(id));
      this.reloadTodos();
    } catch (error) {
      console.error('delete error', error)
    }
  }
}
