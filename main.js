//Source: https://medium.com/codingthesmartway-com-blog/pure-javascript-building-a-real-world-application-from-scratch-5213591cfcd6

function fetchIssues() {
    // Get issues from local storage, parsed into a JSON object
    var issues = JSON.parse(localStorage.getItem('issues'));
    // get a reference to the <div> element with id=issueList
    var issuesList = document.getElementById('issuesList');

    // First, reset the HTML of the issuesList to be an empty string
    issuesList.innerHTML = '';

    // Then,
    for (var i = 0; i < issues.length; i++) {
        // Retrieve the appropriate variables from issuesList
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        // Pass those variables onto the HTML, encased in divs and p blocks and such
        issuesList.innerHTML += '<div class="well">' +
            '<h6>Issue ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' ' +
            '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + ' </p>' +
            '<a href="#" ' +
            'class="btn btn-warning" ' +
            'onclick="setStatusClosed(\'' + id + '\')">Close</a> ' +
            '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' + id + '\')">Delete</a>' +
            '</div>';
    }
}

// Get an event handler for when forms are submitted
// I think the JS reacts to this line of HTML:
// <button type="submit" class="btn btn-primary">Add</button>
document.getElementById('issueImportForm').addEventListener('submit', saveIssue);

