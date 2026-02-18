
export const lineChartData = {
    labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ],
    datasets: [
        {
            label: "Muzammil",
            data: [3000, 5000, 5254, 10000, 2514, 9000, 6000],
            borderColor: "rgb(75,192, 192)",
        },
          {
            label: "Suman",
            data: [2000, 4000, 6254, 8000, 2014, 4000, 7000],
            borderColor: "rgb(255, 21, 4)",
                        width: "1000px",
            height: "500px"
        },
    ],
};



export const barChartData = {
    labels: ["Rend", "Groceries", "Utilities", "Enterntainement", "Transportation"],
  
    datasets: [
        {
            label: "Expenses",
            data: [1200, 300, 430, 220,230],
            backgroundColor: ["rgb(255, 21, 4)", "rgb(208, 39, 246)", "rgb(4, 117, 255)", "rgb(4, 255, 142)","rgb(255, 209, 4)"],
            borderColor: "purple",
            borderWidth: 1.2,
            width: "1000px",
            height: "500px"
        }
    ]
}

export const PieChartData = {
    labels: ["Facebook", "Instagram", "Twitter", "Youtube", "LinkedIn"],
    datasets: [
        {
            label: "Time Spend",
            data: [58, 60, 30 , 40, 50],
            backgroundColor: ["rgb(255, 21, 4)", "rgb(208, 39, 246)", "rgb(4, 117, 255)", "rgb(4, 255, 142)","rgb(255, 209, 4)"],
            hoverOffset: 20,
        }
    ]
}