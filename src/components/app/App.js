import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.scss';

export default class App extends Component {
  static defaultProps = {
    todoTasks: [],
    filter: 'all',
  };

  static propTypes = {
    todoTasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
        dateStamp: PropTypes.instanceOf(Date).isRequired,
      })
    ).isRequired,
    filter: PropTypes.oneOf(['all', 'active', 'done']).isRequired,
  };

  maxId = 0;

  state = {
    todoTasks: [
      this.createTask('Completed task'),
      this.createTask('Active task'),
      this.createTask('Another task'),
      this.createTask('Another task'),
    ],
    filter: 'all', //active, all, done
  };
  // Создаем задачу в стейт
  createTask(label) {
    return {
      label,
      done: false,
      id: this.maxId++,
      dateStamp: Date.now(),
    };
  }

  // Удаление задачи
  deleteTask = (id) => {
    this.setState(({ todoTasks }) => {
      const idx = todoTasks.findIndex((el) => el.id === id);
      const newArr = [...todoTasks.slice(0, idx), ...todoTasks.slice(idx + 1)];
      return {
        todoTasks: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }
  // Выполнение задачи
  onToggleDone = (id) => {
    this.setState(({ todoTasks }) => {
      return {
        todoTasks: this.toggleProperty(todoTasks, id, 'done'),
      };
    });
  };

  // Очистить все
  onClearAll = () => {
    this.setState(({ todoTasks }) => {
      return {
        // Не забываем что фильтр возвращает новый массив
        todoTasks: todoTasks.filter((el) => !el.done),
      };
    });
  };

  // Добавляем задачу
  addTask = (text) => {
    const newTask = this.createTask(text);
    this.setState(({ todoTasks }) => {
      const newArr = [...todoTasks, newTask];
      return {
        todoTasks: newArr,
      };
    });
  };

  // Фильтрация задачи
  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filters = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  render() {
    const { todoTasks, filter } = this.state;

    // Отрисовка задач
    const visibleTasks = this.filters(todoTasks, filter);

    const doneCount = todoTasks.filter((el) => el.done).length;
    const moreCount = todoTasks.length - doneCount;
    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addTask} />
        <section className="main">
          <TaskList tasks={visibleTasks} onDeleted={this.deleteTask} onToggleDone={this.onToggleDone} />
          <Footer onClearAll={this.onClearAll} toDo={moreCount} filter={filter} onFilterChange={this.onFilterChange} />
        </section>
      </section>
    );
  }
}
