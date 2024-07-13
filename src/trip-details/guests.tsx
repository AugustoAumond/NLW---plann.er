import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../components/button";
import { useParams } from "react-router-dom";
import { api } from "../lib/axios";
import { useEffect, useState } from "react";

interface Participants {
    id: 'string'
    name: string,
    starts_at: string | null,
    email: string,
    is_confirmed: boolean
}

export function Guests (){
    const {tripId} = useParams();
    const [participants, setParticipants] = useState<Participants[]>([]);

    useEffect(()=>{
        api.get(`/trips/${tripId}/participants`).then(response =>{
            setParticipants(response.data.participants);
        })
    },[tripId])

    return (
        <div>
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">
                Convidados
            </h2>
            
            <div className="space-y-5">
                {participants.map((participant, index)=>{
                    return(
                    <div key={participant.id} className="flex items-center justify-between gap-4">
                        <div className="sapce-y-1.5 flex-1">
                            <span className="block font-medium text-zinc-100">
                                {participant.name ?? `Convidade ${index}`}
                            </span>
                            <span className="block text-xs text-zinc-400 truncate">
                                {participant.email}
                            </span>
                        </div>

                        {participant.is_confirmed ?
                            <CheckCircle2 className="text-green-400 shrink-0 size-5" />
                            :
                            <CircleDashed className="text-zinc-400 size-5" />
                        }
                    </div>
                    )
                })}
            </div>

            <Button variant="secundary" size="full">
                <UserCog className='size-5'/>
                Gerenciar convidados
            </Button>
        </div>
    </div>
    )
}