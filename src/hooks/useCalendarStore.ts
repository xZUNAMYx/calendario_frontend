import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../stores";
import { convertEventToDate } from "../helpers";
import { calendarApi } from "../../api";
import Swal from "sweetalert2";
import { response } from 'express';

export const useCalendarStore = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent: any )=> {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async ( calendarEvent: any )=>{
        try {
            if( calendarEvent._id ){
                //Actualizando
                await calendarApi.put(`events/${ calendarEvent._id }`, calendarEvent);
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            }
    
            //Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            //TODO: APlicar para crear nuevo torneo en MUNDIALITO
            dispatch( onAddNewEvent({ ...calendarEvent, _id: data.evento._id, user }) );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error' )
        }
    }

    const startDeletingEvent = ()=>{
        //TODO: llegar al backend
        dispatch( onDeleteEvent() );
    }

    const startLoadingEvents = async() => {
        try {
            const {data} = await calendarApi.get('/events');
            console.log({data});
            const events = convertEventToDate( data.eventos );
            console.log(events);
            dispatch( onLoadEvents( events ) );

        } catch (error) {
            console.log('Error cargando eventos desde el backend');
            console.log(error);
        }
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
        startLoadingEvents,
    }
}
