import { X, User, AtSign } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../components/button"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Inputs } from "../components/inputs"


interface ConfirmTripModalProps{
    closeConfirmTripModal: ()=> void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    setOwnerName: (name: string) => void;
    setOwnerEmail: (email: string) => void;
    isInvalidOwnerNameOrEmail: boolean
    eventStartAndDates: DateRange | undefined
    destination: string
    load: boolean
    text: string
}

export function ConfirmTripModal({
closeConfirmTripModal,
createTrip,
setOwnerName,
setOwnerEmail,
isInvalidOwnerNameOrEmail,
destination,
eventStartAndDates,
load,
text
}: ConfirmTripModalProps){

    const displayedDate = eventStartAndDates && eventStartAndDates.from && eventStartAndDates.to ? `${format(eventStartAndDates.from, 'd' )} de ${format(eventStartAndDates.from, 'LLL')} até ${format(eventStartAndDates.to, 'd')} de ${format(eventStartAndDates.to, 'LLL')}` : null;

    return (
    <div className='fixed inset-8 bg-black/60 flex items-center justify-center'>
        <div className='relative w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-base sm:text-lg font-semibold'>Confirmar criação de viagem!</h2>

                    <button>
                        <X onClick={closeConfirmTripModal} className='size-5'/>
                    </button>
                </div>

                <p className='text-xs sm:text-sm text-zinc-400 text-left'>
                    Para concluir a criação da viagem para <span className='font-semibold text-zinc-100'>{destination}</span> nas datas de <span className='font-semibold text-zinc-100'>{displayedDate} </span> preencha seus dados abaixo:</p>
            </div>

            <form onSubmit={createTrip} className='space-y-3'>
                <Inputs>
                    <User className='text-zinc-800 size-3.5 sm:size-5'/>

                    <input type="text" name='name' onChange={event => setOwnerName(event.target.value)} placeholder='Seu nome completo!' className="bg-transparent text-sm sm:text-lg placeholder-zinc-400 outline-none flex-1"/>
                </Inputs>

                <Inputs>
                    <AtSign className='text-zinc-800 size-3.5 sm:size-5'/>

                    <input type="email" name='email' onChange={event => setOwnerEmail(event.target.value)} placeholder='Seu email pessoal' className="bg-transparent text-sm sm:text-lg placeholder-zinc-400 outline-none flex-1"/>
                </Inputs>

                {isInvalidOwnerNameOrEmail === true ? (
                    <div className='w-full h-10 text-red-600  text-sm sm:text-lg'>
                        Nome ou Email não informada!
                    </ div>
                ) : <></>}

                <Button type="submit" size="full">
                    Confirmar criação da viagem
                </Button>
            </form>

            {load && (
                <div className="absolute top-[-20px] left-0 w-full h-full shadow-shape bg-zinc-900 rounded-lg flex items-center justify-center">
                    <span className="text-3xl animate-pulse opacity-75">
                        
                        {text}

                    </span>
                </div>
            )}
        
        </div>
    </div>
    )
}