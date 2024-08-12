document.addEventListener("DOMContentLoaded", function () {
  // Define teams and their respective employees
  const teams = {
    Bahaa: ["A", "B"],
    Abdulrahman: ["C", "D"],
    Nirvana: ["E", "F"],
  };

  // Populate team dropdown
  const teamSelect = document.getElementById("team");
  for (const team in teams) {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    teamSelect.appendChild(option);
  }

  // Handle team selection change
  teamSelect.addEventListener("change", function () {
    const selectedTeam = teamSelect.value;
    const employeeSelect = document.getElementById("employeeName");
    employeeSelect.innerHTML = ""; // Clear previous options

    if (selectedTeam) {
      teams[selectedTeam].forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        employeeSelect.appendChild(option);
      });
    }
  });

  // Form submission handler
  document
    .getElementById("timesheet-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form values
      const team = document.getElementById("team").value;
      const employeeName = document.getElementById("employeeName").value;
      const date = document.getElementById("date").value;
      const hoursWorked = parseFloat(
        document.getElementById("hoursWorked").value
      );
      const leads = parseInt(document.getElementById("leads").value, 10);

      // Validate input
      if (
        !employeeName ||
        !team ||
        isNaN(hoursWorked) ||
        hoursWorked < 0 ||
        isNaN(leads) ||
        leads < 0
      ) {
        alert("Please enter valid data.");
        return;
      }

      // Add record to timesheet table
      const timesheetTableBody = document
        .getElementById("timesheet-table")
        .getElementsByTagName("tbody")[0];
      const newRow = timesheetTableBody.insertRow();
      newRow.insertCell().textContent = team;
      newRow.insertCell().textContent = employeeName;
      newRow.insertCell().textContent = date;
      newRow.insertCell().textContent = hoursWorked.toFixed(2);
      newRow.insertCell().textContent = leads;

      // Update summaries
      updateSummary();
      updateTeamSummary();
    });

  function updateSummary() {
    const timesheetTableBody = document
      .getElementById("timesheet-table")
      .getElementsByTagName("tbody")[0];
    const rows = timesheetTableBody.getElementsByTagName("tr");
    const summaryMap = {};

    // Aggregate hours and leads by employee
    for (const row of rows) {
      const cells = row.getElementsByTagName("td");
      const employeeName = cells[1].textContent;
      const hoursWorked = parseFloat(cells[3].textContent);
      const leads = parseInt(cells[4].textContent, 10);

      if (!summaryMap[employeeName]) {
        summaryMap[employeeName] = { hours: 0, leads: 0 };
      }
      summaryMap[employeeName].hours += hoursWorked;
      summaryMap[employeeName].leads += leads;
    }

    // Update summary table
    const summaryTableBody = document
      .getElementById("summary-table")
      .getElementsByTagName("tbody")[0];
    summaryTableBody.innerHTML = "";

    for (const [name, summary] of Object.entries(summaryMap)) {
      const newRow = summaryTableBody.insertRow();
      newRow.insertCell().textContent = name;
      newRow.insertCell().textContent = summary.hours.toFixed(2);
      newRow.insertCell().textContent = summary.leads;
    }
  }

  function updateTeamSummary() {
    const timesheetTableBody = document
      .getElementById("timesheet-table")
      .getElementsByTagName("tbody")[0];
    const rows = timesheetTableBody.getElementsByTagName("tr");
    const teamSummaryMap = {};

    // Aggregate hours and leads by team
    for (const row of rows) {
      const cells = row.getElementsByTagName("td");
      const team = cells[0].textContent;
      const hoursWorked = parseFloat(cells[3].textContent);
      const leads = parseInt(cells[4].textContent, 10);

      if (!teamSummaryMap[team]) {
        teamSummaryMap[team] = { hours: 0, leads: 0 };
      }
      teamSummaryMap[team].hours += hoursWorked;
      teamSummaryMap[team].leads += leads;
    }

    // Update team summary table
    const teamSummaryTableBody = document
      .getElementById("team-summary-table")
      .getElementsByTagName("tbody")[0];
    teamSummaryTableBody.innerHTML = "";

    for (const [team, summary] of Object.entries(teamSummaryMap)) {
      const newRow = teamSummaryTableBody.insertRow();
      newRow.insertCell().textContent = team;
      newRow.insertCell().textContent = summary.hours.toFixed(2);
      newRow.insertCell().textContent = summary.leads;
    }
  }
});
