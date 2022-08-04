import styles from './Task.module.css'
import { Trash } from "phosphor-react";
import check from '../../assets/check.svg'
import checked from '../../assets/checked.svg'
import { useState } from 'react';

interface TaskProps{
  key: number;
  content: string;
  onDeleteTask: (taskText: string) => void;
  children?: string
}

export function Task({content, children, onDeleteTask}: TaskProps) {

  const [isComplete, setIsComplete] = useState(false)

  function handleDeleteTask(){
    onDeleteTask(content)
  }


  return (
      <li className={styles.list} onClick={()=> setIsComplete(!isComplete) }>
        <div className={styles.radioList} >
          {!isComplete ? (
            <img src={check} alt="" />
          ):(
            <img src={checked} alt="" />
          )}
        </div>
        <div className={styles.textBox}>
          <p className={!isComplete ? styles.textList : styles.textChecked }>{content}</p>
        </div>
        <button className={styles.btnTrash} onClick={handleDeleteTask}> 
          <Trash size={24} />
        </button>
      </li>
  )
}