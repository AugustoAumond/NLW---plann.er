import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../components/button";
import {  useEffect, useState } from "react";
import { api } from "../lib/axios";
import { useParams } from "react-router-dom";
import { Inputs } from "../components/inputs";
import { format, isToday } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";

interface CreateActivtyModalProps {
    closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
    closeCreateActivityModal
}: CreateActivtyModalProps){
    const {tripId} = useParams();

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [eventDate, setEventDate] = useState<Date | undefined>()
    const [eventHour, setEventHour] = useState<any>()
    const [activity, setActivity] = useState<string>('')
    const [eventStartAndDates, setEventStartAndDates] = useState<DateRange | undefined>()

    useEffect(()=>{
        api.get(`/trips/${tripId}`).then(response =>{
            setEventStartAndDates({from: response.data.trip.starts_at, to: response.data.trip.ends_at});
        })
    },[tripId])

    function openDatePicker(){
        const month = document.getElementsByName('month').values;
        console.log(month)
        return setIsDatePickerOpen(true);
    }

    function closeDatePicker(){
        return setIsDatePickerOpen(false);
    }

    async function createAcetivity (){

        const title = activity;
        const occurs_at = eventDate?.toString().replace('00:00', eventHour);

        await api.post(`/trips/${tripId}/activities`, {
            title,
            occurs_at,
        })

        closeCreateActivityModal()

        window.document.location.reload();
    }
    
    const displayedDate = eventDate ? `${format(eventDate, 'd' )} de ${format(eventDate, 'LLLLLLL', {locale: ptBR})}` : null;
    console.log(displayedDate)

    return (
        <div className='fixed inset-8 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-base sm:text-lg font-semibold'>Cadastar atividade</h2>

                        <button>
                            <X onClick={closeCreateActivityModal} className='size-3.5 sm:size-5'/>
                        </button>
                    </div>

                    <p className='text-xs sm:text-sm text-zinc-400 text-left'>
                        Todos os convidados podem visualizar as atividades.
                    </p>
                </div>

                <div className='space-y-3'>
                    <Inputs>
                        <Tag className='text-zinc-900 size-3.5 sm:size-5'/>

                        <input value={activity} onChange={(e) => setActivity(e.currentTarget.value)} type="text" name='title' placeholder='Qual atividade?' className="bg-transparent text-sm sm:text-lg placeholder-zinc-400 outline-none flex-1"/>
                    </Inputs>

                    <Inputs>

                        <div className="flex flex-1">
                            <button onClick={openDatePicker} className='flex-1 flex items-center text-left gap-2 outline-none sm:w-[240px]'>
                            <Calendar className='size-3.5 sm:size-5 text-zinc-400'/>
                                <span className="text-sm text-zinc-400 truncate w-40 flex-1 sm:text-lg ">
                                    {eventDate ? displayedDate : 'Quando?' }
                                </span>
                            </button>
                        </div>

                        <div className="ml-auto border-0 h-full flex items-center focus:bg-transparent focus:border-0">
                            <input className="bg-transparent" type="time" value={eventHour} onChange={(e) => setEventHour(e.currentTarget.value)}></input>
                        </div>
                    
                        
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

                                <DayPicker fromDate={eventStartAndDates?.from} toDate={eventStartAndDates?.to} disabled={isToday} showOutsideDays mode="single" selected={eventDate} onSelect={setEventDate}/>
                            </div>
                        </div>
                    )}
                    </Inputs>
                </div>

                <Button onClick={createAcetivity} size="full">
                        Salvar atividade
                </Button>
            </div>
        </div>
    )
}