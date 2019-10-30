// 1. Create farmer A
POST /farmers
request = {
 firstName: '   Foo',
 lastName: 'BAR\n'
}
stauts = 201
response = {
 id: 'farmer-a',
 firstName: 'foo',
 lastName: 'bar'
}

// 2. Create farmer B
request = {
  firstName: 'John',
  lastName: 'DOE'
 }
 stauts = 201
 response = {
  id: 'farmer-b',
  firstName: 'john',
  lastName: 'doe'
 }

// 3. Create farm "La Défense"
POST /farms
request = {
  name: 'La Défense'
}
response = {
  id: 'farm-1',
  name: 'La Défense'
}

// 4. Create farm "Le Pré"
POST /farms
request = {
  name: 'Le Pré'
}
response = {
  id: 'farm-2',
  name: 'Le Pré'
}

// 5. Add farmer A to farm "La Défense"

// patching a list field can produce race conditions

// PATCH /farmers/farmer-a
// request = {
//  farmIds: ['farm-1']
// }

// PATCH /farmers/farmer-a
// request = {
//  farmIds: ['farm-1', 'farm-2']
// }

// POST /farmers/farmer-a/farms
// request = {
//   id: 'farm-1'
// }
// response = {
//   id: 'farm-1'
// }

// Light version
POST /farms/farm-1/farmers
request = {
  id: 'farmer-a'
}

// This can be overkill or make sense depending on context
POST /jobs
request = {
  farmId: 'farm-1',
  farmerId: 'farmer-a'
}
response = {
  id: 'job-1',
  createdAt: '...',
  farmId: 'farm-1',
  farmerId: 'farmer-a'
}

PUT /farms/farm-1/farmers
request = [
  {
    id: 'farmer-a'
  },
  {
    id: 'farmer-b'
  }
]

GET /farms/farm-1/farmers
response = {
  next: '/farms/farm-1/farmers?cursor=...',
  totalCount: 5432995,
  items: [
    {
      id: 'farmer-a',
      firstName: 'Foo'
    },
    {
      id: 'farmer-b',
      firstName: 'John'
    }
  ]
}

// 6. Add farmer B to farm "La Défense" & "Le Pré"
// same goes here

// 7. Add goats to farm "La Défense"
POST /farms/farm-1/goats
request= {
  id: 'goat-1',
  name: 'Goat 3'
}
response={
  id: 'goat-3',
  name: 'Goat One'
}

// that's how we could add goats to the farm
POST /ownerships
request = {
  goatId: 'goat-1',
  farmId: 'farm-1'
}
response = {
  id: 'ownership-1',
  goatId: 'goat-1',
  farmId: 'farm-1'
}

// 8. Update a goat's age
PATCH /goats/goat-1
request = {
  age: 3
}
response = {
  id: 'goat-1',
  age: 3
}

// 9. Retrieve goats managed by farmer B
GET /farmers/farmer-b/goats

// Retrieve first farm's goats
GET /farms/farm-1/goats
GET /goats?has_farm=true&is_alive=true&city__ne=lyon

// 10. Remove a goat from farm "La Défense"
DELETE /farms/farm-1/goats/goat-1
DELETE /ownerships/ownership-1

// 11. Delete the goat
DELETE /goats/goat-1





