import React, { useEffect, useState } from 'react';
import './App.css';

function Gamma({ data }) {
  const classes = 3; 
  const [gammaData, setGammaData] = useState([]);

  useEffect(() => {
    const gammaValues = data.map((item) => ({
      ...item,
      Gamma: (item.Ash * item.Hue) / item.Magnesium,
    }));

    setGammaData(gammaValues);
  }, [data]);


  const calculateMean = () => {
    const mean = Array.from({ length: classes }, () => ({ sum: 0, count: 0 }));

    gammaData.forEach((item) => {
      const classIndex = item.Alcohol - 1;
      mean[classIndex].sum += item.Gamma;
      mean[classIndex].count++;
    });

    for (let i = 0; i < classes; i++) {
      if (mean[i].count > 0) {
        mean[i] = mean[i].sum / mean[i].count; 
      } else {
        mean[i] = NaN; 
      }
    }

    return mean;
  };


  const calculateMedian = () => {
    const median = Array.from({ length: classes }, () => []);

    gammaData.forEach((item) => {
      median[item.Alcohol - 1].push(item.Gamma);
    });

    for (let i = 0; i < classes; i++) {
      median[i].sort((a, b) => a - b);
      const middle = Math.floor(median[i].length / 2);

      if (median[i].length % 2 === 0) {
        median[i] = (median[i][middle - 1] + median[i][middle]) / 2;
      } else {
        median[i] = median[i][middle];
      }
    }

    return median;
  };


  const calculateMode = () => {
    const mode = Array.from({ length: classes }, () => 0);

    gammaData.forEach((item) => {
      mode[item.Alcohol - 1]++;
    });

    return mode;
  };

  const means = calculateMean();
  const medians = calculateMedian();
  const modes = calculateMode();

  return (
    <div className= 'table-container' >
    <table className= 'wine-table'>
      <thead>
        <tr>
          <th>Measure</th>
          {Array.from({ length: classes }, (_, i) => (
            <th key={i}>Class {i + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Gamma Mean</td>
          {means.map((mean, i) => (
            <td key={i} className="cell">
                {mean !== undefined ? mean.toFixed(3) : 'N/A'}
            </td>
          ))}
        </tr>
        <tr>
          <td>Gamma Median</td>
          {medians.map((median, i) => (
            <td key={i} className="cell"> 
                {median !== undefined ? median.toFixed(3) : 'N/A'}
            </td>
          ))}
        </tr>
        <tr>
          <td>Gamma Mode</td>
          {modes.map((mode, i) => (
            <td key={i} className="cell">
                {mode !== undefined ? mode : 'N/A'}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
    </div>
  );
}

export default Gamma;
