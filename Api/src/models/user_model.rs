use mongodb::bson::oid::ObjectId;
use serde::{Serialize, Deserialize};
use mongodb::bson::DateTime;

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub password: String,
    pub statut: String,
    pub date: DateTime
}