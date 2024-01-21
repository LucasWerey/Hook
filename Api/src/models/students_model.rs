use mongodb::bson::oid::ObjectId;
use mongodb::bson::{Bson};
use serde::{Serialize, Deserialize};
use mongodb::bson::DateTime as BsonDateTime;

#[derive(Debug, Serialize, Deserialize)]
pub struct Students {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub user_id: Option<ObjectId>,
    pub duration: String,
    pub level: String,
    pub contract_type: String,
    pub start_date: BsonDateTime,
    pub location: String,
    pub research: bool,
    pub profile: Bson,
}


