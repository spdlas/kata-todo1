import TasksFilter from '../tasks-filter';
import './footer.scss';

const Footer = ({ toDo, onClearAll, filter, onFilterChange }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearAll}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
