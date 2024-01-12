mod api;
mod models;
mod repository;

#[macro_use]
extern crate rocket;
use rocket::http::Method;
use rocket_cors::{AllowedHeaders, AllowedOrigins, CorsOptions};

use api::user_api::{create_user, get_user, update_user, delete_user, get_all_users, login};
use api::students_api::{create_students, get_students};
use repository::mongodb_repo::MongoRepo;

#[launch]
fn rocket() -> _ {
    let db = MongoRepo::init();

    let allowed_origins = AllowedOrigins::some_exact(&["http://localhost:5173", "http://127.0.0.1:8000"]);
    let cors = CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post, Method::Put, Method::Delete].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::some(&["Authorization", "Accept", "Content-Type"]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .unwrap();

    rocket::build()
        .attach(cors)
        .manage(db)
        .mount("/", routes![create_user, get_user, update_user, delete_user, get_all_users, login,create_students, get_students ])
}