import { useState } from 'react';
import { Calendar} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { ButtonAddNew, ButtonDelete, CalendarEvent, CalendarModal, Navbar } from ".."
import { localizer, getMessagesEs } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';


export const CalendarPage = () => {
  //TODO: con redux
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore() ;
  
  // @ts-ignore
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'week');

  // @ts-ignore
  const eventStyleGetter = ( event: {}, start: Date, end: Date, isSelected: boolean )=>{
    // TODO: Verificar si se renderiza varias veces

    const style = {
      backgroundColor: 'green',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event: any ) => {
    openDateModal();
    console.log( { doubleClick: event })
  }

  // TODO: Pasar la actual que es este evento y saber a cual se le dio click
  const onSelect = ( event: any ) => {
    setActiveEvent( event );
  }

  const onViewChanged = ( event: any ) => {
    console.log( { viewChanged: event })
    localStorage.setItem('lastView', event);
  }

  return(
    <>
      <Navbar />

      {/* @ts-ignore */}
      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />

      <ButtonAddNew />
      <ButtonDelete />
    </>
  );
}