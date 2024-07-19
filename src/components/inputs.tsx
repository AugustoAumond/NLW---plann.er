import { ComponentProps, ReactNode } from "react"


interface InputsProps extends ComponentProps<'input'> {
    children: ReactNode,
}

export function Inputs({children} : InputsProps){


    return (
    <div className='px-2 flex gap-2 items-center flex-1 rounded-lg bg-zinc-950 border-zinc-800 h-14'>
        {children}
    </div> 
    )
}