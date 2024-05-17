import { useCalendarStore } from "../../hooks/useCalendarStore";


export const ButtonDelete = () => { 

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelate = () =>{
        startDeletingEvent();
    }

    return (
    <button
        className="btn btn-danger fab-delete"
        onClick={ handleDelate }
        style={{
            display: hasEventSelected ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>

    </button>
    )
}
