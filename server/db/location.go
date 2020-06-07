package db

// Location struct
type Location struct {
	ID        int     `json:"id"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Country   string  `json:"country"`
	Street1   string  `json:"street1"`
}

//CreateLocationsTable //creates locations table
func CreateLocationsTable() {
	DB.Query(`
		CREATE TABLE IF NOT EXISTS 
		locations( 
			id serial PRIMARY KEY, 
			latitude DOUBLE PRECISION, 
			longitude DOUBLE PRECISION, 
			country VARCHAR(100), 
			street1 VARCHAR(355)
		)`,
	)
}
