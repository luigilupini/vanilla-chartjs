const chart = document.querySelector("#chart").getContext("2d");

let gradient = chart.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(58, 123, 213, 1");
gradient.addColorStop(1, "rgba(0, 210, 255, 0.4");

let delayed;

const labels = [
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
];

const data = {
  labels: labels,
  datasets: [
    {
      data: [211, 326, 185, 365, 420, 374, 490, 372, 415],
      label: "Sales",
      fill: true,
      backgroundColor: gradient,
      borderColor: "#3e3e3e",
      pointBackgroundColor: "#585858",
      tension: 0.2,
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    plugins: {
      tooltip: { padding: 12 },
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            weight: "bold",
            size: 14,
          },
        },
      },
    },
    radius: 5,
    hitRadius: 30,
    hoverRadius: 15,
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: (value) => `$${value}m`,
        },
      },
    },
    // # https://www.chartjs.org/docs/latest/samples/animations/delay.html
    animation: {
      onComplete: () => (delayed = true),
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  },
};

const myChart = new Chart(chart, config);
