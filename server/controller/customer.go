package controller

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rogaha/go-postgres-jwt-react-starter/server/db"
	"github.com/rogaha/go-postgres-jwt-react-starter/server/errors"
)

// CreateCustomer Controller
func CreateCustomer(c *gin.Context) {
	var customer db.Customer
	c.Bind(&customer)
	exists := checkCustomerExists(customer)
	if exists == true {
		UpdateCustomer(c, customer)
	} else {
		var locationID int
		locErr := db.DB.QueryRow(
			db.CreateLocationQuery,
			customer.Location.Latitude,
			customer.Location.Longitude,
			customer.Location.Country,
			customer.Location.Street1,
		).Scan(&locationID)

		var customerID int
		cusErr := db.DB.QueryRow(
			db.CreateCustomerQuery,
			locationID,
			customer.Email,
			customer.Name,
			customer.Telephone,
		).Scan(&customerID)

		errors.HandleErr(c, locErr)
		errors.HandleErr(c, cusErr)
		c.JSON(http.StatusOK, gin.H{"customerID": customerID})
	}
}

// UpdateCustomer Controller
func UpdateCustomer(c *gin.Context, newCustomer db.Customer) {
	var customer db.Customer
	var customerErr error
	customer, customerErr = getCustomerByID(newCustomer.ID)
	errors.HandleErr(c, customerErr)

	_, updateCustomerErr := db.DB.Exec("UPDATE customers SET email=$1, name=$2, telephone=$3 WHERE id=$4", newCustomer.Email, newCustomer.Name, newCustomer.Telephone, newCustomer.ID)

	_, updateLocationErr := db.DB.Exec("UPDATE locations SET latitude=$1, longitude=$2, country=$3, street1=$4 WHERE id=$5", newCustomer.Location.Latitude, newCustomer.Location.Longitude, newCustomer.Location.Country, newCustomer.Location.Street1, customer.LocationID)

	errors.HandleErr(c, updateCustomerErr)
	errors.HandleErr(c, updateLocationErr)
	c.JSON(http.StatusOK, gin.H{"customerID": newCustomer.ID})
}

// GetAllCustomers Controller
func GetAllCustomers(c *gin.Context) {
	customers := []db.Customer{}

	rows, err := db.DB.Query("SELECT *  FROM customers")
	for rows.Next() {
		var customer db.Customer
		if err := rows.Scan(
			&customer.ID,
			&customer.LocationID,
			&customer.RegistrationTime,
			&customer.Email,
			&customer.Name,
			&customer.Telephone,
		); err != nil {
			errors.HandleErr(c, err)
		}
		var location db.Location
		var err error
		location, err = getLocationByID(customer.LocationID)

		customer.Location = location
		errors.HandleErr(c, err)
		customers = append(customers, customer)
	}

	errors.HandleErr(c, err)
	c.JSON(http.StatusOK, gin.H{"customers": customers})
}

// GetCustomerByID Controller
func GetCustomerByID(c *gin.Context) {
	id := c.Param("id")
	idConverted, err := strconv.Atoi(id)
	errors.HandleErr(c, err)

	var customer db.Customer
	var customerErr error
	customer, customerErr = getCustomerByID(idConverted)

	var location db.Location
	var locationErr error
	location, locationErr = getLocationByID(customer.LocationID)

	customer.Location = location

	errors.HandleErr(c, customerErr)
	errors.HandleErr(c, locationErr)
	c.JSON(http.StatusOK, gin.H{"customer": customer})
}

// GetPaymentsByCustomerID Controller
func GetPaymentsByCustomerID(c *gin.Context) {
	id := c.Param("id")
	payments := []db.Payment{}
	idConverted, err := strconv.Atoi(id)
	errors.HandleErr(c, err)

	rows, err := db.DB.Query("SELECT *  FROM payments WHERE customer_id = $1", idConverted)
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
		var locationErr error
		location, locationErr = getLocationByID(payment.LocationID)
		errors.HandleErr(c, locationErr)

		payment.BillingAddress = location
		// payment.Custo
		errors.HandleErr(c, err)
		payments = append(payments, payment)
	}

	errors.HandleErr(c, err)
	c.JSON(http.StatusOK, gin.H{"payments": payments})
}

// GetPaymentsCountByCustomerID Controller
func GetPaymentsCountByCustomerID(c *gin.Context) {
	id := c.Param("id")
	idConverted, convertErr := strconv.Atoi(id)
	errors.HandleErr(c, convertErr)

	rows, err := db.DB.Query("SELECT COUNT(*) FROM payments WHERE customer_id = $1", idConverted)

	var count int

	for rows.Next() {
		if err := rows.Scan(&count); err != nil {
			log.Fatal(err)
		}
	}

	errors.HandleErr(c, err)
	c.JSON(http.StatusOK, gin.H{"count": count})
}

func getLocationByID(locationID int) (db.Location, error) {
	locationRow := db.DB.QueryRow("SELECT * FROM locations WHERE id = $1", locationID)
	var location db.Location
	err := locationRow.Scan(
		&location.ID,
		&location.Latitude,
		&location.Longitude,
		&location.Country,
		&location.Street1,
	)

	return location, err
}

func getCustomerByID(customerID int) (db.Customer, error) {
	customerRow := db.DB.QueryRow("SELECT * FROM customers WHERE id = $1", customerID)
	var customer db.Customer
	err := customerRow.Scan(
		&customer.ID,
		&customer.LocationID,
		&customer.RegistrationTime,
		&customer.Email,
		&customer.Name,
		&customer.Telephone,
	)

	return customer, err
}

func checkCustomerExists(customer db.Customer) bool {
	rows, err := db.DB.Query(db.CheckCustomerExistsByID, customer.ID)
	if err != nil {
		return false
	}
	if !rows.Next() {
		return false
	}
	return true
}
