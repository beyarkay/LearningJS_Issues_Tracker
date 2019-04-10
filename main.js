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

function saveIssue(e){
    // First, retrieve and store all the variables
    var issueId = change.guid(); // generate an id using change module
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Open';
    var issue = {
        id:issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else{
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues))
    }
    // Now that we have what we want, remove the old data from the form
    document.getElementById('issueInputForm').reset();

    // Regenerate the output list to actually make the new issue visible
    fetchIssues();

    // Stop JS from doing the default form submission, we've taken care of that
    e.preventDefault();
}
