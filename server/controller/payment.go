package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rogaha/go-postgres-jwt-react-starter/server/db"
	"github.com/rogaha/go-postgres-jwt-react-starter/server/errors"
)

// GetAllPayments Controller
func GetAllPayments(c *gin.Context) {
	payments := []db.Payment{}

	rows, err := db.DB.Query("SELECT *  FROM payments")
	for rows.Next() {
		var payment db.Payment
		if err := rows.Scan(
			&payment.ID,
			&payment.LocationID,
			&payment.CustomerID,
			&payment.RegistrationTime,
			&payment.MethodType,
			&payment.CardBin,
			&payment.CardLastFour,
			&payment.ExpiryMonth,
			&payment.ExpiryYear,
			&payment.EWallet,
			&payment.NameOnCard,
		); err != nil {
			errors.HandleErr(c, err)
		}
		var location db.Location
		var err error
		location, err = getLocationByID(payment.LocationID)

		payment.BillingAddress = location
		errors.HandleErr(c, err)
		payments = append(payments, payment)
	}

	errors.HandleErr(c, err)
	c.JSON(http.StatusOK, gin.H{"payments": payments})
}

// GetPaymentByID Controller
func GetPaymentByID(c *gin.Context) {
	id := c.Param("id")
	idConverted, err := strconv.Atoi(id)
	errors.HandleErr(c, err)

	paymentRow := db.DB.QueryRow("SELECT * FROM payments WHERE id = $1", idConverted)
	var payment db.Payment
	paymentErr := paymentRow.Scan(
		&payment.ID,
		&payment.LocationID,
		&payment.CustomerID,
		&payment.RegistrationTime,
		&payment.MethodType,
		&payment.CardBin,
		&payment.CardLastFour,
		&payment.ExpiryMonth,
		&payment.ExpiryYear,
		&payment.EWallet,
		&payment.NameOnCard,
	)

	var location db.Location
	var locationErr error
	location, locationErr = getLocationByID(payment.LocationID)

	payment.BillingAddress = location

	errors.HandleErr(c, paymentErr)
	errors.HandleErr(c, locationErr)
	c.JSON(http.StatusOK, gin.H{"payment": payment})
}

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
