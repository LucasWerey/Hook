use mongodb::bson::{oid::ObjectId, Bson};
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Companies {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub n_siret: String,
    pub name_company: String,
    pub adress: String,
    pub postal_code: i32,
    pub city: String,
    pub country: String,
    pub legal_status: String,
    pub nb_emp: String,
    pub emp: Bson,
    pub admin: ObjectId,
    pub offers: Bson,
}
