# Paymentology Backend API

A simple Express.js backend API for payment management with in-memory storage.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (already created):
```
PORT=5000
NODE_ENV=development
```

3. Run the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5001`

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get payment by ID
- `POST /api/payments` - Create new payment
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Delete payment

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

## Data Models

### Payment
```json
{
  "id": 1,
  "amount": 100.50,
  "currency": "USD",
  "description": "Payment for services",
  "status": "completed",
  "date": "2024-01-15T10:30:00Z",
  "customerId": "CUST001"
}
```

### Customer
```json
{
  "id": "CUST001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

## Example Usage

### Create a new payment:
```bash
curl -X POST http://localhost:5001/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 150.00,
    "currency": "USD",
    "description": "Monthly subscription",
    "customerId": "CUST001"
  }'
```

### Get all payments:
```bash
curl http://localhost:5001/api/payments
```

## Docker

This project includes Docker support for both development and production environments.

### Production Docker
```bash
# Build production image
npm run docker:build

# Run production container
npm run docker:run

# Or use docker-compose
npm run docker:compose
```

### Development Docker
```bash
# Build development image
npm run docker:build:dev

# Run development container with hot reload
npm run docker:run:dev

# Or use docker-compose
npm run docker:compose:dev
```

### Docker Commands
- `npm run docker:build` - Build production Docker image
- `npm run docker:build:dev` - Build development Docker image
- `npm run docker:run` - Run production container
- `npm run docker:run:dev` - Run development container with volume mounting
- `npm run docker:compose` - Start production with docker-compose
- `npm run docker:compose:dev` - Start development with docker-compose
- `npm run docker:compose:down` - Stop production containers
- `npm run docker:compose:down:dev` - Stop development containers

## Code Quality

This project uses ESLint and Prettier for code quality and formatting:

### Available Scripts
- `npm run lint` - Check for linting errors
- `npm run lint:fix` - Fix auto-fixable linting errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted
- `npm run code:check` - Run both linting and format checking
- `npm run code:fix` - Fix both linting and formatting issues

### VS Code Setup
The project includes VS Code settings for automatic formatting and linting on save. Make sure you have the following extensions installed:
- ESLint
- Prettier - Code formatter

## Notes

- Data is stored in memory and will be reset when the server restarts
- No authentication is implemented (for development purposes)
- CORS is enabled for frontend integration 