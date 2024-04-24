import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle
} from 'recharts';

import LoadingOrNoDataMsg from '../LoadingOrNoDataMsg/LoadingOrNoDataMsg';

import ApiService from '../../utils/apiService.js'



import './SessionsChart.scss';


export default function SessionsChart({ currentUserId }) {

  const [userAverageSessions, setUserAverageSessions] = useState(null); //userMainData is object
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserAverageSessions = async () => {
      setIsLoading(true);
      const fetchedData = await ApiService.getUserAverageSessions(currentUserId);
      setUserAverageSessions(fetchedData);
      setIsLoading(false);
    }

    getUserAverageSessions();
  }, [currentUserId]);

  if (!userAverageSessions) {
    return (
      <div className="sessionsChartContainer">
        <LoadingOrNoDataMsg isLoading={isLoading} expectedData={userAverageSessions} />
      </div>
    )
  }

  const dayNames = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  const userSessionsWithDay = userAverageSessions.sessions.map(session => {
    return { ...session, day: dayNames[session.day - 1] };
  });

  const CustomTooltip = ({ active, payload, boxClass }) => {

    if (active && payload && payload.length) {
      return (
        <div className={`${boxClass}`}>
          <span className="customTooltip__item">
            {`${payload[0].payload.sessionLength} min`}
          </span>
        </div>
      );
    }
    return null;
  };

  const CustomCursor = (props) => {
    const { points, width, height } = props
    const { x } = points[0]
    return (
      <Rectangle
        fill="rgba(0,0,0,0.1)"
        stroke="none"
        x={x}
        y={0}
        width={width}
        height={height}
      />
    )
  }

  return (

    <div className="sessionsChartContainer">

      <h2 className='sessionsChartContainer__title'>
        Durée moyenne des sessions
      </h2>

      <ResponsiveContainer
        className={"sessionsChartContainer__responsive"} width="100%"
        height="99%"
      >

        <LineChart
          data={userSessionsWithDay}
          margin={{ top: 90, right: 0, left: 0, bottom: 10 }}
        >

          <XAxis
            dataKey="day"
            padding={{ left: 20, right: 20 }}
            axisLine={false}
            tickLine={false}
            stroke="white"
            style={{
              opacity: '0.7',
              fontWeight: 'bold',
              fontSize: '0.8rem'
            }}
          />

          <YAxis hide domain={['dataMin-10', 'dataMax+10']} />

          <Tooltip
            content={<CustomTooltip boxClass={'sessionsChartTooltip'} />}
            cursor={<CustomCursor width={500} height={500} />}
          />

          <Line
            dataKey="sessionLength"
            type="natural"
            style={{ stroke: "white", padding: '60px' }}
            strokeWidth={2}
            dot={false}
            activeDot={{ stroke: "white", strokeWidth: '2', r: 3, fill: "white" }}
          />

        </LineChart>

      </ResponsiveContainer>
    </div>
  )
}
