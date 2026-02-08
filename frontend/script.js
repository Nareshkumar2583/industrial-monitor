let tempChart, voltChart;

function loadDashboard() {

fetch("http://localhost:5000/api/sensor/all")
.then(res => res.json())
.then(data => {

    const table = document.querySelector("#dataTable tbody");
    table.innerHTML = "";

    let labels = [];
    let temps = [];
    let volts = [];

    let totalTemp = 0;
    let alertCount = 0;

    data.forEach(item => {

        totalTemp += item.temperature;
        if(item.alert === "Warning !") alertCount++;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.device}</td>
            <td>${item.temperature}</td>
            <td>${item.voltage}</td>
            <td>${item.alert}</td>
            <td>${new Date(item.time).toLocaleString()}</td>
        `;

        table.appendChild(row);

        labels.push(item.device);
        temps.push(item.temperature);
        volts.push(item.voltage);
    });

    // ⭐ UPDATE CARDS
    document.getElementById("deviceCount").innerText = data.length;

    document.getElementById("avgTemp").innerText =
        data.length ? (totalTemp/data.length).toFixed(1) : 0;

    document.getElementById("alertCount").innerText = alertCount;

    // charts
    if(tempChart) tempChart.destroy();
    if(voltChart) voltChart.destroy();

    tempChart = new Chart(document.getElementById("tempChart"), {
        type: "line",
        data: { labels, datasets: [{ label:"Temperature", data: temps }] }
    });

    voltChart = new Chart(document.getElementById("voltChart"), {
        type: "bar",
        data: { labels, datasets: [{ label:"Voltage", data: volts }] }
    });

});
}

setInterval(loadDashboard, 3000);
loadDashboard();
