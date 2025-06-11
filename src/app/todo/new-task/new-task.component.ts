import { Component, Input } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  newTaskTitle: string = '';
  isEditing: boolean = false;
  editingTodoId?: number;

  constructor(private todoService: TodoService) {}

  submitTask() {
    if (!this.newTaskTitle.trim()) return;

    this.isEditing && this.editingTodoId !== undefined
      ? this.updateTask()
      : this.addTask();

    this.clearForm();
  }

  private addTask(): void {
    const newTodo: Todo = {
      id: this.todoService.getTodoNewId(),
      title: this.newTaskTitle,
      completed: false,
    };
    this.todoService.addTodo(newTodo);
  }

  private updateTask(): void {
    const updatedTodo: Todo = {
      id: this.editingTodoId!,
      title: this.newTaskTitle,
      completed: false,
    };
    this.todoService.updateTodo(updatedTodo);
  }

  private clearForm(): void {
    this.newTaskTitle = '';
    this.isEditing = false;
    this.editingTodoId = undefined;
  }

  startEditing(todo: Todo): void {
    this.newTaskTitle = todo.title;
    this.editingTodoId = todo.id;
    this.isEditing = true;
  }
}
