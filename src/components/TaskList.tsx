import type { Task, Status, Priority } from '../types/task'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  status: Status
  priority: Priority | 'all'
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, status, priority, onToggle, onDelete }: TaskListProps) {
  const filtered = tasks.filter(task => {
    if (status === 'active' && task.completed) return false
    if (status === 'completed' && !task.completed) return false
    if (priority !== 'all' && task.priority !== priority) return false
    return true
  })

  if (filtered.length === 0) {
    return <div className="empty-state">タスクはありません</div>
  }

  return (
    <div className="task-list">
      {filtered.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}
