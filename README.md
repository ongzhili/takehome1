Instructions to run:

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

Accessing the application locally:

| Endpoint | Body | Params | Description
| :--- | :--- | :--- | :--- |
| `POST app/v1/addContact` | { `email`, `phone`, `name` } | NIL | Adds the contact to the contact book |
| `GET app/v1/getContact` | NIL | `email`: `string` | Gets the contact, given the e-mail |
| `DELETE app/v1/deleteContact` | NIL | `email`: `string` | Deletes the given e-mail|
| `GET app/v1/health` | NIL | NIL | Endpoint to check if API is alive |
