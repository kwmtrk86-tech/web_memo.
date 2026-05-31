export type Priority = 'high' | 'medium' | 'low'
export type Status = 'all' | 'active' | 'completed'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  dueDate: string
  completed: boolean
  createdAt: string
}
