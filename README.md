**README.md**

# EMITSOFT - Software Licensing & IT Services Platform

EMITSOFT is a web application that allows users to browse software products, add them to a cart, and place orders. Admins can manage products and view submitted orders. The application is built with AngularJS, Node.js, Express, and MySQL, and is hosted on Azure using GitHub Actions CI/CD.

## 📁 Project Structure

* **Frontend**: AngularJS, Bootstrap, HTML/CSS
* **Backend**: Node.js, Express
* **Database**: MySQL (hosted on Azure)
* **Deployment**: Azure Static Web Apps + Azure Web App + GitHub Actions

## 🚀 Features

* Browse software products
* Add to cart and manage quantities
* Submit orders with contact details
* Admin panel to add, edit, delete products
* View and delete submitted orders
* Contact form for inquiries

## ✅ Live Links

* **Frontend**: [https://ambitious-beach-0f51a4403.2.azurestaticapps.net](https://ambitious-beach-0f51a4403.2.azurestaticapps.net)
* **Backend API**: [https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net](https://emitsoft-backend-hwhmbvcsc0bfgdd8.westeurope-01.azurewebsites.net)

## 🚚 Tech Stack

## Frontend:
- HTML, CSS (Bootstrap)
- JavaScript (AngularJS)
- AngularJS modules: `ngSanitize`

## Backend:
- Node.js with Express
- MySQL (Azure Database)
- Nodemailer (for email)
- Hosted on Azure App Service

## 📖 Epics, Features, and User Stories

### Epic: Online Software Shop for Customers

#### Feature 1: Product Browsing and Cart

* ✨ **User Story 1**: As a user, I want to view available software products with name, price, and description so that I can choose what to buy.
* ✨ **User Story 2**: As a user, I want to add products to a shopping cart with quantity so I can manage my order.
* ✨ **User Story 3**: As a user, I want to remove items from the cart before submitting my order.

#### Feature 2: Order Submission

* ✨ **User Story 4**: As a user, I want to fill in my personal information and submit my order so that EMITSOFT can process it.
* ✨ **User Story 5**: As a user, I want to receive a confirmation email after I place an order.

#### Feature 3: Contact Support

* ✨ **User Story 6**: As a user, I want to send a message via contact form to get more information.

---

### Epic: Admin Panel for Product & Order Management

#### Feature 1: Product Management

* ✨ **User Story 7**: As an admin, I want to add new products with name, image, price, and description.
* ✨ **User Story 8**: As an admin, I want to edit existing products.
* ✨ **User Story 9**: As an admin, I want to delete products.

#### Feature 2: Order Management

* ✨ **User Story 10**: As an admin, I want to view submitted orders to fulfill them.
* ✨ **User Story 11**: As an admin, I want to delete completed or test orders.

---

## 📅 Deployment & CI/CD

* GitHub Actions used to build and deploy both frontend and backend automatically.
* On every push to `main`, frontend is deployed to Azure Static Web App and backend is deployed to Azure Web App.

---

## 📅 Author

**Elvin Mammadov**
EMITSOFT Project for Final Exam
