import { ComponentProps } from "react"
import { twMerge } from 'tailwind-merge'

interface IconButtonProps extends ComponentProps<'button'> {
  variant?: boolean
}

export const IconButton = ({ variant, ...props }: IconButtonProps) => {
  return (
    <button 
      {...props} 
      // className={ variant
      // ? 'bg-white/10 border border-white/10 rounded-md p-1.5 hover:opacity-80' 
      // : 'bg-black/20 border border-white/10 rounded-md p-1.5 hover:brightness-125' 

      className={twMerge(
        'border border-white/10 rounded-md p-1.5',
        variant ? 'bg-white/10' : 'bg-black/20',
        props.disabled ? 'opacity-50' : '',
      )}
    
    />
  )
}