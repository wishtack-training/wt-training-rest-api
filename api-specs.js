/**
 * Create user.
 * POST /users
 */
request = {
    "firstName": "Foo",
    "lastName": "BAR",
    "email": "foo.bar@wishtack.com",
    "address": {
        "city": "Lyon"
    }
}

response = {
    "id": "USER_ID_1",
    "firstName": "Foo",
    "lastName": "BAR",
    "email": "foo.bar@wishtack.com",
    "address": {
        "city": "Lyon",
        "postalCode": "69000" // Added by API
    }
}

/**
 * POST /users/USER_ID_1/job-submissions
 */
request = {
    "agencies": [
        {
            "id": "AGENCY_ID_1"
        },
        {
            "id": "AGENCY_ID_2"
        }
    ],
    "jobTitle": "Commercial",
    ...
}

response = {
    "id": "JOB_SUBMISSION_ID",
    "agencies": [
        {
            "id": "AGENCY_ID_1"
        }
        // AGENCY_ID_2 has been ignored
    ],
    "jobTitle": "Commercial"
}

/**
 * Upload resume.
 * POST /job-submissions/JOB_SUBMISSION_ID/resume-files
 * Content-Type: text/plain
 */
...file data...

// API code
writeFile('resumes/JOB_SUBMISSION_ID.pdf', request.dataStream);
jobSubmission.filePath = 'resumes/JOB_SUBMISSION_ID.pdf';

/**
 * Update user info.
 */
// PATCH /users/USER_ID_1
request = {
    "email": "foo.bar@wishtack.com"
}

response = {
    "firstName": "...",
    "email": "foo.bar@wishtack.com"
}

/**
 * User removal request.
 */
// POST /users/USER_ID/removal-requests
request = {
    "email": true,
    "jobSubmissions": true
}


/**
 * Submission workflow: Cancel submission.
 */
// POST /job-submissions/JOB_SUBMISSION_ID/cancelations
request = {
    "reason": "..."
}

response = {
    "id": "...",
    "reason": "..."
}

// POST /job-submissions/JOB_SUBMISSION_ID/refusals
request = {
    "internalReason": "...",
    "reason": "..."
}

response = {
    "id": "...",
    "internalReason": "...",
    "reason": "..."
}

// GET /job-submissions/JOB_SUBMISSION_ID/steps
response = {
    "items": [
        {
            "type": "creation",
            "creationDate": "..."
        },
        {
            "type": "cancelation",
            "creationDate": "...",
            "reason": "..."
        },
        {
            "type": "refusal",
            "creationDate": "...",
            "reason": "..."
        }
    ]
}

/**
 * Retrieve all submissions
 */
// GET /agencies/AGENCY_ID_1/job-submissions?fields=user.id
response = {
    "meta": {
        "offset": 0,
        "limit": 10,
        "totalCount": 150
    },
    "items": [
        {
            "type": "job-submission",
            "user": {
                "id": "",
                "firstName": "",
                "lastName": ""
            },
            "jobTitle": "...",
            "jobOffer": {
                "startDate": "...",
                "jobTitle": "..."
            },
            "resumeUrl": "https://domain/JOB_SUBMISSION_1.pdf"
        },
        {
            "type": "external-job-submission",
            "user": {
                "id": "",
                "firstName": "",
                "lastName": ""
            },
            "jobTitle": "...",
            "jobOffer": {
                "startDate": "...",
                "jobTitle": "..."
            },
            "partner": {
                "id": "recruteur-123",
                "phoneNumber": "..."
            },
            "resumeUrl": "https://domain/JOB_SUBMISSION_1.pdf"
        }
    ]
}