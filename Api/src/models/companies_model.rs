use mongodb::bson::oid::ObjectId;
use serde::{Serialize, Deserialize};
use mongodb::bson::DateTime as BsonDateTime;

#[derive(Debug, Serialize, Deserialize)]
pub struct Companies {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub n_siret: String,
    pub nom_entreprise: String,
    pub adresse: String,
    pub code_postal: i32,
    pub ville: String,
    pub pays: String,
    pub statut_juridique: String,
    pub nb_emp: i32,
    pub emp: ObjectId,
    pub admin: ObjectId, 
    pub offre: ObjectId, 
}