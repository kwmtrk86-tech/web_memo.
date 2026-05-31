import { useState } from 'react'
import type { Priority } from '../types/task'

interface TaskFormProps {
  onAdd: (title: string, description: string, priority: Priority, dueDate: string) => void
  onCancel: () => void
}

export function TaskForm({ onAdd, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim(), description.trim(), priority, dueDate)
  }

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        placeholder="タスク名"
        value={title}
        onChange={e => setTitle(e.target.value)}
        autoFocus
        required
      />
      <textarea
        className="form-input form-textarea"
        placeholder="説明（任意）"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={2}
      />
      <div className="form-row">
        <select
          className="form-input form-select"
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
        >
          <option value="high">優先度: 高</option>
          <option value="medium">優先度: 中</option>
          <option value="low">優先度: 低</option>
        </select>
        <input
          className="form-input"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-submit">追加</button>
        <button type="button" className="btn-cancel-form" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </form>
  )
}
