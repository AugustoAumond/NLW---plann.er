import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {InviteGuestsModal} from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-stap';
import { InviteGuestsStep } from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';
import { api } from '../lib/axios';


export function CreateTripPage() {
    const navigate = useNavigate();

    const [isGuestsInputOpen, setGuestsInputOpen] = useState(false);
    const [isGuestsModalOpen, setGuestsModalOpen] = useState(false);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

    const [destination, setDestination] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [eventStartAndDates, setEventStartAndDates] = useState<DateRange | undefined>()

    const [emailsToInvite, setEmailsToInvite] = useState([
        'augustoaumondrs@gmail.com', 'hahahaha@hsuahsuah.com'
    ])

    function openGuestsInput () {
        setGuestsInputOpen(true);
    }

    function closeGuestsInput () {
        setGuestsInputOpen(false);
    }

    function openGuestsModal (){
        setGuestsModalOpen(true);
    }

    function closeGuestsModal (){
        setGuestsModalOpen(false);
    }

    function openConfirmTripModalOpen (){
        setIsConfirmTripModalOpen(true);
    }

    function closeConfirmTripModalOpen (){
        setIsConfirmTripModalOpen(false);
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const data = new FormData(event.currentTarget)
        const email = data.get('email')?.toString();

        if (!email){
            return 
        }

        if (emailsToInvite.includes(email)){
            return
        }

        setEmailsToInvite([...emailsToInvite, email])

        event.currentTarget.reset();
    }

    function removeEmailsFromInvite(emailToRemove: string){
        const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove);

        setEmailsToInvite(newEmailList);
    }

    async function createTrip(event: FormEvent<HTMLFormElement>){
        event?.preventDefault()

        const from = eventStartAndDates?.from;
        const to =  eventStartAndDates?.to;

        const currentDate = new Date;

        if (!destination){
            console.log('não há destino')
            return
        }

        if (eventStartAndDates?.from){
            if ((currentDate < eventStartAndDates?.from) === false){
                return
            }
        }

        if (!ownerEmail || !ownerName){
            console.log('não há nome ou email')
            return
        }

        if (emailsToInvite.length === 0){
            return
        }

        if (!eventStartAndDates?.from || !eventStartAndDates?.to ){
            console.log('não há data')
            return
        }

        const response = await api.post('/trips', {
            destination,
            starts_at: from,
            ends_at: to,
            emails_to_invite: emailsToInvite,
            owner_name: ownerName,
            owner_email: ownerEmail,
        })

        const { tripId } = response.data

        navigate(`/trips/${tripId}`)

        console.log(tripId)
    }

    return (
    <div className="h-screen flex justify-center items-center  bg-pattern bg-no-repeat bg-center">
        <div className="max-w-full px-6 text-center space-y-10">
            <div className='flex flex-col items-center gap-3'>
                <img src="./logo.svg" alt="plann.er" />

                <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
            </div>

            <div className='space-y-4'>
                <DestinationAndDateStep 
                closeGuestsInput={closeGuestsInput}
                isGuestsInputOpen={isGuestsInputOpen}
                openGuestsInput={openGuestsInput}
                setDestination={setDestination}
                eventStartAndDates={eventStartAndDates}
                setEventStartAndDates={setEventStartAndDates}
                />

                {isGuestsInputOpen && (   
                    <InviteGuestsStep 
                    emailsToInvite={emailsToInvite}
                    openConfirmTripModalOpen={openConfirmTripModalOpen}
                    openGuestsModal={openGuestsModal}
                    />
                )}
            </div>

            <p className="text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
            com nossos <a href="#" className="text-zinc-300 underline"> termos de uso </a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>

            {isGuestsModalOpen && (
                <InviteGuestsModal
                addNewEmailToInvite={addNewEmailToInvite}
                closeGuestsModal={closeGuestsModal}
                emailsToInvite={emailsToInvite}
                removeEmailsFromInvites={removeEmailsFromInvite}
                />
            )}

            {isConfirmTripModalOpen && (
                <ConfirmTripModal 
                createTrip={createTrip}
                closeConfirmTripModal={closeConfirmTripModalOpen}
                setOwnerName={setOwnerName}
                setOwnerEmail={setOwnerEmail}
            />
            )}
        </div>
    </div>
    )
}
