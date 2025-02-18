# User Registration API

This document provides an overview of the `/register` endpoint for user registration.

## Base URL

```
http://localhost:4000
```

## Endpoint

### POST `/register`

### Description

The `/register` endpoint allows new users to register by providing their full name, email, and password. Upon successful registration, a JSON Web Token (JWT) is returned to authenticate the user for future requests.

## Request Body

**Content-Type:** `application/json`

### Required Fields:

- `fullname`: An object containing the user's first name and last name.
  - `firstname` (string): First name of the user (minimum 3 characters).
  - `lastname` (string): Last name of the user (minimum 3 characters).
- `email` (string): A valid email address.
- `password` (string): The password for the user account (minimum 6 characters).

### Example Request:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

## Response

### Success Response (HTTP Status Code: `201`)

If the registration is successful, a `201 Created` status is returned with a JSON object containing the generated JWT token and the user data.

#### Example Response:

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

- `token`: The generated JWT token for authenticating the user.
- `user`: The user's details including their `_id`, `fullname`, and `email`.

### Error Response (HTTP Status Code: `400`)

If the request validation fails (e.g., invalid email format, missing required fields), a `400 Bad Request` status code is returned with a list of validation errors.

#### Example Response:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Firstname must be 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

- `msg`: A description of the error.
- `param`: The name of the field that caused the error.
- `location`: The location of the parameter (in this case, always `body`).

## Validation Rules

- `email`: Must be a valid email address.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 6 characters long.

## Notes

- Ensure that the email is unique; duplicates will cause an error.
- The password is hashed before being stored in the database for security.
- The returned JWT token can be used to authenticate the user for subsequent requests.
