import nlwUniteLogo from '../assets/nlw-unite-icon.svg'
export function Header(){

  return (
    <div className='flex items-center gap-5 py-2'>
      <img src={nlwUniteLogo} alt="NLW Unite" />
      <nav className='flex items-center gap-5'>
        <a href="" className='text-sm font-medium text-zinc-300'>Eventos</a>
        <a href="" className='text-sm font-medium text-zinc-50'>Participantes</a>
      </nav>
    </div>
  )
}