import { KanbanColumn } from './KanbanColumn'
import { COLUMNS } from '../constants'
import type { Task, Priority, TaskStatus } from '../types/task'

interface KanbanBoardProps {
  tasks: Task[]
  onAdd: (title: string, description: string, priority: Priority, dueDate: string, status: TaskStatus) => void
  onMove: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

export function KanbanBoard({ tasks, onAdd, onMove, onDelete }: KanbanBoardProps) {
  return (
    <div className="kanban-board">
      {COLUMNS.map(col => (
        <KanbanColumn
          key={col.id}
          column={col}
          otherColumns={COLUMNS.filter(c => c.id !== col.id)}
          tasks={tasks.filter(t => t.status === col.id)}
          onAdd={(title, description, priority, dueDate) =>
            onAdd(title, description, priority, dueDate, col.id)
          }
          onMove={onMove}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
