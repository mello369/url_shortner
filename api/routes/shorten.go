package routes

import (
	"time"

	"github.com/gofiber/fiber"
	"github.com/gofiber/fiber/v2"
	"github.com/mello369/url_shortner/api/helpers/helpers.go"
)

type request struct {
	URL         string        `json:"url"`
	CustomShort string        `json:"short"`
	Expiry      time.Duration `json:"expiry"`
}

type response struct {
	URL            string        `json:"url"`
	CustomShort    string        `json:"short"`
	Expiry         time.Duration `json:"expiry"`
	XRateRemaining int           `json:"rate_limit"`
	XRateLimitRest time.Duration `json:"rate_limit_reset"`
}

func ShortenURL(c *fiber.ctx) error {
	body := new(request)
	if err := c.BodyParse(body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cannot parse JSON"})
	}
	//rate limiting -> check ip of client

	//check if the input is an actual url
	if !govalidator.isURL(body.URL) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid URL"})
	}
	//check for domain error
	if !helpers.RemoveDomainError(body.URL) {
		return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{"error": "Domain Error"})
	}
	//enforce https,SSL
	body.URL = helpers.EnforceHTTP(body.URL)
}
