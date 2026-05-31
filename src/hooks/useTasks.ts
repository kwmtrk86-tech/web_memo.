import { useState, useEffect } from 'react'
import type { Task, Priority, TaskStatus } from '../types/task'

const STORAGE_KEY = 'task-manager-tasks'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Task[]) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (
    title: string,
    description: string,
    priority: Priority,
    dueDate: string,
    status: TaskStatus,
  ) => {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      dueDate,
      status,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [task, ...prev])
  }

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, status } : task))
    )
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  return { tasks, addTask, moveTask, deleteTask }
}
