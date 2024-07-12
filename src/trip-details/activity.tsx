import { CircleCheck } from "lucide-react";

export function Activity (){
    return (
    <div className="space-y-8">
        <div className="space-y-2.5 flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">Dia 17</span>
            <span className="text-xs text-zinc-500">omingo</span>
        </div>

        <p className="text-zinc-500 text-sm">
            Nenhuma atividade cadastrada nessa data.
        </p>

        <div className="space-y-2.5">
            <div className="space-y-2.5 flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">Dia 18</span>
                <span className="text-xs text-zinc-500">Domingo</span>
            </div>

            <div className="space-y-2.5">
                <div className="px-4 py-2.5 rounded-xl shadow-shape bg-zinc-900 flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                        <CircleCheck className="size-5 text-lime-300"/>
                        <span className="text-zinc-100">
                            Academia em grupo
                        </span>
                    </div>

                    <span className="text-zinc-400 text-sm">
                        08:00h
                    </span>
                </div>
            </div>

            <div className="space-y-2.5">
                <div className="px-4 py-2.5 rounded-xl shadow-shape bg-zinc-900 flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                        <CircleCheck className="size-5 text-lime-300"/>
                        <span className="text-zinc-100">
                            Academia em grupo
                        </span>
                    </div>

                    <span className="text-zinc-400 text-sm">
                        08:00h
                    </span>
                </div>
            </div>
        </div>
    </div>
    )
}