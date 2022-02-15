import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService, AuthService]
})

export class TasksComponent implements OnInit {
  tasks: any;
  taskname!: string;
  date!: string;

  constructor(private taskservice: TaskService, private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log("TasksComponent ngOnInit: " + localStorage.getItem('accesstoken'))
    if (localStorage.getItem('accesstoken') == null){
      this.router.navigateByUrl('/');
    }
    else{
    this.taskservice.getTasks()
      .subscribe((data) => {
        this.tasks = data;
        console.log(this.tasks);
      })
    }
  }

  addTask() {
    const newTask = {
      taskname: this.taskname,
      date: this.date
    }
    this.taskservice.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.ngOnInit()
      })
  }

  updateTask(id: any) {
    this.taskservice.updateTask(id).subscribe(data => {
      console.log("task marked as finised")
      this.ngOnInit()
    })
  }

  deleteTask(id: any) {
    this.taskservice.deleteTask(id).subscribe(data => {
      console.log("task is deleted")
      this.ngOnInit()
    })
  }

  userLogout() {
    this.authservice.userLogout().subscribe(data => {
      console.log("successfully logout")
      this.router.navigateByUrl('/');
    })
  }

}
