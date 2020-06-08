package db

import (
	"log"

	"golang.org/x/crypto/bcrypt"
)

// Register struct
type Register struct {
	Name     string `json:"name"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

// Login struct
type Login struct {
	Password string `json:"password"`
	Email    string `json:"email"`
}

//User struct
type User struct {
	Password  string `json:"password"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

//HashPassword hashes user password
func HashPassword(user *Register) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		log.Fatal(err)
	}
	user.Password = string(bytes)
}

//CheckPasswordHash compares hash with password
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

//CreateUsersTable //creates users table
func CreateUsersTable() {
	DB.Query(`
		CREATE TABLE IF NOT EXISTS users( id serial PRIMARY KEY, name VARCHAR (100) NOT NULL, password VARCHAR (355) NOT NULL, email VARCHAR (355) UNIQUE NOT NULL, created_on TIMESTAMP NOT NULL default current_timestamp,updated_at TIMESTAMP NOT NULL default current_timestamp )`,
	)
}
