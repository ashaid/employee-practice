curl -X POST http://localhost:3000/api/users \
 -H "Content-Type: application/json" \
 -d '{"name":"John Doe","email":"john@example.com"}'

curl -X GET http://localhost:3000/api/users

curl -X GET http://localhost:3000/

# Get all users

curl -X GET http://localhost:3000/api/users

# Get a single user by ID (replace 1 with an actual user ID)

curl -X GET http://localhost:3000/api/users/1

# Create a new user

curl -X POST http://localhost:3000/api/users \
 -H "Content-Type: application/json" \
 -d '{"name": "John Doe", "department": "Engineering"}'

# Update an existing user (replace 1 with an actual user ID)

curl -X PUT http://localhost:3000/api/users/1 \
 -H "Content-Type: application/json" \
 -d '{"name": "John Smith", "department": "Marketing"}'

# Delete a user (replace 1 with an actual user ID)

curl -X DELETE http://localhost:3000/api/users/1

> response.json
