
// example: add an item to shopping list ('home')
POST /shopping-lists/SHOPPING_LIST_A/items
request = {
 title: 'Chocolate'
}
status = 201
response = {
	...
}


// 1. Create farm "La Prairie"
POST /farms
request = {
  name: '   La Prairie\n'
}
status = 201
response = {
  id: 'la-prairie',
  createdAt: '2020-01-08T00:03:00.000Z',
  name: 'La Prairie'
}

// 2. Add farmer "Foo Bar" to "La Prairie"
POST /farms/la-prairie/farmers
request = {
  name: 'Foo Bar'
}
status = 201
response = {
  id: 'foo-bar',
  name: 'Foo Bar'
}

// 3. Add goats to farm "La Prairie"
POST /farms/la-prairie/goats
request = {
  name: 'Bichette'
}
status = 201
response = {
  id: 'bichette',
  name: 'Bichette'
}

POST /farms/la-prairie/goats
request = {
  name: 'Didi'
}
status = 201
response = {
  id: 'didi',
  name: 'Didi'
}

// 4. Create farm "La Defense"
POST /farms
request = {
  name: 'La Defense'
}
status = 201
response = {
  id: 'la-defense',
  name: 'La Defense'
}

// 5. Add farmers "Foo Bar" & "John Doe" to farm "La Defense"
POST /farms/la-defense/farmers
request = {
  id: 'foo-bar',
}
status = 201
response = {
  id: 'foo-bar',
  name: 'Foo Bar'
}

POST /farms/la-defense/farmers
request = {
  name: 'John Doe'
}
status = 201
response = {
  id: 'john-doe',
  name: 'John Doe'
}

// 6. Add goats to farm "La Defense"
// Cf. 3 with names 'Toto' et 'Titi'

// 7. Get "Foo Bar"'s goats
GET /farmers/foo-bar/goats
status = 200
response = {
  totalCount: 3,
  next: null, // /farmers/foo-bar/goats?offset=10
  items: [
    {
      id: 'didi',
      name: 'Didi'
    },
    {
      id: 'titi',
      name: 'Titi'
    },
    // ...
  ]
}


// GET /goats?q=did
// GET /goats?age_gte=3

// 8. Remove "John Doe" from farm "La Defense"

DELETE /farms/la-defense/farmers/john-doe
status = 204

// 9. Use contracts.
POST /farmers/john-doe/contracts
request = {
  farmId: 'la-defense'
}

POST /contracts
request = {
  farmId: 'la-defense',
  farmerId: 'john-doe'
}
response = {
  id: 'contract-a',
  farmId: 'la-defense',
  farmerId: 'john-doe',
  createdAt: '...',
  expiresAt: '...'
}

DELETE /contracts/contract-a
