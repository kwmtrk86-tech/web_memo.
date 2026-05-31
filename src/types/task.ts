export type Priority = 'high' | 'medium' | 'low'
export type TaskStatus = 'todo' | 'inprogress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  dueDate: string
  status: TaskStatus
  createdAt: string
}

export interface ColumnDef {
  id: TaskStatus
  label: string
  color: string
}
