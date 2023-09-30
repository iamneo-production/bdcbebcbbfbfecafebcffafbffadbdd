import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App'; 

describe('ToDoList', () => {
  it('renders_without_crashing', () => {
    render(<App />);
  });

  it('displays_the_To_Do_list_title', () => {
    const { getByText } = render(<App />);
    const titleElement = getByText('To-Do List');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays_an_input_field_for_adding_new_tasks', () => {
    const { getByPlaceholderText } = render(<App />);
    const inputElement = getByPlaceholderText('Add a new task');
    expect(inputElement).toBeInTheDocument();
  });

  it('allows_the_user_to_add_a_new_task', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const inputElement = getByPlaceholderText('Add a new task');
    const addButton = getByText('Add');

    fireEvent.change(inputElement, { target: { value: 'Buy groceries' } });
    fireEvent.click(addButton);

    const taskElement = getByText('Buy groceries');
    expect(taskElement).toBeInTheDocument();
  });

  it('allows_the_user_to_mark_a_task_as_complete', () => {
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

  it('allows_the_user_to_delete_a_task', () => {
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
