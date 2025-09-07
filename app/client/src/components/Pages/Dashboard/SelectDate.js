import React from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import AutoCompleteCustomer from "../../CustomInputs/AutoCompleteCustomer";

const SelectDate = ({
  date,
  setDate,
  setFilter,
  isSmall,
}) => {
  const handleChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <>
      <div>
        <FormControl sx={{margin: isSmall ? '0 16px 0 0' : '8px 16px 0 0', width: 250}}>
          <InputLabel id="label-date-1">Date</InputLabel>
          <Select
            value={date}
            onChange={handleChange}
            labelId='label-date'
            label='Date'
          >
            <MenuItem value={7}>Next Week</MenuItem>
            <MenuItem value={-7}>Last Week</MenuItem>
            <MenuItem value={14}>Next 2 week</MenuItem>
            <MenuItem value={-14}>Last 2 week</MenuItem>
            <MenuItem value={30}>Next 30 days</MenuItem>
            <MenuItem value={-30}>Last 30 days</MenuItem>
            <MenuItem value={183}>Next Half a year</MenuItem>
            <MenuItem value={-183}>Last Half a year</MenuItem>
            <MenuItem value={365}>Next Year</MenuItem>
            <MenuItem value={-365}>Last Year</MenuItem>
            <MenuItem value='all'>All</MenuItem>
          </Select>
        </FormControl>
      </div>
      <AutoCompleteCustomer
        setCustomerId={(value) => setFilter(e => ({...e, customerId: value}))}
        style={{xs: '250px', sm: '300px'}}
        m='0 10px 0 0'
      />
    </>
  )
}

export default SelectDate;