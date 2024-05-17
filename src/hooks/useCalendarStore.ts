import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../stores";

export const useCalendarStore = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent: any )=> {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async ( calendarEvent: any )=>{
        //TODO: llegar al backend

        //Todo bien
        if( calendarEvent._id ){
            //Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        }else{
            //Creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
    }

    const startDeletingEvent = ()=>{
        //TODO: llegar al backend
        dispatch( onDeleteEvent() );
    }

    return {
        //Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Metodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
    }
}
