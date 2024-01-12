use crate::{models::students_model::Students, repository::mongodb_repo::MongoRepo};
use mongodb::{bson::oid::ObjectId, results::InsertOneResult};
use rocket::{http::Status, serde::json::Json, State};
use bcrypt::{hash, DEFAULT_COST};
use bcrypt::verify;
use jsonwebtoken::{encode, EncodingKey, Header, Algorithm};
use std::collections::BTreeMap;
use rocket::serde::Serialize;
use rocket::serde::Deserialize;
use chrono::{Utc, Duration};
use std::env;
use dotenv::dotenv;
use mongodb::bson::DateTime as BsonDateTime;



#[derive(Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
}

#[post("/students", data = "<new_students>")]
pub fn create_students(
    db: &State<MongoRepo>,
    new_students: Json<Students>,
) -> Result<Json<InsertOneResult>, Status> {
    let data = Students {
        id: None,
        duree: new_students.duree,
        niveau: new_students.niveau.to_owned(),
        type_contrat: new_students.type_contrat.to_owned(),
        date_debut: new_students.date_debut.to_owned(),
        lieu: new_students.lieu.to_owned(),
        recherche: new_students.recherche,
        
    };
    let students_detail = db.create_students(data);
    match students_detail {
        Ok(students) => Ok(Json(students)),
        Err(_) => Err(Status::InternalServerError),
    }
}


#[get("/students/<path>")]
pub fn get_students(db: &State<MongoRepo>, path: String) -> Result<Json<Students>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let students_detail = db.get_students(&id);
    match students_detail {
        Ok(students) => Ok(Json(students)),
        Err(_) => Err(Status::InternalServerError),
    }
}
/*
#[put("/user/<path>", data = "<new_user>")]
pub fn update_user(
    db: &State<MongoRepo>,
    path: String,
    new_user: Json<User>,
) -> Result<Json<User>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let data = User {
        id: Some(ObjectId::parse_str(&id).unwrap()),
        firstname: new_user.firstname.to_owned(),
        lastname: new_user.lastname.to_owned(),
        email: new_user.email.to_owned(),
        password: match hash(new_user.password.to_owned(), DEFAULT_COST) {
            Ok(password) => password,
            Err(_) => return Err(Status::InternalServerError),
        },
        statut: new_user.statut.to_owned(),
        date: new_user.date.to_owned(),
    };
    let update_result = db.update_user(&id, data);
    match update_result {
        Ok(update) => {
            if update.matched_count == 1 {
                let updated_user_info = db.get_user(&id);
                return match updated_user_info {
                    Ok(user) => Ok(Json(user)),
                    Err(_) => Err(Status::InternalServerError),
                };
            } else {
                return Err(Status::NotFound);
            }
        }
        Err(_) => Err(Status::InternalServerError),
    }
}

#[delete("/user/<path>")]
pub fn delete_user(db: &State<MongoRepo>, path: String) -> Result<Json<&str>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let result = db.delete_user(&id);
    match result {
        Ok(res) => {
            if res.deleted_count == 1 {
                return Ok(Json("User successfully deleted!"));
            } else {
                return Err(Status::NotFound);
            }
        }
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/users")]
pub fn get_all_users(db: &State<MongoRepo>) -> Result<Json<Vec<User>>, Status> {
    let users = db.get_all_users();
    match users {
        Ok(users) => Ok(Json(users)),
        Err(_) => Err(Status::InternalServerError),
    }
}



#[post("/login", data = "<login_data>")]
pub fn login(
    db: &State<MongoRepo>,
    login_data: Json<LoginData>,
) -> Result<Json<BTreeMap<String, String>>, Status> {
    dotenv().ok();
    let user_detail = db.get_user_by_email(&login_data.email);
    match user_detail {
        Ok(user) => {
            if verify(&login_data.password, &user.password).unwrap_or(false) {
                println!("User connected");

                let claims = Claims {
                    sub: user.email,
                    exp: (Utc::now() + Duration::hours(24)).timestamp() as usize,
                };
                let secret_key = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
                let key = EncodingKey::from_secret(secret_key.as_ref());
                let token = encode(&Header::new(Algorithm::HS512), &claims, &key)
                    .expect("Failed to encode claims");

                let mut map = BTreeMap::new();
                map.insert("token".to_string(), token);

                Ok(Json(map))
            } else {
                println!("User not connected");
                Err(Status::Unauthorized)
            }
        },
        Err(_) => Err(Status::InternalServerError),
    }
}*/