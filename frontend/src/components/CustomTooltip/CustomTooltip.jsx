

import React from 'react'

export default function CustomTooltip({ active, payload, label, boxClass }) {
    if (active && payload && payload.length) {

        return (
            <div className={`${boxClass}`}>
              <span className="customTooltip__item">{ `${payload[0].value} kg`}</span>
              <span className="customTooltip__item">{ `${payload[1].value} kCal`}</span>
            </div>
          );
    }
    return null;
}
 
