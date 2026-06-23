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


3. Schemas (Rules for the data)

I tried to write a JSON Schema. I copied this from the internet, but I think I broke some of the syntax.

json
{
  "schema": "http://json-schema.org/draft-07/schema#", // Missing the "$" sign in front of schema
  "type": "object",
  "required": ["success", "data"],
  }

```

---

Stage 2
Database Choice and Storage Design

Now we need to store notifications in a database because if we don’t, all data will be lost when the server stops.

1. Which Database?

I think we should use PostgreSQL.

It is a SQL database.
It stores data in tables like rows and columns.
It is popular and free.
Many people use it so we can easily learn from tutorials.

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

3. Problems if data becomes large

If many users start using the app, some problems can happen:

Slow performance
It may take time to find notifications if data is too large.
Storage issue
Database may use a lot of space.
Too many requests
If many users use it at same time, server may slow down.


4. Solutions
Indexing
We can add index on user_id so search becomes faster.
Delete old data
We can remove notifications older than 30 days.
Better server
We can upgrade server if needed.


5. SQL Queries for API
5.1 Get all notifications
SELECT * FROM notifications
WHERE user_id = 'user-123'
ORDER BY created_at DESC;

5.2 Get unread count
SELECT COUNT(*) FROM notifications
WHERE user_id = 'user-123' AND is_read = FALSE;

5.3 Mark as read
UPDATE notifications
SET is_read = TRUE
WHERE id IN ('notif-1', 'notif-2')
AND user_id = 'user-123';

5.4 Mark all as read
UPDATE notifications
SET is_read = TRUE
WHERE user_id = 'user-123';

5.5 Delete notification
DELETE FROM notifications
WHERE id = 'notif-123'
AND user_id = 'user-123';