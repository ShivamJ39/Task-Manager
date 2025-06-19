import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router'; // <-- Add this import

interface Task {
  title: string;
  status?: 'active' | 'completed'; // status is optional
  editing?: boolean;
  subtasks?: Task[];
  newSubtask?: string;
  showSubtaskInput?: boolean;
  completed?: boolean; 
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task Manager';
  newTask = '';
  tasks: Task[] = [];

  constructor() {
  
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  }

  filter: 'all' | 'active' | 'completed' = 'all';
  selectedTaskIndex: number | null = null; 

  addTask() {
    if (this.newTask && this.newTask.trim()) {
      this.tasks.push({ title: this.newTask.trim(), subtasks: [] });
      this.newTask = '';
   
    }
  }

  toggleActive(task: Task) {
    task.status = task.status === 'active' ? undefined : 'active';

  }

  toggleCompleted(task: Task) {
    task.status = task.status === 'completed' ? undefined : 'completed';
  
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  filteredTasks() {
    if (this.filter === 'active') {
      return this.tasks.filter(t => t.status === 'active');
    } else if (this.filter === 'completed') {
      return this.tasks.filter(t => t.status === 'completed');
    }
    return this.tasks;
  }

 
  editTask(task: Task) {
    task.editing = true;
    if (task.newSubtask === undefined) task.newSubtask = '';
  }

  doneEdit(task: Task) {
    task.editing = false;
    if (!task.title.trim()) {
      this.removeTask(this.tasks.indexOf(task));
    }
  }

  addSubtask(parentTask: Task, subtaskTitle: string) {
    if (!parentTask.subtasks) parentTask.subtasks = [];
    if (subtaskTitle && subtaskTitle.trim()) {
      parentTask.subtasks.push({ title: subtaskTitle.trim() });
    }
  }

  removeSubtask(parent: Task, index: number) {
    parent.subtasks?.splice(index, 1);
  }

  toggleSubtaskCompleted(task: Task, subtask: any) {
    subtask.completed = !subtask.completed;
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
