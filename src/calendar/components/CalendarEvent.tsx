interface Event {
    user: {
        _id: string,
        name: string,
    };
    title: string;  
}
 
interface Props {
    event: Event
}

export const CalendarEvent = ( { event } : Props ) => {
    const { title } = event;
    // const { title, user} = event;

    return (
        <>
            <strong>{ title }</strong>
            {/* <strong> - { user.name }</strong> */}
        </>
    );
}
