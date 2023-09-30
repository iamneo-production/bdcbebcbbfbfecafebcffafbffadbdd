import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../ToDo/TODo'

describe('ToDoList', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('displays the To-Do list title', () => {
    const { getByText } = render(<App />);
    const titleElement = getByText('To-Do List');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays an input field for adding new tasks', () => {
    const { getByPlaceholderText } = render(<App />);
    const inputElement = getByPlaceholderText('Add a new task');
    expect(inputElement).toBeInTheDocument();
  });

  it('allows the user to add a new task', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const inputElement = getByPlaceholderText('Add a new task');
    const addButton = getByText('Add');

    fireEvent.change(inputElement, { target: { value: 'Buy groceries' } });
    fireEvent.click(addButton);

    const taskElement = getByText('Buy groceries');
    expect(taskElement).toBeInTheDocument();
  });

  it('allows the user to mark a task as complete', () => {
    const { getByText, getByTestId } = render(<App />);
    const taskText = 'Complete this task';
    const inputElement = getByTestId('task-input');
    const addButton = getByText('Add');
    const completeButton = getByTestId('complete-button');

    fireEvent.change(inputElement, { target: { value: taskText } });
    fireEvent.click(addButton);

    const taskElement = getByText(taskText);
    expect(taskElement).toBeInTheDocument();

    fireEvent.click(completeButton);

    const completedTaskElement = getByText(taskText);
    expect(completedTaskElement).toHaveClass('completed');
  });

  it('allows the user to delete a task', () => {
    const { getByText, getByTestId, queryByText } = render(<App />);
    const taskText = 'Delete this task';
    const inputElement = getByTestId('task-input');
    const addButton = getByText('Add');
    const deleteButton = getByTestId('delete-button');

    fireEvent.change(inputElement, { target: { value: taskText } });
    fireEvent.click(addButton);

    const taskElement = getByText(taskText);
    expect(taskElement).toBeInTheDocument();

    fireEvent.click(deleteButton);

    const deletedTaskElement = queryByText(taskText);
    expect(deletedTaskElement).toBeNull();
  });
});
