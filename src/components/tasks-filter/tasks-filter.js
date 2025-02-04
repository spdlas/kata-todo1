import React, { Component } from 'react';
import './tasks-filter.scss';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: 'all',
  };

  static propTypes = {
    filter: PropTypes.oneOf(['all', 'active', 'done']).isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const buttonClass = isActive ? 'selected' : '';
      return (
        <li key={name}>
          <button className={buttonClass} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }
}
