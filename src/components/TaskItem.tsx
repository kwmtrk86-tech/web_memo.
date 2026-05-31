import type { Task } from '../types/task'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const priorityLabel: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const isOverdue =
    task.dueDate !== '' && !task.completed && new Date(task.dueDate) < new Date()

  return (
    <div className={`task-item priority-${task.priority}${task.completed ? ' completed' : ''}`}>
      <button
        className={`checkbox${task.completed ? ' checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? '未完了に戻す' : '完了にする'}
        type="button"
      >
        {task.completed ? '✓' : ''}
      </button>
      <div className="task-body">
        <div className="task-header">
          <span className="task-title">{task.title}</span>
          <span className={`priority-badge priority-${task.priority}`}>
            {priorityLabel[task.priority]}
          </span>
        </div>
        {task.description !== '' && (
          <p className="task-description">{task.description}</p>
        )}
        {task.dueDate !== '' && (
          <span className={`due-date${isOverdue ? ' overdue' : ''}`}>
            期限: {task.dueDate}
            {isOverdue ? ' ⚠ 期限超過' : ''}
          </span>
        )}
      </div>
      <button
        className="btn-delete"
        onClick={() => onDelete(task.id)}
        aria-label="削除"
        type="button"
      >
        ✕
      </button>
    </div>
  )
}
