// Package middlewares contains gin middlewares
// Usage: router.Use(middlewares.Connect)
package middlewares

import (
	"fmt"
	"net/http"

	"github.com/rogaha/go-postgres-jwt-react-starter/server/config"
	"github.com/rogaha/go-postgres-jwt-react-starter/server/controller"

	"github.com/gin-gonic/gin"
)

// ErrorHandler is a middleware to handle errors encountered during requests
func ErrorHandler(c *gin.Context) {
	c.Next()

	if len(c.Errors) > 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"errors": c.Errors,
		})
	}
}

// CORSMiddleware //
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", config.CLIENT_URL)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

// AuthMiddleware //
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("route", c.Request.URL.Path, c.Request.Method)
		if c.Request.URL.Path == "/login" || c.Request.URL.Path == "/register" {
			c.Next()
			return
		}
		var jwtKey = []byte("secret")
		_, isAuthenticated := controller.AuthMiddleware(c, jwtKey)
		if !isAuthenticated {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "msg": "unauthorized"})
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		fmt.Println(">>>>>>>>>>>>>", isAuthenticated)
		c.Next()
		return
	}
}
