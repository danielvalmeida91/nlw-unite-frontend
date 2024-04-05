import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { attendees } from '../data/attendee'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

export function AttendeeList() {
  const [page , setPage] = useState(1)
  const totalPages = Math.ceil(attendees.length/10)

  const handleNext = () => {
    setPage(page => page + 1)
  }

  const handlePrev = () => {
    setPage(page => page - 1)
  }

  const handleFirst = () => {
    setPage(1)
  }

  const handleLast = () => {
    setPage(totalPages)
  }
  return (
    <div className='flex flex-col gap-4'>
    <div className='flex gap-3 items-center'>
    <h1 className="text-2xl font-bold">Participantes</h1>
    <div className='px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3' >
      <Search className='size-4 text-emerald-300' />
      <input className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" placeholder='Buscar participante ...'/>
    </div>
  </div>
 
  <Table>
    <thead className='border-b border-white/10'>
      <tr>
        <TableHeader style={{ width: 48}}>
          <input type='checkbox' className='size-4 bg-black/20 rounded border border-white/10' />
        </TableHeader>
        <TableHeader>Código</TableHeader>
        <TableHeader>Participantes</TableHeader>
        <TableHeader>Data de inscrição</TableHeader>
        <TableHeader>Data de check-in</TableHeader>
        <TableHeader style={{ width: 64}}></TableHeader>
      </tr>
    </thead>
    <tbody>
      {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
        const { id, name, email, createdAt, checkInAt } = attendee
        return(
          <TableRow key={id}>
            <TableCell>
              <input type="checkbox" className='size-4 bg-black/20 rounded border border-white/10' />
            </TableCell>
            <TableCell>{id}</TableCell>
            <TableCell>
              <div className='flex flex-col gap-1'>
                <span className='font-semibold text-white'>{name}</span>
                <span>{email}</span>
              </div>
            </TableCell>
            <TableCell>{formatDistance(createdAt, new Date(), { locale: ptBR, addSuffix: true })}</TableCell>
            <TableCell>{formatDistance(checkInAt, new Date(), { locale: ptBR, addSuffix: true })}</TableCell>
            <TableCell>
              <IconButton className='bg-black/20 border border-white/10 rounded-md p-1.5'>
                <MoreHorizontal className='size-4' />
              </IconButton>
            </TableCell>
          </TableRow>
        )
      }
        
      )}
    </tbody>
    <tfoot>
      <tr>
        <TableCell colSpan={3} >
          {`Mostrando ${page * 10} de ${attendees.length} itens`}
        </TableCell>
        <TableCell className='text-right' colSpan={3}>
          <div className='inline-flex items-center gap-8'>
            <span>
              {`Página ${page ?? '-'} de ${Math.ceil(attendees.length/10)}`}
            </span>

            <div className='flex gap-1.5'>
              <IconButton onClick={handleFirst} variant disabled={page === 1}>
                <ChevronsLeft className='size-4' />
              </IconButton>
              <IconButton onClick={handlePrev} variant disabled={page === 1}>
                <ChevronLeft className='size-4' />
              </IconButton>
              <IconButton onClick={handleNext} variant disabled={page === totalPages}>
                <ChevronRight className='size-4' />
              </IconButton>
              <IconButton onClick={handleLast} variant disabled={page === totalPages}>
                <ChevronsRight className='size-4' />
              </IconButton>
            </div>
          </div>
        </TableCell>
      </tr>
    </tfoot>
  </Table>
  </div>

  )
   
}