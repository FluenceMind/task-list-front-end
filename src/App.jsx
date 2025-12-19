import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';


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

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => {
        const normalizedTasks = response.data.map(task => ({
          id: task.id,
          title: task.title,
          isComplete: task.is_complete
        })); /* so the task is a repelicate of the real data into the desired form and only the things listed out will be recorded into the new task*/

        setTasks(normalizedTasks);
      })
      .catch((error) => {
      /*safe handle error.response?.data?.message (if any .xx is missing will have an error) */
        setErrorMessage(error.response?.data?.message || 'Failed to load tasks');
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


  // wave 05
  const addTask = (title) => {
    axios
      .post ('http://localhost:5000/tasks', {title})
      .then ((response) => {
        const newTask = {
          id: response.data.id,
          title: response.data.title,
          isComplete: response.data.is_complete,
        };

      setTasks((prevTasks) => [newTask, ...prevTasks]);
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.message || 'Failed to create task'
        );
      });
      }
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <NewTaskForm on SubmitTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggleComplete={toggleTaskComplete}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default App;
