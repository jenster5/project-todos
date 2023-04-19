import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import { tasks } from './Reducers/tasks';

export const TaskList = () => {
  const taskList = useSelector((store) => store.tasks.items)
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (id) => {
    const currentIndex = checkedItems.indexOf(id);
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(id);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }
    setCheckedItems(newCheckedItems);
  };

  const dispatch = useDispatch();
  const deleteTask = (taskId) => {
    dispatch(tasks.actions.RemoveToDo(taskId));
  }

  return (
    <Wrapper>
      <ul>
        {taskList.map((singleTask) => {
          const isChecked = checkedItems.includes(singleTask.id);
          return (
            <li key={singleTask.id}>
              <input
                type="checkbox"
                id={singleTask.id}
                name="taskList"
                value={singleTask.id}
                checked={isChecked}
                onChange={() => handleCheckboxChange(singleTask.id)} />
              <label htmlFor={singleTask.id}>{singleTask.name}</label>
              <Deletebtn type="button" onClick={() => deleteTask(singleTask.id)}>
                <FaTrash />
              </Deletebtn>
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
};

const Wrapper = styled.section`
ul{
  list-style: none;
  margin:0;
  padding:10px;
}
li {
  font-family: 'Dongle', sans-serif;
  font-weight: 100;
  font-size: 2rem;
  margin:10px;
  display: flex;
  align-items: center;
}
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #F5F1E3;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  margin:10px;
}

input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: #F5F1E3; /* change this to the color you want */
}

input[type="checkbox"]:checked::before {
  content: "✔";
  font-size: 12px;
  color: #1B9AAA;
  text-align: center;
  line-height: 12px;
}

`
const Deletebtn = styled.button`
height:3rem;
color:#DDDBCB;
background-color: #1B9AAA;
border:none;`
