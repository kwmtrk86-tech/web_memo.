import type { Task, TaskStatus, ColumnDef } from '../types/task'

interface TaskCardProps {
  task: Task
  otherColumns: ColumnDef[]
  onMove: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

const priorityConfig = {
  high: { label: '高', color: '#ea4335' },
  medium: { label: '中', color: '#fbbc05' },
  low: { label: '低', color: '#34a853' },
}

export function TaskCard({ task, otherColumns, onMove, onDelete }: TaskCardProps) {
  const isOverdue =
    task.dueDate !== '' && task.status !== 'done' && new Date(task.dueDate) < new Date()
  const pConf = priorityConfig[task.priority]

  return (
    <div className="task-card">
      <div className="card-top">
        <span
          className="priority-chip"
          style={{ background: `${pConf.color}20`, color: pConf.color }}
        >
          {pConf.label}
        </span>
        <button
          className="btn-delete-card"
          onClick={() => onDelete(task.id)}
          aria-label="削除"
          type="button"
        >
          ✕
        </button>
      </div>

      <p className="card-title">{task.title}</p>
      {task.description !== '' && <p className="card-desc">{task.description}</p>}
      {task.dueDate !== '' && (
        <p className={`card-due${isOverdue ? ' overdue' : ''}`}>
          {isOverdue ? '⚠ ' : '📅 '}{task.dueDate}
        </p>
      )}

      <div className="card-moves">
        {otherColumns.map(col => (
          <button
            key={col.id}
            className="move-btn"
            style={{ '--col-color': col.color } as React.CSSProperties}
            onClick={() => onMove(task.id, col.id)}
            type="button"
          >
            {col.label} →
          </button>
        ))}
      </div>
    </div>
  )
}
