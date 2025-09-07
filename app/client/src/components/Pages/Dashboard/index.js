import React, {useState} from 'react';
import {useGetList, SimpleForm, Title} from "react-admin";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import TotalProfit from "./TotalProfit";
import OrderChart from "./OrederCheard";
import SelectDate from "./SelectDate";

import {useTypeDataAnalytic} from "../../../utils/hooks/useTypeDataAnalytic";
import {usePartsDate} from "../../../utils/hooks/usePartsDate";
import useMediaQuery from "@mui/material/useMediaQuery";

const Dashboard = () => {
  const [date, setDate] = useState('7');
  const [filter, setFilter] = useState({start: new Date(), end: new Date(), customerId: 0, all: false});

  const {data: analytics = []} = useGetList('analytics/interval', {
    sort: [],
    pagination: {page: 0, perPage: 0},
    filter
  });

  const [startParts] = usePartsDate(
    analytics[0]?.min,
    analytics[0]?.max
  );

  const [aMonthAgo, lastMonthDays] = useTypeDataAnalytic(
    date,
    setFilter,
    startParts,
    filter.customerId
  );

  const isSmall = useMediaQuery(theme =>
    theme.breakpoints.down('sm')
  );

  return (
    <SimpleForm toolbar={false} onSubmit={() => {
    }}>
      <Box width={{xs: '100%', sm: '95%'}}>
        <Title title='Analytics'/>
        <Box mb='10px' width='100%'>
          <Card sx={{padding: 2, display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap'}}>
            <SelectDate
              date={date}
              setDate={setDate}
              setFilter={setFilter}
              isSmall={isSmall}
            />
          </Card>
        </Box>
        <TotalProfit
          date={date === 'all'}
          data={analytics[0]}
        />
        {!isSmall && (
          <OrderChart
            orders={analytics[0]?.payments || []}
            lastMonthDays={lastMonthDays}
            aMonthAgo={aMonthAgo}
          />
        )}
      </Box>
    </SimpleForm>
  );
};

export default Dashboard;