import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import styles from './styles.module.scss';

interface IRadarChartProps {
  label: string;
  radars: [
    {
      name: string;
      dataKey: string;
    },
  ];
  data: unknown[];
}

const customLabel = ({ payload, x, y, textAnchor, stroke, radius }) => (
  <g className="recharts-layer recharts-polar-angle-axis-tick">
    <text
      radius={radius}
      stroke={stroke}
      x={x}
      y={y}
      className="recharts-text recharts-polar-angle-axis-tick-value"
      textAnchor={textAnchor}
    >
      <tspan
        className={styles.label}
        x={x}
        dy={payload.index === 3 ? '1em' : '0em'}
      >
        {payload.value}
      </tspan>
    </text>
  </g>
);

const BaseRadarChart = ({
  label,
  radars,
  data,
}: IRadarChartProps): JSX.Element => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={label} tick={customLabel} />
        {/* <PolarRadiusAxis tick={false} angle={90} domain={[0, 255]} /> */}
        {radars.map(radar => (
          <Radar
            key={radar.name}
            name={radar.name}
            dataKey={radar.dataKey}
            className={styles.radar}
            fillOpacity={0.6}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default BaseRadarChart;
