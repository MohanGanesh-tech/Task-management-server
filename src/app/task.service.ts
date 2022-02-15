import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) {
    console.log("TaskService: "+ localStorage.getItem('accesstoken'))
  }

  getTasks() {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('accesstoken')}`);
    return this.http.request('GET', 'http://localhost:3000/api/tasks', { responseType: 'json', headers: headers, });
  }

  addTask(newTask: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('accesstoken')}`);
    return this.http.request('POST', 'http://localhost:3000/api/tasks', { responseType: 'json', headers: headers, body: newTask });
  }

  updateTask(id: string) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('accesstoken')}`);
    return this.http.request('PATCH', 'http://localhost:3000/api/tasks/' + id, { responseType: 'json', headers: headers, });
  }

  deleteTask(id: string) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('accesstoken')}`);
    return this.http.request('DELETE', 'http://localhost:3000/api/tasks/' + id, { responseType: 'json', headers: headers, });
  }
}
