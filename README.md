# ShareBnb App

ShareBnb is a web application that allows users to share and rent accommodations from other users. Users can create an account, list their rental spaces, browse and book available rentals, and manage their listings.

## Features

- User authentication: Users can sign up and log in to their accounts to access the full functionality of the app.
- Rental listings: Users can create and manage their rental listings, including adding details such as title, description, price, location, and images.
- Browse rentals: Users can view available rentals listed by other users, filter and search for specific rental properties, and view detailed information about each rental.
- User profile: Users have their own profile page displaying their personal information and the rental spaces they have listed.
- Responsive design: The app is designed to be responsive and work well on different devices and screen sizes.

## Technologies Used

- React: JavaScript library for building user interfaces.
- React Router: Library for handling routing in the React app.
- Axios: HTTP client for making API requests.
- jwt-decode: Library for decoding JSON Web Tokens (JWT).
- CSS: Styling the components and layout of the app.
- Node.js: JavaScript runtime environment.
- Express.js: Web application framework for Node.js.
- PostgreSQL: SQL database for storing user and rental data.
- AWS S3: Cloud storage for storing photos.

## Getting Started

1. Clone the repository:

```shell
git clone git@github.com:mgregerson/sharebnb-react.git
```

2. Install the dependencies:

```shell
cd sharebnb-react
npm install
```

3. Set up the backend server

- Please visit my backend github for this project for instructions: https://github.com/mgregerson/sharebnb-flask

4. Start the React Development Server

```shell
npm start
```

5. Open the app in your browser:

Visit `http://localhost:3000` to access the ShareBnb app.

## API Class

The `ShareBnbApi` class in the `helpers/api.js` file provides methods for making API requests to the backend server. It handles user authentication, fetching rental data, and managing user-related operations. The API class utilizes Axios for making HTTP requests and jwt-decode for decoding JSON Web Tokens.

## RoutesList Component

The `RoutesList` component in the `RoutesList.js` file defines the routes for different pages of the app using React Router. It sets up routes for the homepage, user authentication pages (signup and login), rental listings, user profile, and a not-found page. The component utilizes a user context to determine the user's authentication status and display the appropriate routes.

## App Component

The `App` component in the `App.js` file is the main component of the ShareBnb app. It manages the user authentication state, handles user signup and login, and fetches user and rental data based on the user's token. The component sets up the navigation bar, user context, and routes using React Router.

## Contributing

Contributions to the ShareBnb app are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.

## License

The ShareBnb app is open-source and released by me, Matt Gregerson. Enjoy!
