import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: newTodoTitle,
      completed: false,
    };

    this.todoService.addTodo(newTodo);
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }

  clearAll() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente limpar todas as tarefas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (this.todos.length > 0 && result.isConfirmed) {
        this.todoService.clearAll();
        this.loadTodos();
      }
    });
  }

  clearCompletedTasks() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente limpar as tarefas concluídas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.clearCompletedTasks();
        this.loadTodos();
      }
    });
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  filteredTodos() {
    return this.showCompletedTasks
      ? this.todos
      : this.todos.filter((todo) => !todo.completed);
  }

  sortTodosAZ(): void {
    this.todos.sort((a, b) =>
      a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' })
    );
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Lista de Tarefas', 10, 10);

    let y = 20;
    this.filteredTodos().forEach((todo, index) => {
      const status = todo.completed ? '[Concluída]' : '[Pendente]';
      doc.text(`${index + 1}. ${todo.title} ${status}`, 10, y);
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save('lista-de-tarefas.pdf');
  }

  get labelClearAll() {
    return 'Limpar Todas as Tarefas';
  }
}
