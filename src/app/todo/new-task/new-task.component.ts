import { Component, Input } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';
import { Filter } from 'bad-words';
import Swal from 'sweetalert2';

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

  badWords = [
    'palavrão',
    'merda',
    'bosta',
    'cu',
    'caralho',
    'porra',
    'puta',
    'viado',
    'vagabunda',
    'desgraçado',
    'desgraça',
    'corno',
    'otário',
    'babaca',
    'arrombado',
    'filha da puta',
    'filho da puta',
    'cabrão',
    'idiota',
    'peste',
    'nojento',
    'nojenta',
    'imbecil',
    'safado',
    'safada',
    'prostituta',
    'corna',
    'canalha',
    'escroto',
    'escrota',
  ];

  submitTask() {
    if (!this.newTaskTitle.trim()) return;

    const filter = new Filter();
    filter.addWords(...this.badWords);
    // Verifica cada título para palavras obscenas
    const titles = this.newTaskTitle
      .split('|')
      .map((t) => t.trim())
      .filter((t) => t);

    if (titles.some((title) => filter.isProfane(title))) {
      Swal.fire({
        icon: 'error',
        title: 'Atenção',
        text: 'Não é permitido cadastrar tarefas com palavras obscenas.',
      });
      return;
    }

    if (this.isEditing && this.editingTodoId !== undefined) {
      this.updateTask();
    } else {
      titles.forEach((title) => {
        //add a tarefa
        const newTodo: Todo = {
          id: this.todoService.getTodoNewId(),
          title,
          completed: false,
        };
        this.todoService.addTodo(newTodo);
      });
    }

    this.clearForm();
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
