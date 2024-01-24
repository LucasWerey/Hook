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

## Student Model

The `Student` model represents a user in the system. Here's the structure of the `Student` model:

```rust
pub struct Students {
    pub user_id: Option<ObjectId>, // The student id linked to user ID
    pub duration: i32,                // The duration of the stage/internship
    pub level: String,            // The graduation level
    pub contract_type: String,      // Type of contract
    pub start_date: BsonDateTime,  // Date of start
    pub location: String,              // Place of stage
    pub research: bool,           // Currently looking for ?
    pub profile: Bson,          //Profile informations
}
```

## Company Model

The `Company` model represents a user in the system. Here's the structure of the `Company` model:

```rust
pub struct Companies {
    pub id: Option<ObjectId>,
    pub n_siret: String,
    pub name_company: String,
    pub adress: String,
    pub postal_code: i32,
    pub city: String,
    pub country: String,
    pub legal_status: String,
    pub nb_emp: i32,
    pub emp: Bson,
    pub admin: ObjectId,
    pub offers: Bson,
}
```

## Offer Model

The `Offer` model represents a user in the system. Here's the structure of the `Offer` model:

```rust
pub struct Offers {
    pub id: Option<ObjectId>,
    pub id_company: ObjectId,
    pub id_recruiter: ObjectId,
    pub matchs: Bson,
    pub details: Bson
}
```

## Endpoints

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

> To create a student statut must be set to "student"

#### Create Companie - `POST /companie`

```bash
curl -X POST -H "Content-Type: application/json" -d '{
"n_siret": "123 456 789 12345",
"name_company": "Bouygues",
"adress": "3 cite Falguiere",
"postal_code": 75016,
"city": "Paris",
"country": "France",
"legal_status": "SCI",
"nb_emp": '>15',
"emp": ["em1", "emp2"],
"admin": "65a6971af045e1d0c14cdc9f",
"offers": ["offer1", "offer2", "offer3"]
}' http://127.0.0.1:8000/companie
```

#### Create Offer - `POST /offer`

```bash
curl -X POST -H "Content-Type: application/json" -d '{
"id_recruiter": "65ad7be1a8d7ccd20daa2661",
"id_company": "65ad7be1a8d7ccd20daa2662",
"details": {
    "position_name": "Développeur Web",
    "contract_type": "stage",
    "salary": "1000-2000",
    "exp_date": {
                "$date": {
                    "$numberLong": "1704712581950"
                }
            },
    "contract_duration": "2 mois",
    "location": "paris",
    "description": "blabla",
    "tasks": "blabla",
    "benefits": "blabla",
    "tags": ["tag1", "tag2"],
    "compatibility_min": "80%"
    },
  "matchs": [
    {
      "student_name": "Lucas",
      "globalMatch": "80%"
    }
  ]
}' http://127.0.0.1:8000/offer
```

### Get all queries

Returns a list of all users in the system. No request body is required for this endpoint.

Examples:

#### Get All Users - `GET /users`

```bash
curl -X GET http://127.0.0.1:8000/users
```

#### Get All Students - `GET /students`

```bash
curl -X GET http://127.0.0.1:8000/students
```

### Get queries

Returns the details of a specific user. Replace `<id>` with the ID of the user you want to retrieve. No request body is required for this endpoint.

Examples:

#### Get User - `GET /user/<id>`

```bash
curl -X GET http://127.0.0.1:8000/user/<id>
```

#### Get Student - `GET /student/<id>`

```bash
curl -X GET http://127.0.0.1:8000/student/<id>
```

### Update queries

Updates the details of a specific user. Replace `<id>` with the ID of the user you want to update. The request body should be a JSON object with the fields to update.

Examples:

#### Update User - `PUT /user/<id>`

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
    "firstname": "Updated First Name",
    "lastname": "Updated Last Name",
    "email": "updated_user@example.com",
    "password": "updated_password",
    "statut": "Updated Status"
}' http://127.0.0.1:8000/user/<id>
```

#### Update Student - `PUT /student/<id>`

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
"duration":"4 mois",
"level": "BAC+4",
"contract_type": "stage",
"start_date": {
"$date": {
            "$numberLong": "1704712581950"
}
},
"location": "Paris",
"research": false,
"profile": {
    "softSkills": ["communication", "teamwork", "problemSolving"],
    "hardSkills": ["Java", "Python", "C++"],
    "experiences": [
        {
            "jobTitle": "Software Developer",
            "company": "XYZ Corp",
            "currentJob": false,
            "startDate": "14 juin 2019",
            "endDate": "12 juillet 2020",
            "location": "Paris",
            "description": "eza"
        },
        {
            "jobTitle": "UX Developer",
            "company": "Google",
            "currentJob": true,
            "startDate": {
                "$date": {
                    "$numberLong": "1704712581950"
                }
            },
            "endDate": {
                "$date": {
                    "$numberLong": "1704712581950"
                }
            },
            "location": "Paris",
            "description": "eza "
        }
    ],
    "formations": [
        {
            "degree": "Bachelors in Computer Science",
            "university": "ABC University",
            "currentFormation": false,
            "startDate": {
                "$date": {
                    "$numberLong": "1704712581950"
                }
            },
            "endDate": {
                "$date": {
                    "$numberLong": "1704712581950"
                }
            },
            "result": "102e/2000",
            "description": "dsq"
        },
        {
            "degree": "Ingé",
            "university": "ECE Paris",
            "currentFormation": false,
            "startDate": {
                "$date": {
                    "$numberLong": "1704712581950"
                }
            },
            "endDate": {
                "$date": {
                    "$numberLong": "1704712581950"
                }
            },
            "result": "102e/2000",
            "description": "dqs"
        }
    ],
    "certifications": [
        {
            "certificationName": "AWS Certified Developer",
            "issuedBy": "Amazon",
            "year": "2020",
            "certifId": "232323"
        },
        {
            "certificationName": "SUUU Certified Developer",
            "issuedBy": "Amazon",
            "year": "2020",
            "certifId": "232323"
        }

    ],
    "keywords": ["html", "css"],
    "jobwatend": {
        "name" : "développeur web",
        "contract_type": "stage",
        "duration": "4 mois",
        "location": "Paris",
        "startDate": {
                "$date": {
                    "$numberLong": "1704712581950"
                }
            },
        "endDate": {
                "$date": {
                    "$numberLong": "1704712581950"
                }
            },
        "research": false,
        "transportDuration": "<15min",
        "transportsUsed": ["Bus", "Avion"]
    }
}
}' http://127.0.0.1:8000/student/65af07ee284739d707b13590
```

#### Update Company - `PUT /companie/<id>`

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
"n_siret": "123 456 789 12345",
"name_company": "Adaltas",
"adress": "3 cite Falguiere",
"postal_code": 75016,
"city": "Paris",
"country": "France",
"legal_status": "SCI",
"nb_emp": 15,
"emp": ["em1", "emp2"],
"admin": "65a6971af045e1d0c14cdc9f",
"offers": ["offer1", "offer2", "offer3"]
}' http://127.0.0.1:8000/companie/65ad31f91370388a775b9b44
```

#### Update Offer - `PUT /offer/<id>`

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
"id_company": "65a6971af045e1d0c14cdc9f",
"matching": {"company":"Bouygues Telecom"},
"tags": "IT project management"
}' http://127.0.0.1:8000/offer/65aaa64351bc57dc19f0a92c
```

### Delete queries

Deletes a specific user. Replace `<id>` with the ID of the user you want to delete. No request body is required for this endpoint.

Examples:

#### Delete User - `DELETE /user/<id>`

```bash
curl -X DELETE http://127.0.0.1:8000/user/<id>
```

#### Delete Student - `DELETE /student/<id>`

```bash
curl -X DELETE http://127.0.0.1:8000/student/<id>
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

### Get Email from Token - `GET /user/email/<token>`

This endpoint returns the email associated with the provided JWT token.

```bash
curl -X GET http://127.0.0.1:8000/user/email/<token>
```

Replace `<token>` with the actual JWT token. If the operation is successful, the server will return the email associated with the token.

### Get User Info from Token - `GET /user/info/<token>`

This endpoint returns the user information associated with the provided JWT token.

```bash
curl -X GET http://127.0.0.1:8000/user/info/<token>
```

Replace `<token>` with the actual JWT token. If the operation is successful, the server will return the user information associated with the token.

## Docker Deployment

To deploy the API using docker follow these steps :

```bash
docker build -t pfe-api . #This command builds a Docker image from the Dockerfile and tags it with the name pfe-api.
docker run -p 8000:8000 pfe-api #This command starts a new Docker container from the pfe-api image and maps the container's port 8000 to port 8000 on your host machine.
```

⚠️ Docker's image won't build. Waiting for an upgrade on Docker and MongoDb dependencies
