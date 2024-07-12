import { Calendar,  MapPin, Settings2 } from "lucide-react"
import { Button } from "../../components/button"

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    closeGuestsInput: () => void
    openGuestsInput: () => void
}


export function DestinationAndDateStep({
    isGuestsInputOpen,
    closeGuestsInput,
    openGuestsInput
    }:DestinationAndDateStepProps
){
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
            <MapPin className='size-5 text-zinc-400'/>

            <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
            </div>

            <button disabled={isGuestsInputOpen} className='flex items-center text-left gap-2 outline-none'>
                <Calendar className='size-5 text-zinc-400'/>
                <span className="text-lg text-zinc-400 w-40 ">
                    Quando?
                </span>
            </button>

            <div className='w-px h-6 bg-zinc-600'></div>

            {isGuestsInputOpen ? 
            (<Button  onClick={closeGuestsInput} variant="secundary">
                Alterar local/data
                <Settings2 className='size-5'/>
            </Button>)
            : (
            <Button onClick={openGuestsInput} variant="primary">
                Continuar
            </Button>
            )}
        </div>
    )
}