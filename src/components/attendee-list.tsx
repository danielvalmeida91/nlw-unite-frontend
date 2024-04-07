import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'

interface Attendee {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    if(url.searchParams.has('search')) {
      return url.searchParams.get('search') ?? ''
    }

    return ''
  })
  const [page , setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if(url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }

    return 1
  })
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [total, setTotal] = useState(0)
  const totalPages = Math.ceil(total/10)

  useEffect(() => {
    const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')

    url.searchParams.set('pageIndex', String(page - 1))

    if(search.length > 0){
      url.searchParams.set('query', search)
    }
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setAttendees(data.attendees)
      setTotal(data.total)
    })
  
  }, [page, search])

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  const setCurrentPage = (page: number) => {
    const url = new URL(window.location.toString())

    url.searchParams.set('page', String(page))
    window.history.pushState({}, '', url)

    setPage(page)
  }

  const setCurrentSearch = (search: string) => {
    const url = new URL(window.location.toString())

    url.searchParams.set('search', search)
    window.history.pushState({}, '', url)

    setSearch(search)
  }

  const handleNext = () => {
    setCurrentPage(page + 1)
  }

  const handlePrev = () => {
    setCurrentPage(page - 1)
  }

  const handleFirst = () => {
    setCurrentPage(1)
  }

  const handleLast = () => {
    setCurrentPage(totalPages)
  }
  return (
    <div className='flex flex-col gap-4'>
    <div className='flex gap-3 items-center'>
    <h1 className="text-2xl font-bold">Participantes</h1>
    <div className='px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3' >
      <Search className='size-4 text-emerald-300' />
      <input className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0" placeholder='Buscar participante ...' value={search} onChange={onSearchInputChange}/>
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
      {attendees.map((attendee) => {
        const { id, name, email, createdAt, checkedInAt } = attendee
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
            <TableCell>{formatDistance(createdAt, new Date().toISOString(), { locale: ptBR, addSuffix: true })}</TableCell>
            <TableCell>{
              checkedInAt 
              ? formatDistance(checkedInAt, new Date().toISOString(), { locale: ptBR, addSuffix: true }) 
              : <span className='text-zinc-400'>Não fez check-in</span>
            }</TableCell>
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
          {`Mostrando ${attendees.length} de ${total} ${attendees.length > 1 ? 'itens' : 'item'}`}
        </TableCell>
        <TableCell className='text-right' colSpan={3}>
          <div className='inline-flex items-center gap-8'>
            <span>
              {`Página ${page ?? '-'} de ${totalPages}`}
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