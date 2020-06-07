package router

import (
	"github.com/rogaha/go-postgres-jwt-react-starter/server/controller"
	"github.com/rogaha/go-postgres-jwt-react-starter/server/middlewares"

	"github.com/gin-gonic/gin"
)

// SetupRouter setup routing here
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Middlewares
	router.Use(middlewares.ErrorHandler)
	router.Use(middlewares.CORSMiddleware())

	router.GET("/ping", controller.Pong)

	// User
	router.POST("/register", controller.UserCreate)
	router.POST("/login", controller.Login)
	router.GET("/session", controller.Session)

	// Customers
	router.GET("/customers", controller.GetAllCustomers)
	router.GET("/customers/:id", controller.GetCustomerByID)
	router.GET("/customers/:id/paymentmethods", controller.GetPaymentsByCustomerID)
	router.GET("/customers/:id/paymentmethods/count", controller.GetPaymentsCountByCustomerID)
	router.POST("/customers", controller.CreateCustomer)

	// Payments
	router.POST("/paymentmethods", controller.CreatePayment)

	return router
}
