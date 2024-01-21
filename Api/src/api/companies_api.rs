use crate::{models::companies_model::Companies, repository::mongodb_repo::MongoRepo};
use mongodb::{bson::oid::ObjectId, results::InsertOneResult};
use rocket::{http::Status, serde::json::Json, State};


#[post("/companie", data = "<new_companies>")]
pub fn create_companies(
    db: &State<MongoRepo>,
    new_companies: Json<Companies>,
) -> Result<Json<InsertOneResult>, Status> {
    let data = Companies {
        id: None,
        n_siret: new_companies.n_siret.to_owned(),
        name_company: new_companies.name_company.to_owned(),
        adress: new_companies.adress.to_owned(),
        postal_code: new_companies.postal_code,
        city: new_companies.city.to_owned(),
        country: new_companies.country.to_owned(),
        legal_status: new_companies.legal_status.to_owned(),
        nb_emp: new_companies.nb_emp.to_owned(),
        emp: new_companies.emp.clone(),
        admin: new_companies.admin,
        offers: new_companies.offers.clone(),
    };
    let companies_detail = db.create_companies(data);
    match companies_detail {
        Ok(companies) => Ok(Json(companies)),
        Err(_) => Err(Status::InternalServerError),
    }
}


#[get("/companie/<path>")]
pub fn get_companies(db: &State<MongoRepo>, path: String) -> Result<Json<Companies>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let companies_detail = db.get_companies(&id);
    match companies_detail {
        Ok(companies) => Ok(Json(companies)),
        Err(_) => Err(Status::InternalServerError),
    }
}

#[put("/companie/<path>", data = "<new_companies>")]
pub fn update_companies(
    db: &State<MongoRepo>,
    path: String,
    new_companies: Json<Companies>,
) -> Result<Json<Companies>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let data = Companies {
        id: Some(ObjectId::parse_str(&id).unwrap()),
        n_siret: new_companies.n_siret.to_owned(),
        name_company: new_companies.name_company.to_owned(),
        adress: new_companies.adress.to_owned(),
        postal_code: new_companies.postal_code,
        city: new_companies.city.to_owned(),
        country: new_companies.country.to_owned(),
        legal_status: new_companies.legal_status.to_owned(),
        nb_emp: new_companies.nb_emp.to_owned(),
        emp: new_companies.emp.clone(),
        admin: new_companies.admin,
        offers: new_companies.offers.clone(),
    };
    let update_result = db.update_companies(&id, data);
    match update_result {
        Ok(update) => {
            if update.matched_count == 1 {
                let updated_companies_info = db.get_companies(&id);
                return match updated_companies_info {
                    Ok(companies) => Ok(Json(companies)),
                    Err(_) => Err(Status::InternalServerError),
                };
            } else {
                return Err(Status::NotFound);
            }
        }
        Err(_) => Err(Status::InternalServerError),
    }
}

#[delete("/companie/<path>")]
pub fn delete_companies(db: &State<MongoRepo>, path: String) -> Result<Json<&str>, Status> {
    let id = path;
    if id.is_empty() {
        return Err(Status::BadRequest);
    };
    let result = db.delete_companies(&id);
    match result {
        Ok(res) => {
            if res.deleted_count == 1 {
                return Ok(Json("Companies successfully deleted!"));
            } else {
                return Err(Status::NotFound);
            }
        }
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/companies")]
pub fn get_all_companies(db: &State<MongoRepo>) -> Result<Json<Vec<Companies>>, Status> {
    let companies = db.get_all_companies();
    match companies {
        Ok(companies) => Ok(Json(companies)),
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/companie/admin/<admin_id>")]
pub fn get_company_by_admin(db: &State<MongoRepo>, admin_id: String) -> Result<Json<Companies>, Status> {
    let company_detail = db.get_company_by_admin(&admin_id);
    match company_detail {
        Ok(company) => Ok(Json(company)),
        Err(_) => Err(Status::InternalServerError),
    }
}
