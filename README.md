# Polling System API

A Node.js API for creating and managing polls with options and votes.

Hoisted Link: https://issue-tracker-sf0i.onrender.com/

## Features

- Create a question
- Add options to a question
- Add a vote to an option of a question
- Delete a question (optional: Can't be deleted if one of its options has votes)
- Delete an option (optional: Can't be deleted if it has even one vote given to it)
- View a question with its options and all the votes given to it

## Tech Stack

- Node.js
- Express
- MongoDB

## How to Setup the Project on Local System

1. Clone the repository:
   git clone https://github.com/vipul0005/PollingSystemAPI.git
   cd PollingSystemAPI

2. Install dependencies:
   npm install

3. Set up your MongoDB database and update the database configuration in
   ./database/config.js

4. Run the application:
   node index.js

## API Endpoints

### Create a question:

- POST /questions/create
  Request Body: { "title": "Your Question Title" }

### Add options to a question:

- POST /questions/:id/options/create
  Request Body: { "text": "Option Text", "votes": 0 }

### Add a vote to an option:

- PUT /options/:id/add_vote

### Delete a question:

-DELETE /questions/:id/delete

### Delete an option:

- DELETE /options/:id/delete

### View a question with its options:

-GET /questions/:id

## Folder Structure

```
PollingSystemAPI
│
├── database/
│   ├── config.js
│   ├── option.js
│   └── question.js
│
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

## Dependencies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: MongoDB object modeling for Node.js.

## Contributing

Contributions are welcome! Please follow the Contribution Guidelines.
