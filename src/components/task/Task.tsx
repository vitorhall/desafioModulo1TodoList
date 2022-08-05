import styles from './Task.module.css'
import { Trash } from "phosphor-react";
import check from '../../assets/check.svg'
import checked from '../../assets/checked.svg'
import { useState } from 'react';

type TaskProps ={
  id:string;
  text:string;
  isComplete:boolean;
}


interface TaskPropsItem{
  task: TaskProps
  key: string;
  content: string;
  onDeleteTask: (id: string) => void;
  onCheckTask: (id:string, isComplete:boolean) => void;
  children?: string
}

export function Task({content, onCheckTask, onDeleteTask, task}: TaskPropsItem) {


  function handleDeleteTask(){
    onDeleteTask(task.id);
  }

  function handleCheckTask(){
    onCheckTask(task.id, !task.isComplete)
  }


  return (
      <li className={styles.list} >
        <div className={styles.boxRadio} onClick={handleCheckTask}>
          <div className={styles.radioList} >
            {!task.isComplete ? (
              <img src={check} alt="" />
            ):(
              <img src={checked} alt="" />
            )}
          </div>
          <div className={styles.textBox}>
            <p className={!task.isComplete ? styles.textList : styles.textChecked }>{content}</p>
          </div>
        </div>
        <button className={styles.btnTrash} onClick={handleDeleteTask}> 
          <Trash size={24} />
        </button>
      </li>
  )
}