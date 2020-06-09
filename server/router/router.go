package router

import (
	"github.com/gabrielgene/go-postgres-jwt-react-starter/server/controller"
	"github.com/gabrielgene/go-postgres-jwt-react-starter/server/middlewares"

	"github.com/gin-gonic/gin"
)

// SetupRouter setup routing here
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Middlewares
	router.Use(middlewares.ErrorHandler)
	router.Use(middlewares.CORSMiddleware())
	router.Use(middlewares.AuthMiddleware())

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
	router.GET("/paymentmethods", controller.GetAllPayments)
	router.GET("/paymentmethods/:id", controller.GetPaymentByID)
	router.POST("/paymentmethods", controller.CreatePayment)

	return router
}
