use mongodb::bson::oid::ObjectId;
use serde::{Serialize, Deserialize};
use chrono::DateTime;

#[derive(Debug, Serialize, Deserialize)]
pub struct Students {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub duree: i32,
    pub niveau: String,
    pub type_contrat: String,
    pub date_debut: String,
    pub lieu: String,
    pub recherche: bool, 
}


