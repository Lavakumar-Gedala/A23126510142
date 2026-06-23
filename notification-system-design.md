Stage 1

I tried to design the notification system API.

I think the notification system needs to do these things:
1. Get the list of notifications: Show a list of messages. Maybe filter them by read or unread.
2. Count unread ones: Show a number badge for new notifications.
3. Mark as read: Change a notification status to read.
4. Mark all as read: Clear all of them at once.
5. Delete: Get rid of a notification.

2. The API Endpoints (Base path: `/api/v1`)

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

