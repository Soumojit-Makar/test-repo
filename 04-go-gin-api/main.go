package main

import (
	"fmt"
	"net/http"
	"os"
	"runtime"
	"strconv"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// ── Models ────────────────────────────────────────────────────────────────────

type Book struct {
	ID     int     `json:"id"`
	Title  string  `json:"title"`
	Author string  `json:"author"`
	Genre  string  `json:"genre"`
	Price  float64 `json:"price"`
	Stock  int     `json:"stock"`
}

type Review struct {
	ID     int    `json:"id"`
	BookID int    `json:"book_id"`
	Rating int    `json:"rating"`
	Text   string `json:"text"`
}

// ── In-memory store ───────────────────────────────────────────────────────────

var (
	books = []Book{
		{ID: 1, Title: "The Go Programming Language", Author: "Donovan & Kernighan", Genre: "tech", Price: 49.99, Stock: 20},
		{ID: 2, Title: "Clean Code", Author: "Robert C. Martin", Genre: "tech", Price: 39.99, Stock: 15},
		{ID: 3, Title: "Dune", Author: "Frank Herbert", Genre: "sci-fi", Price: 14.99, Stock: 30},
	}
	reviews    = []Review{}
	nextBookID = 4
	nextRevID  = 1
	mu         sync.RWMutex
	startTime  = time.Now()
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:    []string{"*"},
	}))

	// ── Routes ─────────────────────────────────────────────────────────────────
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"service":   "go-gin-api-demo",
			"version":   "1.0.0",
			"status":    "running",
			"runtime":   fmt.Sprintf("Go %s", runtime.Version()),
			"timestamp": time.Now().UTC().Format(time.RFC3339),
			"endpoints": []string{
				"GET  /",
				"GET  /health",
				"GET  /api/books",
				"POST /api/books",
				"GET  /api/books/:id",
				"GET  /api/reviews",
				"POST /api/reviews",
			},
		})
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
			"uptime": fmt.Sprintf("%.2fs", time.Since(startTime).Seconds()),
		})
	})

	// Books
	r.GET("/api/books", func(c *gin.Context) {
		mu.RLock()
		defer mu.RUnlock()
		genre := c.Query("genre")
		if genre == "" {
			c.JSON(http.StatusOK, gin.H{"books": books, "total": len(books)})
			return
		}
		filtered := []Book{}
		for _, b := range books {
			if b.Genre == genre {
				filtered = append(filtered, b)
			}
		}
		c.JSON(http.StatusOK, gin.H{"books": filtered, "total": len(filtered)})
	})

	r.GET("/api/books/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		mu.RLock()
		defer mu.RUnlock()
		for _, b := range books {
			if b.ID == id {
				c.JSON(http.StatusOK, b)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "book not found"})
	})

	r.POST("/api/books", func(c *gin.Context) {
		var b Book
		if err := c.ShouldBindJSON(&b); err != nil || b.Title == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "title is required"})
			return
		}
		mu.Lock()
		b.ID = nextBookID
		nextBookID++
		books = append(books, b)
		mu.Unlock()
		c.JSON(http.StatusCreated, b)
	})

	// Reviews
	r.GET("/api/reviews", func(c *gin.Context) {
		mu.RLock()
		defer mu.RUnlock()
		c.JSON(http.StatusOK, gin.H{"reviews": reviews, "total": len(reviews)})
	})

	r.POST("/api/reviews", func(c *gin.Context) {
		var rev Review
		if err := c.ShouldBindJSON(&rev); err != nil || rev.BookID == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "book_id is required"})
			return
		}
		mu.Lock()
		rev.ID = nextRevID
		nextRevID++
		reviews = append(reviews, rev)
		mu.Unlock()
		c.JSON(http.StatusCreated, rev)
	})

	fmt.Printf("🐹 Go Gin API running on port %s\n", port)
	r.Run(":" + port)
}
