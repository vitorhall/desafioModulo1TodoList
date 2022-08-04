import styles from './TaskList.module.css'
import '../../global.css'
import plus from '../../assets/plus.svg'
import { Task } from '../task/Task';
import clipboard from '../../assets/clipboard.svg'
import { ChangeEvent, FormEvent, useState } from 'react';



export function TaskList() {
  const [newTextTask, setNewTextTask] = useState('');
  const [newTask, setNewTask] = useState<any[]>([]);
  
  function handleNewTaskList(event:FormEvent) {
    event.preventDefault()
    setNewTask([...newTask, newTextTask])
    setNewTextTask('')
  }

  function handleNewTextTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTextTask(event.target.value);  
  }

  function DeleteTask(taskToDelete: string){
    const taskwhithoutDeletedOne = newTask.filter(task =>{
      return task !== taskToDelete
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
              {newTask.length <= 0 ? 0 : `${newTask.length} de ${newTask.length}`  }
            </span>
          </div>
        </div>
        <div>
          <ul>
            {newTask.map(taskText =>{
              const taskId = taskText.length
                return(
                  <Task 
                  key={taskId}
                  content={taskText}
                  onDeleteTask={DeleteTask}  
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