import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';


const dateFormatter = (date) =>
  new Date(date).toLocaleDateString();

const aggregateOrdersByDay = (orders) => orders
  .filter((order) => order.status !== 'cancelled')
  .reduce((acc, curr) => {
    const day = format(new Date(curr.date), 'yyyy-MM-dd');
    if (!acc[day]) {
      acc[day] = 0;
    }
    acc[day] += curr.total;
    return acc;
  }, {});

const getRevenuePerDay = (orders, lastMonthDays) => {
  const daysWithRevenue = aggregateOrdersByDay(orders);
  return lastMonthDays.map(date => ({
    date: date.getTime(),
    total: daysWithRevenue[format(new Date(date), 'yyyy-MM-dd')] || 0,
  }));
};

const OrderChart = ({orders, aMonthAgo, lastMonthDays}) => {
  if (!orders) {
    return null;
  }

  return (
    <Card sx={{width: '100%'}}>
      <CardContent>
        <div style={{width: '100%', height: 300}}>
          <ResponsiveContainer>
            <AreaChart data={getRevenuePerDay(orders, lastMonthDays)}>
              <defs>
                <linearGradient
                  id="colorUv"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#8884d8"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#8884d8"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                name="Date"
                type="number"
                scale="time"
                domain={[addDays(aMonthAgo, 1).getTime(), new Date().getTime()]}
                tickFormatter={dateFormatter}
              />
              <YAxis dataKey="total" name="Revenue" unit="$"/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip
                cursor={{strokeDasharray: '3 3'}}
                formatter={(value) =>
                  new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: 'USD',
                  }).format(value)
                }
                labelFormatter={(label) =>
                  dateFormatter(label)
                }
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                strokeWidth={2}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};


export default OrderChart;