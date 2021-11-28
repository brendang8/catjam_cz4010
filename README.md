
<!-- ABOUT THE PROJECT -->
## About The Project

Secure and Accountable Bounties for Digital Tasks

Requirements:
* User management module needs to be authenticated to ensure entity authentication and non-repudiation
* Users can post bounties for certain digital tasks as well as complete tasks posted on the platform for bounty.
* Users can post verifiable "proof of deliver" of tasks as well as verifiable "proof of payment" upon delivery.


## Features

The application catJAM is a full stack web application that allows users to post bounties as well as accept bounties. The application is secured with JSON Web Token (JWT) together with OAuth2. This ensures that the user will be able to access resources only if they have the token, and no party will be able to access restricted content without going through the authentication process.

## Why JWT and Oauth2?

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

OAuth2 is an authorization protocol that builds upon the original OAuth protocol created in 2006, arising out of a need for authorization flows serving different kinds of applications from web and mobile apps to IoT. OAuth2 specifies the flows and standards under which authorization token exchanges should occur. OAuth2 does not encompass authentication, only authorization.

The benefits of using JWT together with OAuth include:
* Wide usage with backend APIs
* Can be validated without connecting to the Authorization Server on every API call.
* Has expiration date to determine user access

## Development Idea

Creating a full stack application with an online database such as Firebase would have made it easier, however, because Firebase is able to do everything, we are not able to show the cryptographic tools. Thus, we have chosen to stick to the standard architecture of using a local database, frontend and backend.

### Built With

The project was built with the following softwares

* [React.js](https://reactjs.org/)
* [Spring Boot](https://spring.io/projects/spring-boot)
* [Neo4j](https://neo4j.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
In the catjam-webapp application, node_modules are not included in the Git Repo, so it is required to download the packages from your end.

1. Clone the repo
   ```sh
   git clone https://github.com/brendang8/catjam_cz4010
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
<p align="right">(<a href="#top">back to top</a>)</p>

