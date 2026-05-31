import { useState } from 'react'
import type { Priority } from '../types/task'

interface TaskFormProps {
  onAdd: (title: string, description: string, priority: Priority, dueDate: string) => void
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim(), description.trim(), priority, dueDate)
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
    setOpen(false)
  }

  if (!open) {
    return (
      <button className="btn btn-primary add-btn" onClick={() => setOpen(true)}>
        + タスクを追加
      </button>
    )
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="タスク名 *"
        value={title}
        onChange={e => setTitle(e.target.value)}
        autoFocus
        required
      />
      <textarea
        className="input textarea"
        placeholder="説明（任意）"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={2}
      />
      <div className="form-row">
        <select
          className="input select"
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
        >
          <option value="high">優先度: 高</option>
          <option value="medium">優先度: 中</option>
          <option value="low">優先度: 低</option>
        </select>
        <input
          className="input"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">追加</button>
        <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>キャンセル</button>
      </div>
    </form>
  )
}
