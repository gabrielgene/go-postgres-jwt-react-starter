package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rogaha/go-postgres-jwt-react-starter/server/db"
	"github.com/rogaha/go-postgres-jwt-react-starter/server/errors"
)

// CreatePayment Controller
func CreatePayment(c *gin.Context) {
	var payment db.Payment

	c.Bind(&payment)

	var billingAddressID int
	locErr := db.DB.QueryRow(
		db.CreateLocationQuery,
		payment.BillingAddress.Latitude,
		payment.BillingAddress.Longitude,
		payment.BillingAddress.Country,
		payment.BillingAddress.Street1,
	).Scan(&billingAddressID)
	fmt.Println("billing address id =", billingAddressID)

	var paymentID int
	fmt.Println(">>>>>>>>>>>>>", payment.CustomerID)
	cusErr := db.DB.QueryRow(
		db.CreatePaymentsQuery,
		billingAddressID,
		payment.CustomerID,
		payment.MethodType,
		payment.CardBin,
		payment.CardLastFour,
		payment.ExpiryMonth,
		payment.ExpiryYear,
		payment.EWallet,
		payment.NameOnCard,
	).Scan(&paymentID)
	fmt.Println("payment id =", paymentID)

	errors.HandleErr(c, locErr)
	errors.HandleErr(c, cusErr)
	c.JSON(http.StatusOK, gin.H{"paymentID": paymentID})
}
