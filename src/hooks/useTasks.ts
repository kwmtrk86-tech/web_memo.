import { useState, useEffect } from 'react'
import type { Task, Priority } from '../types/task'

const STORAGE_KEY = 'task-manager-tasks'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Task[]) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title: string, description: string, priority: Priority, dueDate: string) => {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [task, ...prev])
  }

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, completed: !task.completed } : task))
    )
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  return { tasks, addTask, toggleTask, deleteTask }
}
