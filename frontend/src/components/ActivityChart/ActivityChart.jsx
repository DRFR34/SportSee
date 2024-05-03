
import React from 'react';
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

import CustomTooltip from '../CustomTooltip/CustomTooltip.jsx';
import LoadingOrNoDataMsg from '../LoadingOrNoDataMsg/LoadingOrNoDataMsg.jsx';


import './ActivityChart.scss';



/**
 * Renders the ActivityChart component.
 *
 * @param {boolean} isLoading - Indicates if the chart is currently loading.
 * @param {object} userActivityData - The data for the chart.
 * @return {JSX.Element} The rendered ActivityChart component.
 */
export default function ActivityChart({ isLoading, userActivityData }) {

  if (!userActivityData || (userActivityData.sessions && userActivityData.sessions.length === 0)) {
    return (
      <article className='barChartCtnr'>
        <LoadingOrNoDataMsg isLoading={isLoading} expectedData={userActivityData} />
      </article>
    )
  }

  return (
    

      <article className="barChartCtnr">
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
              tick={{ fill: '#9B9EAC', style: { fontSize: 14 } }}
              tickCount={3}
              domain={['dataMin-2', 'dataMax+1']}
            />


            <Tooltip
              content={<CustomTooltip customTooltipClass={'activityChartTooltip'} />}
            />

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
      </article >
    
  );
}

ActivityChart.propTypes = {

  isLoading: PropTypes.bool.isRequired,
  userActivityData: PropTypes.object.isRequired
  
};