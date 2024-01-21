use mongodb::bson::{oid::ObjectId};
use mongodb::bson::{Bson};
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Offers {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub id_company: ObjectId,
    pub matching: Bson,
    pub tags: String,
}