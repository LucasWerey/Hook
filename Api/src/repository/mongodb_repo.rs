use std::env;
extern crate dotenv;
use dotenv::dotenv;

use mongodb::{
    bson::{extjson::de::Error, oid::ObjectId, doc},
    results::{ InsertOneResult, UpdateResult, DeleteResult},
    sync::{Client, Collection},
};
use crate::models::user_model::User;
use crate::models::students_model::Students;
use crate::models::companies_model::Companies;

pub struct MongoRepo {
    col: Collection<User>,
    col2: Collection<Students>,
    col3: Collection<Companies>
}


    impl MongoRepo {
        pub fn init() -> Self {
            dotenv().ok();
            let uri = match env::var("MONGOURI") {
                Ok(v) => v.to_string(),
                Err(_) => format!("Error loading env variable"),
            };
            let client = Client::with_uri_str(uri).unwrap();
            let db = client.database("Pfe");
            let col: Collection<User> = db.collection("users");
            let col2: Collection<Students>=db.collection("students");
            let col3: Collection<Companies>=db.collection("companies");
            MongoRepo { col, col2, col3 }
        }

        pub fn create_user(&self, new_user: User) -> Result<InsertOneResult, Error> {
            let new_doc = User {
                id: None,
                firstname: new_user.firstname,
                lastname: new_user.lastname,
                email: new_user.email,
                password: new_user.password,
                statut: new_user.statut,
                date: new_user.date
            };
            let user = self
                .col
                .insert_one(new_doc, None)
                .ok()
                .expect("Error creating user");
            Ok(user)
        }

        pub fn get_user(&self, id: &String) -> Result<User, Error> {
            let obj_id = ObjectId::parse_str(id).unwrap();
            let filter = doc! {"_id": obj_id};
            let user_detail = self
                .col
                .find_one(filter, None)
                .ok()
                .expect("Error getting user's detail");
            Ok(user_detail.unwrap())
        }

        pub fn update_user(&self, id: &String, new_user: User) -> Result<UpdateResult, Error> {
            let obj_id = ObjectId::parse_str(id).unwrap();
            let filter = doc! {"_id": obj_id};
            let new_doc = doc! {
                "$set":
                    {
                        "id": new_user.id,
                        "firstname": new_user.firstname,
                        "lastname": new_user.lastname,
                        "email": new_user.email,
                        "password": new_user.password,
                        "statut": new_user.statut,
                        "date": new_user.date
                    },
            };
            let updated_doc = self
                .col
                .update_one(filter, new_doc, None)
                .ok()
                .expect("Error updating user");
            Ok(updated_doc)
        }

        pub fn delete_user(&self, id: &String) -> Result<DeleteResult, Error> {
            let obj_id = ObjectId::parse_str(id).unwrap();
            let filter = doc! {"_id": obj_id};
            let user_detail = self
                .col
                .delete_one(filter, None)
                .ok()
                .expect("Error deleting user");
            Ok(user_detail)
        }

        pub fn get_all_users(&self) -> Result<Vec<User>, Error> {
            let cursors = self
                .col
                .find(None, None)
                .ok()
                .expect("Error getting list of users");
            let users = cursors.map(|doc| doc.unwrap()).collect();
            Ok(users)
        }

        pub fn get_user_by_email(&self, email: &String) -> Result<User, Error> {
            let filter = doc! {"email": email};
            let user_detail = self
                .col
                .find_one(filter, None)
                .ok()
                .expect("Error getting user's detail");
            Ok(user_detail.unwrap())
        }

        pub fn create_students(&self, new_students: Students) -> Result<InsertOneResult, Error> {
            let new_doc = Students {
                user_id: new_students.user_id,
                duree: new_students.duree,
                niveau: new_students.niveau,
                type_contrat: new_students.type_contrat,
                date_debut: new_students.date_debut,
                lieu: new_students.lieu,
                recherche: new_students.recherche

            };
            let students = self
                .col2
                .insert_one(new_doc, None)
                .ok()
                .expect("Error creating students");
            Ok(students)
        }

        pub fn get_students(&self, id: &String) -> Result<Students, Error> {
            let obj_id = ObjectId::parse_str(id).unwrap();
            let filter = doc! {"_id": obj_id};
            let students_detail = self
                .col2
                .find_one(filter, None)
                .ok()
                .expect("Error getting students detail");
            Ok(students_detail.unwrap())
        }

        pub fn update_students(&self, id: &String, new_students: Students) -> Result<UpdateResult, Error> {
            let obj_id = ObjectId::parse_str(id).unwrap();
            let filter = doc! {"_id": obj_id};
            let new_doc = doc! {
                "$set":
                    {
                        "duree": new_students.duree,
                        "niveau": new_students.niveau,
                        "type_contrat": new_students.type_contrat,
                        "date_debut": new_students.date_debut,
                        "lieu": new_students.lieu,
                        "recherche": new_students.recherche
                    },
            };
            let updated_doc = self
                .col2
                .update_one(filter, new_doc, None)
                .ok()
                .expect("Error updating students");
            Ok(updated_doc)
        }

        pub fn delete_students(&self, id: &String) -> Result<DeleteResult, Error> {
            let obj_id = ObjectId::parse_str(id).unwrap();
            let filter = doc! {"_id": obj_id};
            let students_detail = self
                .col2
                .delete_one(filter, None)
                .ok()
                .expect("Error deleting students");
            Ok(students_detail)
        }

        pub fn get_all_students(&self) -> Result<Vec<Students>, Error> {
            let cursors = self
                .col2
                .find(None, None)
                .ok()
                .expect("Error getting list of students");
            let students = cursors.map(|doc| doc.unwrap()).collect();
            Ok(students)
        }

        pub fn create_companies(&self, new_companies: Companies) -> Result<InsertOneResult, Error> {
            let new_doc = Companies {
                id: None,
                n_siret: new_companies.n_siret,
                name_company: new_companies.name_company,
                adress: new_companies.adress,
                postal_code: new_companies.postal_code,
                city: new_companies.city,
                country: new_companies.country,
                legal_status: new_companies.legal_status,
                nb_emp: new_companies.nb_emp,
                emp: new_companies.emp,
                admin: new_companies.admin,
              /*  offre: new_companies.offre */         
            };
            let companies = self
                .col3
                .insert_one(new_doc, None)
                .ok()
                .expect("Error creating companies");
            Ok(companies)
        }

        pub fn get_companies(&self, id: &String) -> Result<Companies, Error> {
            let obj_id = ObjectId::parse_str(id).unwrap();
            let filter = doc! {"_id": obj_id};
            let companies_detail = self
                .col3
                .find_one(filter, None)
                .ok()
                .expect("Error getting companies detail");
            Ok(companies_detail.unwrap())
        }

        pub fn update_companies(&self, id: &String, new_companies: Companies) -> Result<UpdateResult, Error> {
            let obj_id = ObjectId::parse_str(id).unwrap();
            let filter = doc! {"_id": obj_id};
            let new_doc = doc! {
                "$set":
                    {
                    "id": new_companies.id,
                    "n_siret": new_companies.n_siret,
                    "name_company": new_companies.name_company,
                    "adress": new_companies.adress,
                    "postal_code": new_companies.postal_code,
                    "city": new_companies.city,
                    "country": new_companies.country,
                    "legal_status": new_companies.legal_status,
                    "nb_emp": new_companies.nb_emp,
                     "emp": new_companies.emp,
                    "admin": new_companies.admin,
                      /*  "offre": new_companies.offre*/
                    },
            };
            let updated_doc = self
                .col3
                .update_one(filter, new_doc, None)
                .ok()
                .expect("Error updating companies");
            Ok(updated_doc)
        }

        pub fn delete_companies(&self, id: &String) -> Result<DeleteResult, Error> {
            let obj_id = ObjectId::parse_str(id).unwrap();
            let filter = doc! {"_id": obj_id};
            let companies_detail = self
                .col3
                .delete_one(filter, None)
                .ok()
                .expect("Error deleting companies");
            Ok(companies_detail)
        }

        pub fn get_all_companies(&self) -> Result<Vec<Companies>, Error> {
            let cursors = self
                .col3
                .find(None, None)
                .ok()
                .expect("Error getting list of companies");
            let companies = cursors.map(|doc| doc.unwrap()).collect();
            Ok(companies)
        }

    }