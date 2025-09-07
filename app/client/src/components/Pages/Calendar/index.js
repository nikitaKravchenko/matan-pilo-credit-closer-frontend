import React, {useEffect, useState} from 'react';
import {Title, useGetList} from "react-admin";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import ViewModalWindow from "../../ModalWindow/calendar";
import Calendar from "./Calendar";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import './styles.css';

import {styleCard} from "../../ModalWindow/calendar/styles";

const searchEvent = (search, str1, str2, str3) => {
  return str1.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    || str2.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    || str3.toLocaleLowerCase().includes(search.toLocaleLowerCase())
}

const FullCalendar = () => {
  const [dataModal, setDataModal] = useState({type: '', open: false, data: null});
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');

  const [gap, setGap] = useState(null);

  const {data = [], isLoading} = useGetList('calendar/event', {
    pagination: {},
    filter: gap,
    sort: {}
  });

  const setStartEndDate = (date) => {
    setGap({start: date.startStr, end: date.endStr});
  }

  const eventClick = ({event}) => {
    setDataModal({
      type: 'view',
      open: true,
      data: event._def.extendedProps.data
    });
  }

  const closeModalWindow = () => {
    setDataModal(e => ({...e, open: false}))
  }

  const Search = ({target}) => {
    setSearch(target.value)
  }

  useEffect(() => {
    if (!isLoading) {
      setEvents(data.map((e) => ({
        ...e,
        display: search.length > 2 ?
          searchEvent(search, e.full_name, e.phone, e.email) : true
      })));
    }
  }, [data, search, isLoading]);

  return (
    <Box sx={{marginTop: '2em'}}>
      <Title title='Calendar'/>
      <TextField
        className='calendar-search'
        type='search'
        label='Search'
        onChange={Search}
        sx={{marginBottom: '10px'}}
      />
      <Box>
        <Calendar
          datesSet={setStartEndDate}
          eventClick={eventClick}
          data={events}
        />
      </Box>
      <Modal
        open={dataModal.open}
        onClose={closeModalWindow}
      >
        <Box sx={styleCard}>
          <ViewModalWindow
            dataModal={dataModal}
            setDataModal={setDataModal}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default FullCalendar;
