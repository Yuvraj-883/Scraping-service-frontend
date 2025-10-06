# Web Scraping API

A simple Express.js API for web scraping using Cheerio and Axios.

## Setup

```bash
npm install
npm start
```

## API Endpoints

### POST /scrape
Scrapes content from a given URL.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://example.com",
  "data": {
    "title": "Page Title",
    "headings": ["Heading 1", "Heading 2"],
    "paragraphs": ["Paragraph text..."],
    "links": [{"text": "Link text", "href": "url"}],
    "images": [{"alt": "Alt text", "src": "image-url"}]
  }
}
```

### GET /
Health check endpoint.

## Usage Example

```bash
curl -X POST http://localhost:8000/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```