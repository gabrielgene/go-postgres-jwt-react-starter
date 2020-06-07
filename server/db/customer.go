package db

import "time"

// Customer struct
type Customer struct {
	ID               int `json:"customerID"`
	Location         Location
	RegistrationTime time.Time `json:"registration_time"`
	Email            string    `json:"email"`
	Name             string    `json:"name"`
	Telephone        string    `json:"telephone"`
	LocationID       int       `json:"location_id"`
}

//CreateCustomersTable //creates customers table
func CreateCustomersTable() {
	DB.Query(`
		CREATE TABLE IF NOT EXISTS 
		customers( 
			id serial PRIMARY KEY,
			location_id INTEGER REFERENCES locations(id),
			registration_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
			email VARCHAR(100), 
			name VARCHAR(100), 
			telephone VARCHAR(100) 
		)`,
	)
}
