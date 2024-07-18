import { Plus} from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activity } from "./activity";
import { DestinationAndDateHeader } from "./destination-and-data-header";
import { Button } from "../components/button";

export function TripDetailsPage() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

    function openCreateActivityModal (){
        setIsCreateActivityModalOpen(true);
    }

    function closeCreateActivityModal (){
        setIsCreateActivityModalOpen(false);
    }


    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <DestinationAndDateHeader/>

            <main className="flex gap-16 px-4 flex-col md:flex-row">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg  md:text-3xl font-semibold truncate">
                            Atividades
                        </h2>

                        <Button onClick={openCreateActivityModal}>
                            <Plus className='size-3.5 md:size-5'/>  
                            Cadastrar Atividade
                        </Button>
                    </div>

                    <Activity/>
                </div>

                <div className="w-full md:w-80 space-y-6">
                    <ImportantLinks/>

                    <div className='w-full h-px bg-zinc-600'></div>

                    <Guests/>
                </div>
            </main>

            {isCreateActivityModalOpen && (
                <CreateActivityModal 
                closeCreateActivityModal={closeCreateActivityModal}
                />
            )}  
        </div>
    )
}