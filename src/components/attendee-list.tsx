import { Search } from 'lucide-react'

export function AttendeeList() {
  return (
    <div className='flex gap-3'>
      <h1 className="text-2xl font-bold">Participantes</h1>
      <div className='flex items-center gap-3 border border-white/15 rounded-md px-3 py-1.5' >
        <Search className='size-4 text-emerald-300' />
        <input className="flex-1 bg-transparent text-sm " type="text" placeholder='Buscar participante ...'/>
      </div>
    </div>
  )
}