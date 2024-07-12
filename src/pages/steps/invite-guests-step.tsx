import { ArrowRight, UserRoundPlus } from "lucide-react"
import { Button } from "../../components/button"

interface InviteGuestsStepProps {
    openGuestsModal: () => void
    emailsToInvite: string[]
    openConfirmTripModalOpen: () => void
}

export function InviteGuestsStep({
    emailsToInvite,
    openConfirmTripModalOpen,
    openGuestsModal
}: InviteGuestsStepProps){
    return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
        <button type='button' className='flex items-center gap-2 flex-1 text-left'>
            <UserRoundPlus className='size-5 text-zinc-400'/>

            <span onClick={openGuestsModal} className='text-zinc-400 text-lg flex-1'> {emailsToInvite.length > 0 ? `${emailsToInvite.length} pessoa(s) convidada(s)` : 'Quem estará na viagem?'} </span>
        </button>

        <div className='w-px h-6 bg-zinc-600'></div>

        <Button onClick={openConfirmTripModalOpen}>
            Confirmar Viagem
            <ArrowRight className='size-5'/>  
        </Button>
    </div>
    )
}