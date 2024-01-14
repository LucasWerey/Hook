use crate::{models::students_model::Students,  repository::mongodb_repo::MongoRepo};
use mongodb::{bson::oid::ObjectId, results::InsertOneResult};
use rocket::{http::Status, serde::json::Json, State};


#[post("/student", data = "<new_students>")]
pub fn create_students(
    db: &State<MongoRepo>,
    new_students: Json<Students>,
) -> Result<Json<InsertOneResult>, Status> {
    let data = Students {
        user_id: new_students.user_id,
        duree: new_students.duree,
        niveau: new_students.niveau.to_owned(),
        type_contrat: new_students.type_contrat.to_owned(),
        date_debut: new_students.date_debut,
        lieu: new_students.lieu.to_owned(),
        recherche: new_students.recherche,

    };
    let students_detail = db.create_students(data);
    match students_detail {
        Ok(students) => Ok(Json(students)),
        Err(_) => Err(Status::InternalServerError),
    }
}


#[get("/student/<path>")]
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

#[put("/student/<path>", data = "<new_students>")]
pub fn update_students(
    db: &State<MongoRepo>,
    path: String,
    new_students: Json<Students>,
) -> Result<Json<Students>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let data = Students {
        user_id: Some(ObjectId::parse_str(&id).unwrap()),
        duree: new_students.duree,
        niveau: new_students.niveau.to_owned(),
        type_contrat: new_students.type_contrat.to_owned(),
        date_debut: new_students.date_debut,
        lieu: new_students.lieu.to_owned(),
        recherche: new_students.recherche,
    };
    let update_result = db.update_students(&id, data);
    match update_result {
        Ok(update) => {
            if update.matched_count == 1 {
                let updated_students_info = db.get_students(&id);
                return match updated_students_info {
                    Ok(students) => Ok(Json(students)),
                    Err(_) => Err(Status::InternalServerError),
                };
            } else {
                return Err(Status::NotFound);
            }
        }
        Err(_) => Err(Status::InternalServerError),
    }
}

#[delete("/student/<path>")]
pub fn delete_students(db: &State<MongoRepo>, path: String) -> Result<Json<&str>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let result = db.delete_students(&id);
    match result {
        Ok(res) => {
            if res.deleted_count == 1 {
                return Ok(Json("Students successfully deleted!"));
            } else {
                return Err(Status::NotFound);
            }
        }
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/students")]
pub fn get_all_students(db: &State<MongoRepo>) -> Result<Json<Vec<Students>>, Status> {
    let students = db.get_all_students();
    match students {
        Ok(students) => Ok(Json(students)),
        Err(_) => Err(Status::InternalServerError),
    }
}