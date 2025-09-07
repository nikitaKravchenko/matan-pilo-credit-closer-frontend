import React from 'react';
import addHours from "date-fns/addHours";
import format from "date-fns/format";
import useMediaQuery from "@mui/material/useMediaQuery";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

import RenderEventContent from "./RenderEventContent";

const Calendar = ({datesSet, data, eventClick}) => {
  const isSmall = useMediaQuery(theme =>
    theme.breakpoints.down('sm')
  );

  const EventDataTransform = (e) => {
    let date = e.date;
    const newDate = new Date(date);

    if(e.status === 'Waiting for payment') {
      date = format(newDate, 'yyyy-MM-dd');
    } else {
      date = format(addHours(new Date(newDate), -3), 'yyyy-MM-dd HH:mm');
    }

    return {
      start: date,
      data: {...e, date}
    }
  }

  return (
    <FullCalendar
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      initialView='dayGridMonth'
      events={data}
      datesSet={datesSet}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      eventClick={eventClick}
      eventDataTransform={EventDataTransform}
      eventContent={RenderEventContent}
      headerToolbar={{
        left: isSmall ? 'title' : "prev,today,next",
        center: isSmall ? "prev,today,next" : "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
      }}
    />
  );
};

export default Calendar;
