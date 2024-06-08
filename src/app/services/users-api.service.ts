import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/users'; // Объявление базового URL

  constructor(private http: HttpClient) {} // Инжектирование HttpClient для выполнения HTTP запросов

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
