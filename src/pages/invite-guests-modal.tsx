import { X, Plus, AtSign } from "lucide-react"
import { FormEvent } from "react";
import { Button } from "../components/button";
import { Inputs } from "../components/inputs";

interface InviteGuestsModalProps {
    closeGuestsModal: () => void
    emailsToInvite: string[]
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
    removeEmailsFromInvites: (email: string) => void
}

export function InviteGuestsModal ({
    addNewEmailToInvite, 
    closeGuestsModal,
    emailsToInvite,
    removeEmailsFromInvites
}: InviteGuestsModalProps) {
    return(
    <div className='fixed inset-8 bg-black/60 flex items-center justify-center'>
    <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
            <div className='flex justify-between items-center'>
                <h2 className='text-base sm:text-lg font-semibold'>Selecionar convidados</h2>

                <button onClick={closeGuestsModal}>
                    <X className='size-5'/>
                </button>
            </div>

            <p className='text-xs text-zinc-400 text-left sm:text-sm'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
        </div>

        <div className='flex flex-wrap gap-2'>
            {emailsToInvite.map((email)=>{
                return(
                    <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                        <span className='text-xs  text-zinc-300 sm:text-base'>{email}</span>
                        <button type='button' onClick={() => removeEmailsFromInvites(email)}>
                            <X className='size-3 sm:size-4 text-zinc-400'/>
                        </button>
                    </div>    
                )
            })}
        </div>

        <div className='w-full h-px bg-zinc-800'/>

        <form onSubmit={addNewEmailToInvite} className='p-2.5 border bg-zinc-950 border-zinc-800 rounded-lg flex flex-col items-center gap-2 h-24 sm:h-20 sm:flex-row'>
            <Inputs>
                <AtSign className='text-zinc-800 size-3.5 sm:size-5'/>

                <input type="email" name='email' placeholder='Digite o email do convidado' className="bg-transparent text-sm placeholder-zinc-400 outline-none flex-1 md:text-lg"/>
            </Inputs>

            <Button type="submit" >
                Convidar
                <Plus className='size-3.5 sm:size-5'/>  
            </Button>
        </form>
    </div>
</div>
)}