import styles from './TaskList.module.css'
import '../../global.css'
import plus from '../../assets/plus.svg'
import { Task } from '../task/Task';
import clipboard from '../../assets/clipboard.svg'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

type TaskProps ={
  id:string;
  text:string;
  isComplete:boolean;
}

export function TaskList() {
  const [newTextTask, setNewTextTask] = useState('');
  const [newTask, setNewTask] = useState<TaskProps[]>([]);
  const [completedTaskSize, setCompletedTaskSize] = useState(0)

  useEffect(() => {
    const countCompleted = newTask.filter((item) => item.isComplete === true);
    setCompletedTaskSize(countCompleted.length)
  }, [newTask])
  
  function handleCheckTask(id:string, isComplete:boolean){
    const filteredTask = newTask.map(task =>{
      if(task.id === id){
        task.isComplete = isComplete;
      }
      return task;
    })
    setNewTask(filteredTask);
  }


  function handleNewTaskList(event:FormEvent) {
    event.preventDefault()

    const NewItem = {
      id: new Date().getTime().toString(),
      isComplete: false,
      text: newTextTask
    } as TaskProps

    setNewTask([...newTask, NewItem])
    setNewTextTask('')
  }

  function handleNewTextTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTextTask(event.target.value);  
  }

  function DeleteTask(idTaskToDelete: string){
    const taskwhithoutDeletedOne = newTask.filter(task =>{
      return task.id !== idTaskToDelete
    })
    setNewTask(taskwhithoutDeletedOne)
  }
  
  return (
    <section className="container">
      <header >
        <form className={styles.inputGroup} onSubmit={handleNewTaskList}>
          <input 
            type="text"  
            placeholder="Adicione uma nova tarefa"
            value={newTextTask}
            onChange={handleNewTextTaskChange}
            required
          />
          <button
            type="submit"
            className={styles.btnTask}
          >
            Criar <img src={plus} alt="" />
          </button>
        </form>
      </header>
      <main className="mainBox">
        <div className={styles.infoList}>
          <div className={styles.createdTask}>
            Tarefas criadas <span className={styles.countTask}>{newTask.length}</span>
          </div>
          <div className={styles.tasksDone}>
            Concluídas 
            <span className={styles.countTask}>
              {newTask.length <= 0 ? 0 : `${completedTaskSize} de ${newTask.length}`  }
            </span>
          </div>
        </div>
        <div>
          <ul>
            {newTask.map((taskItem, index) =>{
                return(
                  <Task 
                  key={index}
                  content={taskItem.text}
                  onDeleteTask={DeleteTask} 
                  onCheckTask={handleCheckTask} 
                  task={taskItem}
                  />
                )
            })}
            {newTask.length <= 0 &&
              (
                <div className={styles.emptyList}>
                  <div className={styles.contentBox}>
                    <img src={clipboard} alt="Clipboard" />
                    <p>Você ainda não tem tarefas cadastradas<br/>
                      <span>Crie tarefas e organize seus itens a fazer</span>
                    </p>
                  </div>
                </div>
              )
            }
          </ul>
        </div>
      </main>
    </section>
    
    
  )
}