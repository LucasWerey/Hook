# API Endpoints

[![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![Rocket](https://img.shields.io/badge/Rocket-000000?style=for-the-badge&logo=rocket&logoColor=white)](https://rocket.rs/)

All API endpoints are based on the following base URL: <http://127.0.0.1:8000>

## Installation

To set up the project, follow these steps:

### Install Rust

To install Rust, please refer to the official Rust installation guide [here](https://www.rust-lang.org/tools/install).

### Environment Configuration

Create a `.env` file at the root of the project and add the following line, replacing `<YOUR USERNAME HERE>`, `<YOUR PASSWORD HERE>` and `<YOUR CLUSTER DATABASE HERE>` with your MongoDB credentials:

```bash
MONGOURI=mongodb+srv://<YOUR USERNAME HERE>:<YOUR PASSWORD HERE>@<YOUR CLUSTER DATABASE HERE>?retryWrites=true&w=majority
```

## Building and Running the Project

Once you have Rust installed and the project cloned, you can build and run the project using Cargo, Rust's package manager and build system.

Open your terminal and navigate to the project directory. Then, run the following commands:

```bash
# Switch to Rust Nightly
rustup default nightly

# This command will compile the project and create an executable
cargo build

# This command will start the server
cargo run
```

## User Model

The `User` model represents a user in the system. Here's the structure of the `User` model:

```rust
pub struct User {
    pub id: Option<ObjectId>,  // The unique ID of the user. This is optional because MongoDB will automatically assign an ID when a user is created.
    pub firstname: String,     // The user's first name.
    pub lastname: String,      // The user's last name.
    pub email: String,         // The user's email address.
    pub password: String,      // The user's password. In a real system, this would be hashed and salted for security.
    pub statut: String,        // The user's status.
    pub date: DateTime<Utc>,   // The date and time when the user was created. Should be number long
}
```

## User Endpoints

### Create User - `POST /user`

Creates a new user. The request body should be a JSON object with the following structure:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "user@example.com",
    "password": "password",
    "statut": "Status"

}' http://127.0.0.1:8000/user
```

curl -X POST -H "Content-Type: application/json" -d '{
"duree":5,
"niveau": "BAC+5",
"type_contrat": "alternance",
"date_debut": {
"$date": {"$numberLong": "1644566400000"}
},
"lieu": "Paris",
"recherche": true

}' http://127.0.0.1:8000/student

curl -X POST -H "Content-Type: application/json" -d '{
"n_siret": "123 456 789 12345",
"nom_entreprise": "Bouygues",
"adresse": "3 cite Falguiere",
"code_postal": 75016,
"ville": "Paris",
"pays": "France",
"statut_juridique": "SCI",
"nb_emp": 15,
"emp": "65a6971af045e1d0c14cdc9f",
"admin": "65a6971af045e1d0c14cdc9f"

}' http://127.0.0.1:8000/companie

### Get All Users - `GET /users`

Returns a list of all users in the system. No request body is required for this endpoint.

Example:

```bash
curl -X GET http://127.0.0.1:8000/users
```

### Get User - `GET /user/<id>`

Returns the details of a specific user. Replace `<id>` with the ID of the user you want to retrieve. No request body is required for this endpoint.

Example:

```bash
curl -X GET http://127.0.0.1:8000/user/<id>
```

### Update User - `PUT /user/<id>`

Updates the details of a specific user. Replace `<id>` with the ID of the user you want to update. The request body should be a JSON object with the fields to update.

Example:

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
    "firstname": "Updated First Name",
    "lastname": "Updated Last Name",
    "email": "updated_user@example.com",
    "password": "updated_password",
    "statut": "Updated Status"
}' http://127.0.0.1:8000/user/<id>
```

curl -X PUT -H "Content-Type: application/json" -d '{
"duree":"4",
"niveau": "BAC+4",
"type_contrat": "stage",
"date_debut": {
"$date": {
            "$numberLong": "1704712581950"
}
},
"lieu": "Paris",
"recherche": false

}' http://127.0.0.1:8000/student/65a17960c47012ed8f140bfe

curl -X PUT -H "Content-Type: application/json" -d '{
"n_siret": "123 456 789 12345",
"nom_entreprise": "Adaltas",
"adresse": "3 cite Falguiere",
"code_postal": 75016,
"ville": "Paris",
"pays": "France",
"statut_juridique": "SCI",
"nb_emp": 15,
"emp": "65a6971af045e1d0c14cdc9f",
"admin": "65a6971af045e1d0c14cdc9f"
}' http://127.0.0.1:8000/companie/65a7e00faed2ab6c22c958d1

### Delete User - `DELETE /user/<id>`

Deletes a specific user. Replace `<id>` with the ID of the user you want to delete. No request body is required for this endpoint.

Example:

```bash
curl -X DELETE http://127.0.0.1:8000/user/<id>
```

### Login - `POST /login`

Logs in a user. The request body should be a JSON object with the following properties:

- `email`: The user's email.
- `password`: The user's password.

Example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password"}' http://127.0.0.1:8000/login
```

In this command, replace `test@example.com` and `password` with the actual email and password you want to test. If the login is successful, the server will print "User connected" to the console.

## Docker Deployment

To deploy the API using docker follow these steps :

```bash
docker build -t pfe-api . #This command builds a Docker image from the Dockerfile and tags it with the name pfe-api.
docker run -p 8000:8000 pfe-api #This command starts a new Docker container from the pfe-api image and maps the container's port 8000 to port 8000 on your host machine.
```

⚠️ Docker's image won't build. Waiting for an upgrade on Docker and MongoDb dependencies
