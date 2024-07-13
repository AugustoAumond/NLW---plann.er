import { Calendar,  MapPin, Settings2, X } from "lucide-react"
import { Button } from "../../components/button"
import { useState } from "react"
import { format } from "date-fns"
import { DateRange, DayPicker } from "react-day-picker"
import 'react-day-picker/dist/style.css';

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    closeGuestsInput: () => void
    openGuestsInput: () => void
    setDestination: (destination: string)=> void
    setEventStartAndDates: (dates: DateRange | undefined) => void
    eventStartAndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
    isGuestsInputOpen,
    closeGuestsInput,
    openGuestsInput, 
    setDestination,
    setEventStartAndDates,
    eventStartAndDates
    }:DestinationAndDateStepProps
){

    
const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

function openDatePicker(){
    return setIsDatePickerOpen(true);
}

function closeDatePicker(){
    return setIsDatePickerOpen(false);
}

const displayedDate = eventStartAndDates && eventStartAndDates.from && eventStartAndDates.to ? `${format(eventStartAndDates.from, 'd' )} de ${format(eventStartAndDates.from, 'LLL')} até ${format(eventStartAndDates.to, 'd')} de ${format(eventStartAndDates.to, 'LLL')}` : null;

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
            <MapPin className='size-5 text-zinc-400'/>

            <input disabled={isGuestsInputOpen} onChange={(event)=> setDestination(event.target.value)} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
            </div>

            <button onClick={openDatePicker} disabled={isGuestsInputOpen} className='w-[240px] flex items-center text-left gap-2 outline-none'>
                <Calendar className='size-5 text-zinc-400'/>
                <span className="text-lg text-zinc-400 w-40 flex-1 ">
                    {displayedDate || 'Quando?'}
                </span>
            </button>

            {isDatePickerOpen &&(
                <div className='fixed inset-8 bg-black/60 flex items-center justify-center'>
                    <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                        <div className='space-y-2'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-lg font-semibold'>Selecione a data!</h2>

                                <button>
                                    <X onClick={closeDatePicker} className='size-5'/>
                                </button>
                            </div>
                        </div>

                        <DayPicker mode="range"  selected={eventStartAndDates} onSelect={setEventStartAndDates}/>
                    </div>
                </div>
            )}

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