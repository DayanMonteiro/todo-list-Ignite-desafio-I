import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    // não deixa enviar uma task se estiver com o campo vazio
    if(!newTaskTitle) return;
    // cria a nova task com as informações
    const newTask = {
      // gera um id automático
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
    // o oldState captura as informações antigas dentro do array e o newTask cria a nova
    setTasks(oldState => [...oldState, newTask])
    // reseta o input do todo
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

      //mapear as tasks, pegar elas mapeada e verifica se a task.id é igual ao objeto ela retorna 
      //a taks igual e add subscrevendo a taks pelo valor novo
      const newTasks = tasks.map(tasks => tasks.id === id ? {
        ...tasks,
        isComplete: !tasks.isComplete
      } : tasks);
      setTasks(newTasks)
    }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // uma variavel para filtrar todas as tasks e retornar menos a que tiver o id da exclusão 
    const filteredTasks = tasks.filter(tasks => tasks.id !== id);
    // salva no state as alterações e retorna o filteredTaks que esta com o array atualizado com o item removido
    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}