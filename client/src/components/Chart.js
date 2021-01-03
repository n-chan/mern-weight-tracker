import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { GlobalContext } from "../context/GlobalState";

import moment from "moment";

/**
 * Component for displaying a line chart for weight tracking.
 */
function Chart() {
  const { entries } = useContext(GlobalContext);

  // Extract all the dates for chart's x-axis.
  // Then, extract the weights for the y-axis.
  const dates = entries.map((entry) =>
    new moment(entry.date).utc().format("YYYYMMDD")
  );
  const weights = entries.map((entry) => entry.weight);

  return (
    <div>
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              data: weights,
              fill: false,
              backgroundColor: "white",
              borderColor: "blue",
              pointBorderWidth: 2,
              pointRadius: 5,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Weight (lbs)",
                  fontSize: 15,
                },
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Date",
                  fontSize: 15,
                },
                type: "time",
                time: {
                  unit: "week",
                  tooltipFormat: "MM/DD/YYYY",
                },
                distribution: "series",
              },
            ],
          },
          legend: {
            display: false,
          },
          tooltips: {
            titleFontSize: 25,
            bodyFontSize: 25,
          },
        }}
      />
    </div>
  );
}

export default Chart;
