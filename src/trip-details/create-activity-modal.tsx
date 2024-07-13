import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../components/button";
import { FormEvent } from "react";
import { api } from "../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivtyModalProps {
    closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
    closeCreateActivityModal
}: CreateActivtyModalProps){
    const {tripId} = useParams();

    async function createAcetivity (event:FormEvent<HTMLFormElement>){
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const title = data.get('title')?.toString();
        const occurs_at = data.get('occurs_at')?.toString();

        await api.post(`/trips/${tripId}/activities`, {
            title,
            occurs_at,
        })

        closeCreateActivityModal()

        window.document.location.reload();
    }

    return (
        <div className='fixed inset-8 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-lg font-semibold'>Cadastar atividade</h2>

                        <button>
                            <X onClick={closeCreateActivityModal} className='size-5'/>
                        </button>
                    </div>

                    <p className='text-sm text-zinc-400 text-left'>
                        Todos os convidados podem visualizar as atividades.
                    </p>
                </div>

                <form onSubmit={createAcetivity} className='space-y-3'>
                    <div className='py-2.5 px-4 border bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Tag className='text-zinc-900 size-5'/>

                        <input type="text" name='title' placeholder='Qual atividade?' className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className='flex-1 h-14 px-4 border bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                            <Calendar className='text-zinc-900 size-5'/>
        
                            <input type="datetime-local" name="occurs_at" placeholder='Data e horário da atividade' className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "/>
                        </div>
                    </div>
            
                    <Button size="full">
                        Salvar atividade
                    </Button>
                </form>
            </div>
        </div>
    )
}