# Authentication and Authorization with React, TypeScript and JWT Tokens

## Overview

This project implements authentication and authorization functionalities using React, TypeScript, and JWT tokens.
It includes features such as User Registration, Login which generates JWT token, User data access while the session is active and logout functionality. User data is stored in MongoDB. This README provides an overview of the project, explains the importance of JWT tokens, outlines the project's features, and provides instructions for running the server and client.

## JWT

A JSON Web Token (JWT) is a compact and self-contained way of transmitting information between parties as a JSON object. It consists of three parts separated by dots (.): the header, payload, and signature.

- Header: Contains metadata about the token such as the type (typ) and the hashing algorithm (alg) used to create the signature.
- Payload: Contains the claims, which are statements about an entity (usually the user) and additional data. Claims are categorized into reserved claims (standard) and custom claims (application-specific).
- Signature: Created by encoding the header and payload, and signing it using a secret key (for HMAC algorithm) or private key (for RSA algorithm). It ensures the integrity of the token and verifies that it hasn't been tampered with.

![Alt text](JWT_NEW/ui/public/image.png)

## The Problem with Stateless Applications

Stateless applications do not store session data on the server, making them highly scalable and easier to maintain. However, this poses a challenge for managing user sessions and maintaining authentication state. Traditional session-based authentication methods rely on server-side storage to track user sessions, which is not feasible in stateless architectures.

## Why JWT Tokens?

JWT (JSON Web Tokens) are used for authentication and authorization purposes in web applications due to their security and scalability benefits. JWT tokens are stateless, compact, and self-contained, making them ideal for transmitting information securely between parties. They consist of three parts: a header, a payload, and a signature, which ensures the integrity of the token. JWT tokens provide a secure and efficient way to manage user sessions, authorize access to resources, and prevent common security vulnerabilities such as CSRF and XSS attacks.

## How to Solve Those Problems with Refresh Tokens

To solve the problem of maintaining user sessions in stateless applications, refresh tokens are used in conjunction with JWT access tokens. Refresh tokens are long-lived tokens that are issued alongside the access token during authentication.

When the access token expires, the client sends the refresh token to the server to obtain a new access token without requiring the user to log in again. This process helps maintain user sessions and improves security by limiting the lifespan of access tokens.

By using refresh tokens, stateless applications can efficiently manage user sessions while maintaining scalability and security.

![Alt text](JWT_NEW/ui/public/image-1.png)

## Project Features

- User Registration: Allows users to register by providing necessary information.
- User Login: Enables users to log in using their credentials, generating access and refresh tokens.
- Data Access: Users can access data while their session is active, using the generated access token.
- Logout: Provides a logout button to clear all tokens, revoking user access to data.

## Setting Up Environment Variables

To ensure security, sensitive information such as secrets should be stored in environment variables. Create a `.env` file in the root directory of the api folder and add the following variables:

```
PRIVATE_KEY=your_private_key_here
PUBLIC_KEY=your_public_key_here
MONGODB_URI=your_mongodb_uri_here
```

Note: You can generate keys from https://cryptotools.net/rsagen, select Asymmetric and Key Length = 2048

## Running the Server

1. Navigate to the server directory: `cd api`
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`

## Running the Client

1. Navigate to the client directory: `cd ui`
2. Install dependencies: `npm install`
3. Start the client: `npm run dev`

## Images

- Registration Page with Validation from MongoDB

<img src="./ui/public/Register With Validation.png" alt="Alt Text" width="30%" height="30%">
<br /><br />

- Login Validation with MongoDB

<img src="./ui/public/Login Validation.png" alt="Alt Text" >
<br /><br />

- Login add tokens to cookies

<img src="./ui/public/Login added access and refresh token.png" alt="Alt Text" >
<br /><br />

- Authorized User getting data

<img src="./ui/public/Getting Data while session is active and valid.png" alt="Alt Text" >
<br /><br />

- Logout Will Remove all token so user cannot access session data.

<img src="./ui/public/Logout remove all token.png" alt="Alt Text" >
<br /><br />

- User cannot access data after session out

<img src="./ui/public/Not able to access data after logout.png" alt="Alt Text" >
<br /><br />

## Conclusion

This project demonstrates the implementation of authentication and authorization using React, TypeScript, and JWT tokens. By securely managing user sessions and access to resources, it provides a robust solution for protecting sensitive data in web applications.

# Keep Learning
