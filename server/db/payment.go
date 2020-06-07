package db

import (
	"time"
)

// Payment struct
type Payment struct {
	ID               int `json:"id"`
	LocationID       int `json:"location_id"`
	BillingAddress   Location
	CustomerID       int       `json:"customerId"`
	RegistrationTime time.Time `json:"registration_time"`
	MethodType       string    `json:"methodType"`
	CardBin          string    `json:"cardBin"`
	CardLastFour     string    `json:"cardLastFour"`
	ExpiryMonth      int       `json:"expiryMonth"`
	ExpiryYear       int       `json:"expiryYear"`
	EWallet          string    `json:"eWallet"`
	NameOnCard       string    `json:"nameOnCard"`
}

//CreatePaymentsTable //creates payments table
func CreatePaymentsTable() {
	DB.Query(`
		CREATE TABLE IF NOT EXISTS 
		payments( 
			id serial PRIMARY KEY,
			location_id INTEGER REFERENCES locations(id),
			customer_id INTEGER REFERENCES customers(id),
			registration_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
			method_type VARCHAR(100), 
			card_bin VARCHAR(100), 
			card_last_four VARCHAR(100), 
			expiry_month VARCHAR(100), 
			expiry_year VARCHAR(100), 
			e_wallet VARCHAR(100), 
			name_on_card VARCHAR(100)
		)`,
	)
}
