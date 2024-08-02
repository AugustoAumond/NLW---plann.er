import { Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api} from "../lib/axios";
import { format, isToday } from "date-fns";

import { DateRange, DayPicker } from "react-day-picker"
import 'react-day-picker/dist/style.css';


export function DestinationAndDateHeader(){
    const {tripId} = useParams();
    const [change, setChange] = useState(false);
    const [destination, setDestination] = useState('');
    const [eventStartAndDates, setEventStartAndDates] = useState<DateRange | undefined>()
    

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    useEffect(()=>{
        api.get(`/trips/${tripId}`).then(response =>{
            setEventStartAndDates({from: response.data.trip.starts_at, to: response.data.trip.ends_at});
            setDestination(response.data.trip.destination)
        })
    },[tripId])

    const displayedDate = eventStartAndDates?.from && eventStartAndDates?.to ? format(eventStartAndDates?.from,"d' de 'LLL").concat(' até ').concat(format(eventStartAndDates?.to,"d' de 'LLL")) : null;

    async function ChangeTrue(){
        if (eventStartAndDates){
            await api.put(`/trips/${tripId}`, {
                destination,
                starts_at :eventStartAndDates.from,
                ends_at: eventStartAndDates.to
            })

            window.document.location.reload();

            setChange(false);
            console.log(destination, eventStartAndDates?.from, eventStartAndDates?.to, tripId)
        }

    }

    function ChangeFalse(){
        setChange(true);
    }
    
    function openDatePicker(){
        const month = document.getElementsByName('month').values;
        console.log(month)
        return setIsDatePickerOpen(true);
    }
    
    function closeDatePicker(){
        return setIsDatePickerOpen(false);
    }

    return(
    <div className="flex-1 px-3 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        {change === false ?
        <div className="flex flex-1 items-center gap-2">
            <MapPin className="size-3.5 md:size-5 text-zinc-400"/>
            <span className=" text-zinc-100 md:text-base text-xs">
            {destination}
            </span>
        </div> 
        :
        <div className="flex flex-1 items-center gap-2">
            <MapPin className="size-3.5 md:size-5 text-zinc-400"/>
            <input value={destination} onChange={(e) => setDestination(e.currentTarget.value)} className="flex flex-1 bg-transparent text-sm placeholder-zinc-400 outline-none p-2 sm:text-lg" type="text" name="" id="" placeholder="Qual o novo destino?"/>
        </div>
        }


        <div className=" flex items-center gap-5">
            {change === false ?
            <div className="px-3 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-center gap-2">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <Calendar className="size-3.5 md:size-5 text-zinc-400"/>
                        <span className="text-zinc-100 md:text-base text-xs">
                            {displayedDate}
                        </span> 
                    </span>
                </div>

                <div className='w-px h-6 bg-zinc-600'></div>
            </div>
            :
            <div className="flex items-center gap-2 h-10 w-full sm:w-[unset]">
                <button onClick={openDatePicker} className='flex-1 flex items-center text-left gap-2 outline-none sm:w-[240px]'>
                    <Calendar className='size-3.5 sm:size-5 text-zinc-400'/>
                    <span className="text-sm text-zinc-400 truncate w-40 flex-1 sm:text-lg ">
                        {displayedDate || 'Quando?'}
                    </span>
                </button>

                {isDatePickerOpen &&(
                    <div className='fixed inset-8 bg-black/60 flex items-center justify-center'>
                        <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                            <div className='space-y-2'>
                                <div className='flex justify-between items-center'>
                                    <h2 className='text-xs font-semibold sm:text-lg'>Selecione a data!</h2>

                                    <button>
                                        <X onClick={closeDatePicker} className=' size-5'/>
                                    </button>
                                </div>
                            </div>

                            <DayPicker fromDate={new Date()} disabled={isToday} showOutsideDays mode="range" selected={eventStartAndDates} onSelect={setEventStartAndDates}/>
                        </div>
                    </div>
                )}

                <div className='w-px h-6 bg-zinc-600'></div>
            </div>
            }

            {change === false ?
                <Button variant='secundary' onClick={ChangeFalse}> 
                    Alterar local/data
                    <Settings2 className='size-3.5 md:size-5'/>
                </Button>
                :
                <Button variant='secundary' onClick={ChangeTrue}> 
                    Confirmar Alteração
                    <Settings2 className='size-3.5 md:size-5'/>
                </Button>
            }
        </div>
    </div>
    )
}