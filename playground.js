// Example : add Smurf to Village
POST /smurfs
request = {
	name: 'Schtroump '
}

// 1. create a farm "La Prairie"
POST /farms
request = {
  name: '  LA PRAIRIE'
}
status = 201
response = {
  id: 'farm-a',
  name: 'la prairie'
}

// 2. create a farm "Le Jardin"
POST /farms
request = {
  name: 'Le Jardin'
}
status = 201
response = {
  id: 'farm-b',
  name: 'le jardin'
}

// 3. add some goats to farm "La Prairie" (name, birth date)
// 3.a.
POST /goats
request = {
  name: 'Gigi',
  farmId: 'farm-a'
}
status = 201
response = {
  id: 'goat-a',
  name: 'Gigi',
  farmId: 'farm-a'
}

// 3.b. 
POST /farms/farm-a/goats
request = {
  name: 'Gigi',
  bornAt: '2019-12-01T09:00:00.000Z'
}
status = 201
response = {
  id: 'goat-a',
  name: 'Gigi',
  bornAt: '2019-12-01T09:00:00.000Z'
}

// 4. create farmers "Foo" & "John"
POST /farmers
request = {
  name: 'Foo'
}
status = 201
response = {
  id: 'farmer-1',
  name: 'Foo'
}

POST /farmers
request = {
  name: 'John'
}
status = 201
response = {
  id: 'farmer-2',
  name: 'John'
}

// 5. associate "Foo" to farm "La Prairie"
// 5.a. for really simple cases
// /farmers/farmer-1 is different from /farms/farm-a/farmers/farmer-1
POST /farms/farm-a/farmers
request = {
  id: 'farmer-1'
}
response = {
  id: 'farmer-1',
  joinedAt: '2019-01-01'
}

// 5.b. cleaner but adds a resource
POST /farms/farm-a/contracts
request = {
  farmerId: 'farmer-1'
}
response = {
  id: 'contract-1',
  farmerId: 'farmer-1',
  joinedAt: '2019-01-01',
  expiresAt: '2020-01-01'
}

// POST /contracts (and add farmId in body)
// POST /farmers/farmerId/contracts

// 6. associate "John" to farms "La Prairie" et "Le Jardin"
// same as 5.b.

// 7. remove a goat from "La Prairie"
DELETE /farms/farm-a/goats/goat-a
status = 204

// 8. get "John"'s goats
GET /farmers/farmer-1/goats
status = 200
response = {
  totalItems: 1000,
  next: '/farmers/farmer-1/goats?cursor=jashfdgjaghidf',
  items: [
    {
      id: 'goat-a',
      name: 'Gigi',
      farmId: 'farm-a'
    },
    ...
  ]
}

GET /farmers/farmer-1/goats?fields=farm.id,farm.name
status = 200
response = {
  totalItems: 1000,
  next: '/farmers/farmer-1/goats?cursor=jashfdgjaghidf',
  items: [
    {
      id: 'goat-a',
      name: 'Gigi',
      farmId: 'farm-a'
    },
    ...
  ]
}

// another alternative
 GET /goats?farmerId=farmer-1

// 9. fire john from farm "La Prairie"
DELETE /farms/farm-a/farmers/farmer-1
DELETE /farmers/farmer-1/farms/farm-a