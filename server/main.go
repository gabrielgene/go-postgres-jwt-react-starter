package main

import (
	_ "database/sql"

	"github.com/gabrielgene/go-postgres-jwt-react-starter/server/db"
	"github.com/gabrielgene/go-postgres-jwt-react-starter/server/router"

	_ "github.com/lib/pq"
)

func init() {
	db.Connect()
}

func main() {
	r := router.SetupRouter()
	// Listen and Serve in 0.0.0.0:8081
	r.Run(":8081")
}
