# GoClock
A dynamic MERN web dashboard connecting Manufacturers and Transporters. Seamlessly send and receive messages, manage orders, and track deliveries. Registration, login, and role-based access. Designed for efficient collaboration..


## 🚀 Features
- Pagination: The messages list on the landing page is implemented with pagination, allowing users to navigate through multiple pages of messages.

- Redux State Management: The website utilizes Redux for state management, providing a centralized store to manage application data and facilitate communication between components.

- MVC Folder Structure: The codebase follows the Model-View-Controller (MVC) folder structure, organizing files and components into separate directories based on their respective responsibilities.

- TypeScript: The website is built using TypeScript, a statically typed superset of JavaScript. TypeScript helps in catching errors during development and provides better code documentation and editor support.

- User Registration and Login: Users can create accounts and log in as either Manufacturers or Transporters.

- Role-based Access: The system distinguishes between Manufacturers and Transporters, providing role-specific functionality and access.

- Landing Page: Separate landing pages for Manufacturers and Transporters display a list of received messages, showcasing the order ID for each message.

- Search Functionality: Users can search for messages based on order ID, "To" field, and "From" field, allowing for quick and efficient message retrieval.

- Manufacturer Input Form: Manufacturers have a form with input fields for Order ID, "To" field, "From" field, Quantity (with a dropdown menu), and an Address field (auto-populated from registration).

- Transporter Selection: Manufacturers can select a transporter from a dropdown menu when sending a message. Only one transporter can be chosen.

- Message Sending: Manufacturers can send messages to selected transporters by clicking a "Send" button.

- Transporter Order Selection: Transporters have a list box to select the order ID received from Manufacturers.

- Price Input: Transporters have an input form to enter the price (float value) for a selected order.


## Dependencies
### Frontend

- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) - Redux state management library.
- [axios](https://www.npmjs.com/package/axios) - Promise-based HTTP client for API requests.
- [react](https://www.npmjs.com/package/react) - JavaScript library for building user interfaces.
- [react-dom](https://www.npmjs.com/package/react-dom) - Entry point for working with the DOM in React.
- [react-redux](https://www.npmjs.com/package/react-redux) - Official React bindings for Redux.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - Declarative routing for React applications.
- [react-toastify](https://www.npmjs.com/package/react-toastify) - Toast notifications for React.
- [redux](https://www.npmjs.com/package/redux) - Predictable state container for JavaScript apps.
- [redux-thunk](https://www.npmjs.com/package/redux-thunk) - Thunk middleware for Redux.
- [@types/react](https://www.npmjs.com/package/@types/react) - TypeScript definitions for React.
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) - TypeScript definitions for ReactDOM.
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) - TypeScript support for ESLint.
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - TypeScript parser for ESLint.
- [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) - Official React plugin for Vite.
- [eslint](https://www.npmjs.com/package/eslint) - Pluggable JavaScript linter.
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) - ESLint plugin for enforcing React Hooks rules.
- [eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh) - ESLint plugin for React Refresh support.
- [sass](https://www.npmjs.com/package/sass) - CSS extension language.
- [typescript](https://www.npmjs.com/package/typescript) - Typed superset of JavaScript.
- [vite](https://www.npmjs.com/package/vite) - Fast development server and build tool for modern web apps.

### Backend

- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing library.
- [cors](https://www.npmjs.com/package/cors) - Middleware for enabling CORS in Express apps.
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable loader.
- [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for Node.js.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token implementation.
- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modeling tool.
- [nodemon](https://www.npmjs.com/package/nodemon) - Utility for automatically restarting the server.

## Register Page
![register-page](https://github.com/SumitPokhriyal5/smovie/assets/112632728/5b6e8f8f-acb1-4eb6-ad6d-8f781f5b5a59)
## Login Page
![login-page](https://github.com/SumitPokhriyal5/smovie/assets/112632728/333ad971-7eb7-4a1d-b439-cb6b668174e4)
## Home Page
### Manufacturer
![manufacturer](https://github.com/SumitPokhriyal5/smovie/assets/112632728/9873a3d9-946e-4922-967a-bcd6d30ebfaf)
### Transporter
![transporter](https://github.com/SumitPokhriyal5/smovie/assets/112632728/cdffbca7-3033-464f-b7e1-795837cc127c)


