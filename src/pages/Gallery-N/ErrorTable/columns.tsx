import type { TErrorWordData } from '../hooks/useErrorWords'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { ColumnDef } from '@tanstack/react-table'
import PhArrowsDownUpFill from '~icons/ph/arrows-down-up-fill'
import DeleteIcon from '~icons/weui/delete-filled'

export type ErrorColumn = {
  word: string
  trans: string
  errorCount: number
  errorChar: string[]
}

export const errorColumns = (onDelete: (word: string) => Promise<void>): ColumnDef<ErrorColumn>[] => [
  {
    accessorKey: 'word',
    size: 100,
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="p-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          単語
          <PhArrowsDownUpFill className="ml-1.5 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'trans',
    size: 500,
    header: '訳',
    cell: ({ row }) => {
      const trans = row.original.trans

      return trans.includes('<ruby>') ? <span dangerouslySetInnerHTML={{ __html: trans }} /> : <span>{trans}</span>
    },
  },
  {
    accessorKey: 'errorCount',
    size: 40,
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="p-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          誤答回数
          <PhArrowsDownUpFill className="ml-1.5 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <span className="flex justify-center">{row.original.errorCount} </span>
    },
  },
  {
    accessorKey: 'errorChar',
    header: '間違えやすい文字',
    size: 100,
    cell: ({ row }) => {
      return (
        <p>
          {(row.getValue('errorChar') as string[]).map((char, index) => (
            <kbd className="flex justify-center" key={`${char}-${index}`}>
              {char + ' '}
            </kbd>
          ))}
        </p>
      )
    },
  },
  {
    accessorKey: 'delete',
    header: '',
    size: 40,
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DeleteIcon className="cursor-pointer" onClick={() => onDelete(row.original.word)} />
            </TooltipTrigger>
            <TooltipContent>
              <p>記録を削除</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
]

export function getRowsFromErrorWordData(data: TErrorWordData[]): ErrorColumn[] {
  return data.map((item) => {
    return {
      word: item.word,
      trans: item.originData.trans.join('，') ?? '',
      errorCount: item.errorCount,
      errorChar: item.errorChar,
    }
  })
}
