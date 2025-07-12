# SEEDING
npx ts-node src/seed/seed.ts




# START SERVER
npx ts-node-dev src/server.ts


# TO TEST USING CURL
curl -X POST http://localhost:5000/api/login -H "Content-Type: application/json" -d "{\"email\":\"admin@email.com\",\"password\":\"admin@123\"}"
