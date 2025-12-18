import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [errorMessage, setErrorMessage] = useState('');
  //wave 04
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        setErrorMessage(<section>{error.response.data.message}</section>);
      });
  }, []);


  // wave 03
  const toggleTaskComplete = (taskId) =>{
    setTasks(prevTasks =>{
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          if (task.isComplete){
            axios.patch(`http://localhost:5000/tasks/${task.id}/mark_incomplete`);
          }else{
            axios.patch(`http://localhost:5000/tasks/${task.id}/mark_complete`);
          }
          return { ...task, isComplete: !task.isComplete };
        }
        return task;
      });
    });
  };


  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:5000/tasks/${taskId}`);

    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  };

  return (
    <TaskList
      tasks={tasks}
      onToggleComplete={toggleTaskComplete}
      onDelete={deleteTask}
    />
  );
};

export default App;
