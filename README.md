# Instructions to run code:

Local:
```
npm install
node server.js
```

via Dockerfile:
```
docker build -t my-node-app:latest .
docker run -d -p 3000:3000 --name node-server my-node-app:latest
```

API Endpoints

| Endpoint | Body | Params | Description
| :--- | :--- | :--- | :--- |
| `POST` `app/v1/addContact` | { `email`: `your_email`, `phone`: `your_phone`, `name`: `your_name` } | NIL | Adds the contact to the contact book |
| `GET` `app/v1/getContact?email=<email>` | NIL | NIL | Gets the contact, identified by e-mail |
| `DELETE` `app/v1/deleteContact?email=<email>` | NIL | NIL | Deletes the given contact, identified by e-mail |
| `GET` `app/v1/health` | NIL | NIL | Endpoint to check if API is alive |


# Run tests

`npm test`
