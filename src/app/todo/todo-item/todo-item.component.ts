import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() deletedTodo: EventEmitter<number> = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  deleteTodo(): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente remover essa tarefa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodo(this.todo.id);
      }
    });
  }

  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }

  onEdit() {
    this.edit.emit(this.todo);
  }
}
