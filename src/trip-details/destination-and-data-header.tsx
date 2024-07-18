import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { format } from "date-fns";


interface Trip {
    id: 'string'
    destination: string,
    starts_at: string,
    ends_at: string,
    is_confirmed: boolean
}

export function DestinationAndDateHeader(){
    const {tripId} = useParams();
    const [trip, setTrip] = useState<Trip | undefined>();

    useEffect(()=>{
        api.get(`/trips/${tripId}`).then(response =>{
            setTrip(response.data.trip);
        })
    },[tripId])

console.log(trip);
const displayedDate = trip ? format(trip.starts_at,"d' de 'LLL").concat(' até ').concat(format(trip?.ends_at,"d' de 'LLL")) : null;

console.log(displayedDate)


    return(
    <div className="flex-1 px-3 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
            <MapPin className="size-3.5 md:size-5 text-zinc-400"/>
            <span className=" text-zinc-100 md:text-base text-xs">
                {trip?.destination}
            </span> 
        </div>

        <div className=" flex items-center gap-5">
            <div className="px-3 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
                <span className="flex items-center gap-2">
                    <Calendar className="size-3.5 md:size-5 text-zinc-400"/>
                    <span className="text-zinc-100 md:text-base text-xs">
                        {displayedDate}
                    </span> 
                </span>
            </div>

            <div className='w-px h-6 bg-zinc-600'></div>

            <Button variant='secundary'> 
                Alterar local/data
                <Settings2 className='size-3.5 md:size-5'/>
            </Button>
        </div>
    </div>
    )
}