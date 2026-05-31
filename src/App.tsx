import { KanbanBoard } from './components/KanbanBoard'
import { useTasks } from './hooks/useTasks'

export default function App() {
  const { tasks, addTask, moveTask, deleteTask } = useTasks()

  const doneCount = tasks.filter(t => t.status === 'done').length

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="app-title">
            <span style={{ color: '#4285f4' }}>T</span>
            <span style={{ color: '#ea4335' }}>a</span>
            <span style={{ color: '#fbbc05' }}>s</span>
            <span style={{ color: '#4285f4' }}>k</span>
            <span style={{ color: '#34a853' }}>s</span>
          </h1>
          <span className="header-stat">
            {doneCount} / {tasks.length} 件完了
          </span>
        </div>
      </header>
      <KanbanBoard
        tasks={tasks}
        onAdd={addTask}
        onMove={moveTask}
        onDelete={deleteTask}
      />
    </div>
  )
}
