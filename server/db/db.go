package db

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gabrielgene/go-postgres-jwt-react-starter/server/config"
)

//DB instance
var DB *sql.DB

//Connect to db
func Connect() {
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable host=%s", config.DB_USER, config.DB_PASSWORD, config.DB_NAME, config.HOST_NAME)

	db, _ := sql.Open("postgres", dbinfo)
	err := db.Ping()
	if err != nil {
		log.Println(err)
		log.Fatal("Error: Could not establish a connection with the database")
	}
	DB = db
	// Create tables if it doesnt exist
	CreateUsersTable()
	CreateLocationsTable()
	CreateCustomersTable()
	CreatePaymentsTable()
}
