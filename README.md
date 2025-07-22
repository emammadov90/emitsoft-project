# EMITSOFT - Software Licensing & IT Services Platform

EMITSOFT is a web application that allows users to browse software products, add them to a cart, and place orders. Admins can manage products and view submitted orders. The application is built with AngularJS, Node.js, Express, and MySQL, and is hosted on Azure using GitHub Actions CI/CD.

---

## Project Structure

- **Frontend**: AngularJS, Bootstrap, HTML/CSS
- **Backend**: Node.js, Express
- **Database**: MySQL (hosted on Azure)
- **Deployment**: Azure Static Web Apps + Azure Web App + GitHub Actions

---

## Features

- Browse software products
- Add to cart and manage quantities
- Submit orders with contact details
- Admin panel to add, edit, delete products
- View and delete submitted orders
- Contact form for inquiries

---

## Live URLs

- **Frontend**: [https://ambitious-beach-0f51a4403.2.azurestaticapps.net](https://ambitious-beach-0f51a4403.2.azurestaticapps.net)
- **Backend Root**: [https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net](https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net)
- **Products API**: [/api/products](https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net/api/products)
- **Orders API**: [/api/orders](https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net/api/orders)

---

## Tech Stack

### Frontend

- HTML, CSS (Bootstrap)
- JavaScript (AngularJS)
- AngularJS modules: `ngSanitize`

### Backend

- Node.js with Express
- MySQL (Azure Database)
- Nodemailer (for order/contact emails)

---

## User Stories

### Epic: Online Software Shop for Customers

#### Product Browsing and Cart

- As a user, I want to view software products with name, price, and description.
- As a user, I want to add products to a cart and manage quantities.
- As a user, I want to remove items before checkout.

#### Order Submission

- As a user, I want to submit my contact information with my order.
- As a user, I want to receive a confirmation email.

#### Contact Support

- As a user, I want to send messages via a contact form.

---

### Epic: Admin Panel for Product & Order Management

#### Product Management

- As an admin, I want to add new software products.
- As an admin, I want to edit existing products.
- As an admin, I want to delete products.

#### Order Management

- As an admin, I want to view submitted orders.
- As an admin, I want to delete test or completed orders.

---

## Security

- Admin login is protected by a username and password stored securely in the database.
- Passwords are hashed using `bcrypt` before being stored.
- Admin access is checked via a login form and validated using AngularJS + backend API.
- `CORS` is configured to allow only trusted origins (`localhost` for development, Azure frontend in production).
- Environment variables and API credentials (e.g., email credentials, DB passwords) are stored securely using GitHub secrets and `process.env`.

---

## Deployment & CI/CD

- GitHub Actions automatically builds and deploys:
  - Frontend → Azure Static Web App
  - Backend → Azure App Service
- Deployment occurs on every push to the `main` branch.
- Node dependencies are installed before backend deployment.
- Environment configuration is handled by Azure App Settings and GitHub Secrets.

---

## Author

**Elvin Mammadov**  
Final Exam Project – EMITSOFT Software Platform
