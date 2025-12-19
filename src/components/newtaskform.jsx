import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';


const EmptyTask = {title: '', isComplete:'false'};

const NewTaskForm = ({ onSubmitTask }) => {
  const [taskData, setTaskData] = useState(EmptyTask);


  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = taskData.title.trim();
    if (!trimmedTitle) return;

    setTaskData(EmptyTask);
    onSubmitTask({...taskData,isComplete: taskData.isComplete === 'true'});
  };

  const handleChange = (e) =>{
    const field = e.target.name;
    const value = e.target.value;
    setTaskData(oldData =>({...oldData,[field]:value}));
  };

  return(
    <section>
      <h2> Add a Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='taskTitle'>Title:</label>
          <input
            type='text'
            id ='taskTitle'
            name ='title'
            value ={taskData.title}
            onChange={handleChange}
            placeholder="New task"/>
        </div>
        <label htmlFor='taskComplete'>isComplete:</label>
        <select id = 'taskComplete' name = 'isComplete' value = {taskData.isComplete} onChange={handleChange}>
          <option value='false'>No</option>
          <option value='true'>Yes</option>
        </select>
        <div>
          <button className = 'form submit' type='submit'>Add Task</button>
        </div>
      </form>
    </section>
  );
};


NewTaskForm.propTypes = {
  onSubmitTask: PropTypes.func.isRequired};

export default NewTaskForm;