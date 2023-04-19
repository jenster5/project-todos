/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { tasks } from './Reducers/tasks';

const AddTasks = () => {
  const [inputValue, setInputValue] = useState('');
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTask = { id: Date.now().toString(),
      name: inputValue,
      isListed: true };
    dispatch(tasks.actions.AddTasks(newTask));
    setInputValue('');
    setClicked(true);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setClicked(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [clicked]);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Wrapper>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="addtodotask">
          <Input value={inputValue} onChange={(event) => setInputValue(event.target.value)} id="addtodotask" type="text" required />
          <ReactDatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
        </label>
        <StyledButton type="submit" clicked={clicked}>Add To List</StyledButton>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  height:48px;
  width:70vw;
  border-radius: 5px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StyledButton = styled.button`
  height:48px;
  font-family: 'Dongle', sans-serif;
  font-size: 1.5rem;
  background-color: ${({ clicked }) => (clicked ? '#005F6B' : 'white')};
  color: black;
  border: none;
  padding:0px 10px; 
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left:30%;

  &:hover {
    background-color: #005F6B;
  }
`;

export default AddTasks;