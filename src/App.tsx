import { useState } from 'react'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { useTasks } from './hooks/useTasks'
import type { Status, Priority } from './types/task'

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks()
  const [status, setStatus] = useState<Status>('all')
  const [priority, setPriority] = useState<Priority | 'all'>('all')

  const counts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  }

  return (
    <div className="app">
      <header className="header">
        <h1>タスク管理</h1>
        <p className="subtitle">
          {counts.active} 件未完了 / {counts.all} 件合計
        </p>
      </header>

      <main className="main">
        <TaskForm onAdd={addTask} />

        <div className="filters">
          <div className="filter-group">
            {(['all', 'active', 'completed'] as Status[]).map(s => (
              <button
                key={s}
                className={`filter-btn${status === s ? ' active' : ''}`}
                onClick={() => setStatus(s)}
                type="button"
              >
                {s === 'all'
                  ? `すべて (${counts.all})`
                  : s === 'active'
                    ? `未完了 (${counts.active})`
                    : `完了済み (${counts.completed})`}
              </button>
            ))}
          </div>
          <select
            className="input select priority-filter"
            value={priority}
            onChange={e => setPriority(e.target.value as Priority | 'all')}
          >
            <option value="all">優先度: すべて</option>
            <option value="high">優先度: 高</option>
            <option value="medium">優先度: 中</option>
            <option value="low">優先度: 低</option>
          </select>
        </div>

        <TaskList
          tasks={tasks}
          status={status}
          priority={priority}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  )
}
