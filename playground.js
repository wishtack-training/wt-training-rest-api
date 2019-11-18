https://codeshare.io/5ZdvKd

// example: add an item to shopping list ('home')
POST /lists/home/items
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
	name: '   La Prairie\n '
}
status = 201
response = {
  id: 'FARM_A',
  href: 'https://api/farms/FARM_A',
  name: 'La Prairie'
}

GET /farms/FARM_A
response = {
  id: 'FARM_A',
  href: 'https://api/farms/FARM_A',
  name: 'La Prairie'
}

// 2. Add farmer "Foo Bar" to farm "La Prairie"
POST /farms/{farmId}/farmers
POST /farms/FARM_A/farmers
request = {
  firstName: 'Foo',
  lastName: 'Bar'
}
status = 201
response = {
  id: 'FARMER_1',
  firstName: 'Foo',
  lastName: 'Bar'
}

// 3. Add goats to farm "La Prairie"
POST /farms/FARM_A/goats
request = {
  name: 'Biquette'
}
status = 201
response = {
  id: 'GOAT_1',
  name: 'Biquette',
}

// 4. Create farm "La Defense"
POST /farms
request = {
  name: 'La Defense'
}
status = 201
response = {
  id: 'FARM_B',
  name: 'La Defense'
}

// 5. Add farmers "Foo Bar" & "John Doe" to farm "La Defense"
POST /farms/FARM_B/farmers
request = {
  id: 'FARMER_1'
}
status = 201
response = {
  id: 'FARMER_1',
  createdAt: '2019-01-01',
  firstName: 'Foo',
  lastName: 'BAR'
}

POST /farms/FARM_B/farmers
request = {
  firstName: 'John',
  lastName: 'DOE'
}
status = 201
response = {
  id: 'FARMER_2',
  firstName: 'John',
  lastName: 'DOE'
}

// 6. Add goats to farm "La Defense"
POST /farms/FARM_B/goats
request = {
  name: 'Ginette'
}
status = 201
response = {
  id: 'GOAT_2',
  name: 'Ginette'
}

// 7. Get "Foo Bar"'s goats
GET /farmers/FARMER_1/goats
status = 200
response = {
  totalCount: 9534,
  next: 'https://.../farmers/FARMER_1/goats?cursor=...',
  errors: [
    {
      type: 'missing data',
      message: 'Couldn\'t retrieve all goats...'
    }
  ],
  items: [
    {
      id: 'GOAT_1',
      name: 'Biquette'
    },
    {
      id: 'GOAT_2',
      name: 'Ginette'
    }
  ]
}

// 8. Remove "John Doe" from farm "La Defense"
DELETE /farms/FARM_B/farmers/FARMER_2
DELETE /farmers/FARMER_2/farms/FARM_B









// Using a "contract" relationship resource

POST /farmers/{farmerId}/contracts
request = {
  farmId,
  startsAt,
  endsAt
}

POST /contracts
request = {
  farmId,
  farmerId,
  ...
}
status = 201
response = {
  id: 'CONTRACT_123',
  farm: {
    id: 'FARM_A'
  },
  farmer: {
    id: 'FARMER_A'
  }
}

GET /contracts/CONTRACT_123
response = {
  id: 'CONTRACT_123'
}

GET /contracts/CONTRACT_123?embed=farm,farmer
response = {
  id: 'CONTRACT_123',
  farm: {
    id: '',
    name: ''
  },
  farmer: {
    id: '',
    firstName: ''
  }
}

GET /contracts?started_after=2019-01-01
GET /farms/FARM_A/contracts?started_after=2019-01-01
