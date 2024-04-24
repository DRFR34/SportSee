
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis, YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';

import CustomTooltip from '../CustomTooltip/CustomTooltip';
import LoadingOrNoDataMsg from '../LoadingOrNoDataMsg/LoadingOrNoDataMsg';

import ApiService from '../../utils/apiService';
import './ActivityChart.scss';


export default function ActivityChart({ currentUserId }) {

  const [userActivityData, setUserActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserActivity = async () => {
      setIsLoading(true);
      const fetchedData = await ApiService.getUserActivity(currentUserId);
      setUserActivityData(fetchedData);
      setIsLoading(false);
    }

    fetchUserActivity();
  }, [currentUserId]);


  return (
    <>
      <LoadingOrNoDataMsg
        isLoading={isLoading}
        expectedData={userActivityData}
      />

      <div className="barChartCtnr">
        <h2 className='barChartCtnr__title'>
          Activité quotidienne
        </h2>

        <ResponsiveContainer >          

          <BarChart
            data={userActivityData.sessions}
            barSize={7}
            barGap={8}
          >

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={15}
              tick={{ style: { fontSize: 14 } }}
              tickFormatter={(day) => new Date(day).getDate()}
            />


            <YAxis
              hide
              yAxisId="calories"
              dataKey="calories"
              orientation="right"
              tickCount={0}
              domain={['dataMin-100', 'dataMax+50']}
            />

            <YAxis
              yAxisId="kilogram"
              dataKey="kilogram"
              orientation="right"
              tick={{ fill: '#9B9EAC', style: { fontSize: 14 } }} tickCount={3}
              domain={['dataMin-2', 'dataMax+1']}
            />


            <Tooltip content={<CustomTooltip boxClass={'activityChartTooltip'} />} />

            <Legend
              verticalAlign="top"
              align='right'
              height={80}
              iconType="circle"
              iconSize={10}
            />

            <Bar
              name="Poids (kg)"
              dataKey="kilogram"
              yAxisId="kilogram"
              fill="#282d30"
              padding={3}
              radius={[4, 4, 0, 0]}
            />

            <Bar
              name="Calories brûlées (kCal)"
              dataKey="calories"
              yAxisId="calories"
              fill="#e60000"
              radius={[4, 4, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div >
    </>
  );
}
