import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onSubmitTask }) => {
    const [taskData, setTaskData] = useState({
        title: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedTitle = taskData.title.trim();
        if (!trimmedTitle) return;

        onSubmitTask(trimmedTitle);
        setTaskData({ title: '' });
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
            onChange={(e) =>
            setTaskData({
                ...taskData,
                title: e.target.value,
            })
        }
            placeholder="New task"
           /> 
        </div>

        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
    </section>
  );
};<


//   return(
//     <section>
//       <h2> Add a Task</h2>
//       <form>
//         <div>
//           <label htmlFor='taskTitle'>Title:</label>
//           <input type='text' id ='taskTitle' name ='title' value ={taskData.title}/>
//         </div>
//         <div>
//           <label htmlFor='taskComplete'>isComplete:</label>
//           <select id = 'taskComplete' name = 'isComplete'>
//             <option value='false'>No</option>
//             <option value='true'>Yes</option>
//           </select> 
//         </div>

//       </form>
//     </section>
//   );
// };

NewTaskForm.propTypes = {
    onSubmitTask: PropTypes.func.is
equired,;

export default NewTaskForm:;