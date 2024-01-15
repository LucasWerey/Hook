use mongodb::bson::oid::ObjectId;
use serde::{Serialize, Deserialize};
use mongodb::bson::DateTime as BsonDateTime;



#[derive(Debug, Serialize, Deserialize)]
pub struct Students {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub user_id: Option<ObjectId>,
    pub duree: String,
    pub niveau: String,
    pub type_contrat: String,
    pub date_debut: BsonDateTime,
    pub lieu: String,
    pub recherche: bool,
}


