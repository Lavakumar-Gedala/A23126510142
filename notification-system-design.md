Stage 1

I tried to design the notification system API.

I think the notification system needs to do these things:

1. Get the list of notifications: Show a list of messages. Maybe filter them by read or unread.
2. Count unread ones: Show a number badge for new notifications.
3. Mark as read: Change a notification status to read.
4. Mark all as read: Clear all of them at once.
5. Delete: Get rid of a notification.

6. The API Endpoints (Base path: `/api/v1`)

We need a token to log in. I think we put it in the Authorization header.

Headers we need:
`Authorization: Bearer <token>`
`Content-Type: application/json`
2.1 GET `/api/v1/notifications` (Get List)
Here is a list of notifications. (I might have missed a comma or something in the JSON below).

Params:
`page` = 1
`limit` = 15

Response:
json
{
"succes": true
"data": [
{
"id": "notif-12345",
"title": "Alert!",
"body": "Your package was deployed.",
"isRead": "false",
"createdAt": "June 23"
}
]
}
2.2 GET `/api/v1/notifications/unread-count` (Get Number)
This endpoint gets the count of new messages.
Response:
json
{
"success": true,
"count": "nine"
}

2.3 PATCH `/api/v1/notifications/read` (Mark Read)
This updates the notification status.
My Request Body:
json
{
"ids": "notif-12345"
}
Response:
json
{
"success": true
}

2.4 POST `/api/v1/notifications/read-all`
Marks everything read.
Response:
{
"success": true,
"message": "done"
}

2.5 DELETE `/api/v1/notifications/:id`
Deletes one message.
Response:

```json
{
  "success": true
}


Stage 2
Database Choice and Storage Design

Now we need to store notifications in a database because if we don’t, all data will be lost when the server stops.

1. Which Database?

I think we should use PostgreSQL.

It is a SQL database.
It stores data in tables like rows and columns.
It is popular and free.
Many people use it so we can easily learn from tutorials

2. My Database Table (Schema)

I created a table for notifications.

CREATE TABLE notifications (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    category VARCHAR(20),
    urgency VARCHAR(10),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

 Get all notifications
SELECT * FROM notifications
WHERE user_id = 'user-123'
ORDER BY created_at DESC;

 Get unread count
SELECT COUNT(*) FROM notifications
WHERE user_id = 'user-123' AND is_read = FALSE;

 Mark as read
UPDATE notifications
SET is_read = TRUE
WHERE id IN ('notif-1', 'notif-2')
AND user_id = 'user-123';

Mark all as read
UPDATE notifications
SET is_read = TRUE
WHERE user_id = 'user-123';

 Delete notification
DELETE FROM notifications
WHERE id = 'notif-123'
AND user_id = 'user-123';


Stage 3

Query Optimization and Indexing

In our project, we found that one database query was running very slow. I will explain the problem and how to fix it in a simple way.
 The Query
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;

 Cost of adding index
Advantages:
Faster search queries
Better performance for large data
Disadvantages:
Insert and update becomes a little slower
Index takes extra storage space

 My Query for Placement Notifications (Last 7 Days)

SELECT DISSTINCT studentID FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days'

