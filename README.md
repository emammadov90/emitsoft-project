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

### **Frontend**
- **Primary (Custom Domain):** [https://www.emitsoft.de](https://www.emitsoft.de)
- **Azure (Fallback):** [https://ambitious-beach-0f51a4403.2.azurestaticapps.net](https://ambitious-beach-0f51a4403.2.azurestaticapps.net)

### **Backend Root**
- **Primary (Custom Domain):** [https://api.emitsoft.de](https://api.emitsoft.de)
- **Azure (Fallback):** [https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net](https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net)

### **Products API**
- **Custom Domain:** [https://api.emitsoft.de/api/products](https://api.emitsoft.de/api/products)
- **Azure:** [https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net/api/products](https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net/api/products)

### **Orders API**
- **Custom Domain:** [https://api.emitsoft.de/api/orders](https://api.emitsoft.de/api/orders)
- **Azure:** [https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net/api/orders](https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net/api/orders)

### **Admin Panel Access**
- **Custom Domain:** [https://www.emitsoft.de/admin-login.html](https://www.emitsoft.de/admin-login.html)
- **Azure:** [https://ambitious-beach-0f51a4403.2.azurestaticapps.net/admin-login.html](https://ambitious-beach-0f51a4403.2.azurestaticapps.net/admin-login.html)

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

## Email Handling

- Emails from the contact and order forms are sent via secure SMTP using authenticated Outlook and Gmail accounts. Confirmation emails are sent to both the admin and the user. 
  - emitsoftorders@gmail.com for order confirmations
  - emitsoftinfo@gmail.com for contact inquiries

---

## Deployment & CI/CD

- GitHub Actions automatically builds and deploys:
  - Frontend → Azure Static Web App
  - Backend → Azure App Service
- Deployment occurs on every push to the `main` branch.
- Node dependencies are installed before backend deployment.
- Environment configuration is handled by Azure App Settings and GitHub Secrets.

---

## Database Screenshots

### 1. Admins Table

**Structure (SHOW COLUMNS):**
![Admins Table Structure](https://www.emitsoft.de/docs/admins-columns.png)

**Data (SELECT * FROM):**
![Admins Table Data](https://www.emitsoft.de/docs/admins-data.png)

---

### 2. Orders Table

**Structure (SHOW COLUMNS):**
![Orders Table Structure](https://www.emitsoft.de/docs/orders-columns.png)

**Data (SELECT * FROM):**
![Orders Table Data](https://www.emitsoft.de/docs/orders-data.png)

---

### 3. Products Table

**Structure (SHOW COLUMNS):**
![Products Table Structure](https://www.emitsoft.de/docs/products-columns.png)

**Data (SELECT * FROM):**
![Products Table Data](https://www.emitsoft.de/docs/products-data.png)

---

## Author

**Elvin Mammadov**  
Final Exam Project - EMITSOFT Software Platform
