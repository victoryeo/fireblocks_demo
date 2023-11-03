import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
interface IData {
  data: any;
}

const pieChart = ({ data }: IData) => {
  const [peiData, setPeiData] = useState(null);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [borderColor, setBorderColor] = useState([]);

  // Some required function
  const generateRandomColor = () => {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    return color;
  };
  const generateLighterShade = (color: any, percent: any) => {
    var factor = 1 + percent / 100;
    var lighterColor = color
      .slice(4, -1)
      .split(',')
      .map(function (value: any) {
        return Math.min(Math.floor(parseInt(value) * factor), 255);
      });
    return 'rgb(' + lighterColor.join(', ') + ')';
  };

  const generateDarkerShade = (color: any, percent: any) => {
    var factor = 1 - percent / 100;
    var darkerColor = color
      .slice(4, -1)
      .split(',')
      .map(function (value: any) {
        return Math.max(Math.floor(parseInt(value) * factor), 0);
      });
    return 'rgb(' + darkerColor.join(', ') + ')';
  };

  useEffect(() => {
    data?.map((value: any) => {
      setLabels((prev) => [...prev, value?.Name]);
      setValues((prev) => [...prev, Number(value?.balance)]);
      let baseColor = generateRandomColor();
      setBackgroundColor((prev) => [
        ...prev,
        generateLighterShade(baseColor, 20),
      ]);
      setBorderColor((prev) => [...prev, generateDarkerShade(baseColor, 20)]);
    });
  }, []);

  useEffect(() => {
    if (labels !== null) {
      const data1 = {
        labels: labels,
        datasets: [
          {
            label: 'Token',
            data: values,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      };
      setPeiData(data1);
    }
  }, [labels, values, backgroundColor, borderColor]);

  console.log('pei data: ', peiData);

  return <>{peiData && <Pie data={peiData} />}</>;
};

export default pieChart;
