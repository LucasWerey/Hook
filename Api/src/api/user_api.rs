use crate::{models::user_model::User,models::user_model::LoginData, models::user_model::Claims, models::students_model::Students, repository::mongodb_repo::MongoRepo};
use mongodb::{bson::oid::ObjectId, results::InsertOneResult};
use mongodb::bson::{Bson};
use rocket::{http::Status, serde::json::Json, State};
use bcrypt::{hash, DEFAULT_COST};
use bcrypt::verify;
use jsonwebtoken::{encode, EncodingKey, Header, Algorithm, DecodingKey, Validation, decode, errors::ErrorKind::ExpiredSignature};
use std::collections::BTreeMap;
use chrono::{Utc, Duration};
use std::env;
use dotenv::dotenv;
use mongodb::bson::DateTime as BsonDateTime;


#[post("/user", data = "<new_user>")]
pub fn create_user(
    db: &State<MongoRepo>,
    new_user: Json<User>,
) -> Result<Json<InsertOneResult>, Status> {
    let data = User {
        id: None,
        firstname: new_user.firstname.to_owned(),
        lastname: new_user.lastname.to_owned(),
        email: new_user.email.to_owned(),
        password: match hash(new_user.password.to_owned(), DEFAULT_COST) {
            Ok(password) => password,
            Err(_) => return Err(Status::InternalServerError),
        },
        statut: new_user.statut.to_owned(),
        date: Some(BsonDateTime::from_millis(Utc::now().timestamp_millis())),
        phone: new_user.phone.to_owned(),
        address: new_user.address.to_owned()
    };
    let user_clone = data.clone();
    let user_detail = db.create_user(user_clone);
    match user_detail {
        Ok(user) =>{
            if data.statut == "student" {
                let student_data = Students {
                    user_id: Some(user.inserted_id.as_object_id().unwrap().clone()),
                    duration: String::new(),
                    level: String::new(),
                    contract_type: String::new(),
                    start_date: BsonDateTime::now(),
                    location: String::new(),
                    research: false,
                    profile: Bson::Null
                };

                let _ = db.create_students(student_data);
            }
        Ok(Json(user))
        },
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/user/<path>")]
pub fn get_user(db: &State<MongoRepo>, path: String) -> Result<Json<User>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let user_detail = db.get_user(&id);
    match user_detail {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::InternalServerError),
    }
}

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
        phone: new_user.phone.to_owned(),
        address: new_user.address.to_owned()
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
                    exp: (Utc::now() + Duration::hours(10)).timestamp() as usize,
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
        Err(e) => {
            println!("Error: {:?}", e);
            Err(Status::InternalServerError)
        },
    }
}

#[get("/user/email/<token>")]
pub fn get_email_from_token(token: String) -> Result<Json<String>, Status> {
    dotenv().ok();
    let secret_key = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let key = DecodingKey::from_secret(secret_key.as_ref());
    let validation = Validation::new(Algorithm::HS512);
    match decode::<Claims>(&token, &key, &validation) {
        Ok(c) => Ok(Json(c.claims.sub)),
        Err(err) => match *err.kind() {
            ExpiredSignature => Err(Status::Unauthorized),
            _ => Err(Status::InternalServerError),
        },
    }
}

#[get("/user/info/<token>")]
pub fn get_user_info_from_token(db: &State<MongoRepo>, token: String) -> Result<Json<User>, Status> {
    dotenv().ok();
    let secret_key = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let key = DecodingKey::from_secret(secret_key.as_ref());
    let validation = Validation::new(Algorithm::HS512);
    match decode::<Claims>(&token, &key, &validation) {
        Ok(c) => {
            let user_detail = db.get_user_by_email(&c.claims.sub);
            match user_detail {
                Ok(user) => Ok(Json(user)),
                Err(_) => Err(Status::InternalServerError),
            }
        },
        Err(err) => match *err.kind() {
            ExpiredSignature => Err(Status::Unauthorized),
            _ => Err(Status::InternalServerError),
        },
    }
}
