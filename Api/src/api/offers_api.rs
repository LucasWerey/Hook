use crate::{models::offers_model::Offers,  repository::mongodb_repo::MongoRepo};
use mongodb::{bson::oid::ObjectId, results::InsertOneResult};
use rocket::{http::Status, serde::json::Json, State};


#[post("/offer", data = "<new_offers>")]
pub fn create_offers(
    db: &State<MongoRepo>,
    new_offers: Json<Offers>,
) -> Result<Json<InsertOneResult>, Status> {
    let data = Offers {
        id: None,
        id_company: new_offers.id_company,
        id_recruiter: new_offers.id_recruiter,
        details: new_offers.details.clone(),
        matchs: new_offers.matchs.clone()
    };
    let offers_detail = db.create_offers(data);
    match offers_detail {
        Ok(offers) => Ok(Json(offers)),
        Err(_) => Err(Status::InternalServerError),
    }
}


#[get("/offer/<path>")]
pub fn get_offers(db: &State<MongoRepo>, path: String) -> Result<Json<Offers>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let offers_detail = db.get_offers(&id);
    match offers_detail {
        Ok(offers) => Ok(Json(offers)),
        Err(_) => Err(Status::InternalServerError),
    }
}

#[put("/offer/<path>", data = "<new_offers>")]
pub fn update_offers(
    db: &State<MongoRepo>,
    path: String,
    new_offers: Json<Offers>,
) -> Result<Json<Offers>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let data = Offers {
        id: Some(ObjectId::parse_str(&id).unwrap()),
        id_company: new_offers.id_company,
        id_recruiter: new_offers.id_recruiter,
        details: new_offers.details.clone(),
        matchs: new_offers.matchs.clone()
    };
    let update_result = db.update_offers(&id, data);
    match update_result {
        Ok(update) => {
            if update.matched_count == 1 {
                let updated_offers_info = db.get_offers(&id);
                return match updated_offers_info {
                    Ok(offers) => Ok(Json(offers)),
                    Err(_) => Err(Status::InternalServerError),
                };
            } else {
                return Err(Status::NotFound);
            }
        }
        Err(_) => Err(Status::InternalServerError),
    }
}

#[delete("/offer/<path>")]
pub fn delete_offers(db: &State<MongoRepo>, path: String) -> Result<Json<&str>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let result = db.delete_offers(&id);
    match result {
        Ok(res) => {
            if res.deleted_count == 1 {
                return Ok(Json("Offers successfully deleted!"));
            } else {
                return Err(Status::NotFound);
            }
        }
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/offers")]
pub fn get_all_offers(db: &State<MongoRepo>) -> Result<Json<Vec<Offers>>, Status> {
    let offers = db.get_all_offers();
    match offers {
        Ok(offers) => Ok(Json(offers)),
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/offers/company/<path>")]
pub fn get_offers_by_company(db: &State<MongoRepo>, path: String) -> Result<Json<Vec<Offers>>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let offers = db.get_offers_by_company(&id);
    match offers {
        Ok(offers) => Ok(Json(offers)),
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/offers/recruiter/<path>")]
pub fn get_offers_by_recruiter(db: &State<MongoRepo>, path: String) -> Result<Json<Vec<Offers>>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let offers = db.get_offers_by_recruiter(&id);
    match offers {
        Ok(offers) => Ok(Json(offers)),
        Err(_) => Err(Status::InternalServerError),
    }
}

