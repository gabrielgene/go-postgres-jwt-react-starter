package db

const (
	CheckUserExists = `SELECT id from users WHERE email = $1`
	LoginQuery      = `SELECT * from users WHERE email = $1`
	CreateUserQuery = `INSERT INTO users(id,name,password,email) VALUES (DEFAULT, $1 , $2, $3);`

	CreateLocationQuery = `INSERT INTO locations(id,latitude, longitude, country, street1) VALUES (DEFAULT, $1 , $2, $3, $4) RETURNING id;`
	CreateCustomerQuery = `INSERT INTO customers(id,location_id, email, name, telephone) VALUES (DEFAULT, $1 , $2, $3, $4) RETURNING id;`
	CreatePaymentsQuery = `INSERT INTO payments(id,location_id, customer_id, method_type, card_bin, card_last_four, expiry_month, expiry_year, e_wallet, name_on_card) VALUES (DEFAULT, $1 , $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`

	CheckCustomerExistsByID = `SELECT id FROM customers WHERE id = $1`
	GetLocationsQuery       = `SELECT * from locations`
)
