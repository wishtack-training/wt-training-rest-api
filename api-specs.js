/**
 * Check offers
 */

/* Request. */
GET /offers?location=paris&startDate=2019-01-30&endDate=2019-02-10

status = 200
response = {
    meta: {
        totalCount: 90,
        next: '/offers?location....&offset=abascd123',
        errors: [
            {
                type: 'provider-unavailable',
                providerId: 'sixt',
                message: 'Sixt is not available.'
            }
        ]
    },
    items: [
        {
            id: 'OFFER_01',
            vehiculeInfo: {
                type: 'C',
                gear: 'automatic',
                engine: 'electric'
            }
            price: 100.00
        },
        ...
    ]
}

POST /users
request = {
    email: 'younes@wishtack.io',
    password: '12345678'
}

response = {
    id: 'USER_01',
    email: 'y***@wishtack.io',
    passwordExpiresAt: '2020-01-01T20:30:30'
}

GET /users/USER_01
response = {
    id: 'USER_01',
    email: 'y***@wishtack.io',
    passwordExpiresAt: '2020-01-01T20:30:30'
}

/**
 * Book offer.
 */
POST /users/USER_01/bookings
request = {
    offerId: 'OFFER_01'
}

response = {
    id: 'BOOKING_01',
    status: 'pending'
}

GET /users/USER_01/bookings
GET /bookings?startDate=2019-01-01
GET /bookings?userId=USER_01

/**
 * Pay.
 */
POST /bookings/BOOKING_01/payments
request = {
    paymentMethod: {
        cardNumber: '...',
        expirationDate: '...'
    }
}

response = {
    id: 'PAYMENT_01',
    status: 'FAILED',
    reason: '...'
}

GET /bookings/BOOKING_01
response = {
    id: 'BOOKING_01',
    status: 'pending'
}

/**
 * Retry payment.
 */
POST /bookings/BOOKING_01/payments
request = {
    paymentMethod: {
        cardNumber: '...',
        expirationDate: '...'
    }
}
response = {
    id: 'PAYMENT_02',
    status: 'SUCCESS',
    reason: '...'
}

GET /bookings/BOOKING_01
response = {
    id: 'BOOKING_01',
    status: 'paid'
}
