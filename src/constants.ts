import type { ColumnDef } from './types/task'

export const COLUMNS: ColumnDef[] = [
  { id: 'todo', label: '未着手', color: '#5f6368' },
  { id: 'inprogress', label: '進行中', color: '#1a73e8' },
  { id: 'done', label: '完了', color: '#34a853' },
]
