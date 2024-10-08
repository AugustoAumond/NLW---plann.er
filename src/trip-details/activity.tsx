import { CircleCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { api } from "../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activities {
    date: string
    activities: {
        id: string,
        title: string,
        occurs_at: string,
    }[]

}

export function Activity (){
    const {tripId} = useParams();
    const [activities, setActivities] = useState<Activities[]>([]);

    useEffect(()=>{
        api.get(`/trips/${tripId}/activities`).then(response =>{
            setActivities(response.data.activities);
        })
    },[tripId])

    return (
    <div className="space-y-8">
        {activities.map(category =>{
            return (
                <div key={category.date} className="space-y-2.5">
                    <div className="flex gap-2 items-baseline">
                        <span className="text-lg md:text-xl text-zinc-300 font-semibold">
                            Dia {format(category.date, 'd')}
                        </span>
                        <span className="text-xs text-zinc-500">
                            {format(category.date, 'EEEE', {locale: ptBR})}
                        </span>
                    </div>
            
                    {category.activities.length > 0 ? (
                    <div className="space-y-3">
                        {category.activities.map(activity =>{
                            return (
                                <div key={activity.id} className="space-y-2.5">
                                    <div className="px-4 py-2.5 rounded-xl shadow-shape bg-zinc-900 flex items-center justify-between">
                                        <div className="flex items-center justify-start gap-2">
                                            <CircleCheck className="size-3.5 md:size-5 text-lime-300"/>
                                            <span className="text-zinc-100 text-sm md:text-base">
                                                {activity.title}
                                            </span>
                                        </div>
                    
                                        <span className="text-zinc-400 text-xs md:text-sm">
                                            {format(activity.occurs_at, 'hh:mm')}h
                                        </span>
                                    </div>
                                </div>
                                )
                            })}
                        </div>)
                                : (<div className="space-y-2.5">
                                    <div className="px-4 py-2.5 rounded-xl shadow-shape bg-zinc-900 flex items-center justify-between">
                                        <div className="flex items-center justify-start gap-2">
                                            <span className="text-zinc-100 text-xs md:text-base truncate">
                                                Nenhuma atividade cadastrada nessa data.
                                            </span>
                                        </div>
                    
                                        <span className="text-zinc-400 text-xs md:text-sm shrink-0">
                                            --:--
                                        </span>
                                    </div>
                                </div>
                                )}
                        </div>
            )
        })}
    </div>
    )
}