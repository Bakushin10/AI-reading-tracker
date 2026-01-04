// Package main implements a basic HTTP server for the AI reading tracker service.
// This service provides a simple health check endpoint using the Gin web framework.
package main

import "github.com/gin-gonic/gin"

// main initializes and starts the HTTP server.
// It sets up a Gin router with a health check endpoint at /ping
// and starts the server on the default port 8080.
func main() {
	router := gin.Default()

	// pingHandler returns a simple pong response for health checking
	pingHandler := func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	}

	router.GET("/ping", pingHandler)
	router.Run() // listens on 0.0.0.0:8080 by default
}
