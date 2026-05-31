import { useState } from 'react'
import type { Task, TaskStatus, Priority, ColumnDef } from '../types/task'
import { TaskCard } from './TaskCard'
import { TaskForm } from './TaskForm'

interface KanbanColumnProps {
  column: ColumnDef
  otherColumns: ColumnDef[]
  tasks: Task[]
  onAdd: (title: string, description: string, priority: Priority, dueDate: string) => void
  onMove: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

export function KanbanColumn({ column, otherColumns, tasks, onAdd, onMove, onDelete }: KanbanColumnProps) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="kanban-column">
      <div className="column-header" style={{ borderTopColor: column.color }}>
        <span className="column-title">{column.label}</span>
        <span className="column-count" style={{ background: column.color }}>
          {tasks.length}
        </span>
      </div>

      <div className="column-body">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            otherColumns={otherColumns}
            onMove={onMove}
            onDelete={onDelete}
          />
        ))}

        {showForm ? (
          <TaskForm
            onAdd={(title, description, priority, dueDate) => {
              onAdd(title, description, priority, dueDate)
              setShowForm(false)
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <button
            className="add-card-btn"
            onClick={() => setShowForm(true)}
            type="button"
          >
            <span className="add-icon">+</span> カードを追加
          </button>
        )}
      </div>
    </div>
  )
}
