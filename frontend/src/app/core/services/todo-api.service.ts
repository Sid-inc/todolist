import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateTodoRequest, TodoItem, UpdateTodRequest } from "../models/todo-item.model";

@Injectable({ providedIn: 'root' })
export class TodoApiService {
  private readonly baseUrl = `${environment.apiUrl}/todos`;
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  public getHttpClient(): HttpClient {
    return this.http;
  }

  public getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.baseUrl, this.httpOptions);
  }

  public getTodo(id: string): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  public createTodo(request: CreateTodoRequest): Observable<{ id:string }> {
    return this.http.post<{ id:string }>(this.baseUrl, request, this.httpOptions);
  }

  public updateTodo(id: string, request: UpdateTodRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, request, this.httpOptions);
  }

  public deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions);
  }
}
