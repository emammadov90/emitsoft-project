const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 3000;

// CORS Config
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:8080',
  'https://ambitious-beach-0f51a4403.2.azurestaticapps.net'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
  optionsSuccessStatus: 200
};
// MIDDLEWARE
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// Email transporter using Gmail
// Orders transporter
const ordersTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'emitsoftorders@gmail.com',
    pass: 'bkcmcwthcsnxsjry'
  }
});

// Contact transporter
const contactTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'emitsoftinfo@gmail.com',
    pass: 'bxdjazvhxwijqbtm'
  }
});

// Get all orders
app.get('/api/orders', (req, res) => {
  const query = 'SELECT * FROM orders ORDER BY id DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Failed to retrieve orders:', err);
      res.status(500).send('Error retrieving orders.');
    } else {
      res.status(200).json(results);
    }
  });
});

// Delete an order by ID
app.delete('/api/orders/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM orders WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Failed to delete order:', err);
      res.status(500).send('Error deleting order.');
    } else {
      res.status(200).send('Order deleted successfully.');
    }
  });
});

// Static file serving
app.use(express.static(path.join(__dirname, '..')));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

// MySQL connection
const db = mysql.createConnection({
  host: 'emitsoft-dbserv01.mysql.database.azure.com',
  user: 'emitsoft_dbadmin',
  password: 'pUTXR]8NtrL3D#fji010a!*G+=5@7I',
  database: 'emitsoftdb',
  ssl: { rejectUnauthorized: true }
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// Helper: Format order details as HTML
function formatOrderHtml(order) {
  const items = JSON.parse(order.order_details).map(item => `
    <tr>
      <td style="padding: 8px;">${item.name}</td>
      <td style="padding: 8px;">€${item.price}</td>
      <td style="padding: 8px;">${item.quantity}</td>
    </tr>`).join('');

  return `
    <div style="font-family: Arial, sans-serif;">
      <h2 style="color: #333;">New Order Received</h2>
      <p><strong>Name:</strong> ${order.first_name} ${order.last_name}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Total Amount:</strong> €${order.total_amount}</p>
      <h3>Order Details</h3>
      <table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="background-color: #f0f0f0;">
            <th style="padding: 8px;">Product</th>
            <th style="padding: 8px;">Price</th>
            <th style="padding: 8px;">Quantity</th>
          </tr>
        </thead>
        <tbody>${items}</tbody>
      </table>
      <p style="margin-top: 20px;">Best regards,<br><strong>EMITSOFT</strong></p>
    </div>`;
}

// ===== ORDERS ENDPOINT =====
app.post('/api/orders', (req, res) => {
  const {
    first_name,
    last_name,
    address,
    email,
    phone,
    order_details,
    total_amount
  } = req.body;

  const query = `
    INSERT INTO orders 
    (first_name, last_name, address, email, phone, order_details, total_amount) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [first_name, last_name, address, email, phone, order_details, total_amount], (err, results) => {
    if (err) {
      console.error('Failed to insert order:', err);
      return res.status(500).send('Error submitting the order.');
    }

    // Send emails
    const htmlContent = formatOrderHtml(req.body);

    const adminMail = {
      from: 'emitsoftorders@gmail.com',
      to: 'emammadov@outlook.com',
      subject: 'New Order Received',
      html: htmlContent
    };

    const customerMail = {
      from: 'emitsoftorders@gmail.com',
      to: email,
      subject: 'Your Order Confirmation - EMITSOFT',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <p>Dear ${first_name},</p>
          <p>Thank you for your order! Here are your order details:</p>
          ${htmlContent}
          <p>We will deliver your license shortly.</p>
        </div>`
    };

    ordersTransporter.sendMail(adminMail, (error, info) => {
      if (error) console.error('Admin email error:', error);
      else console.log('Admin email sent:', info.response);
    });

    ordersTransporter.sendMail(customerMail, (error, info) => {
      if (error) console.error('Customer email error:', error);
      else console.log('Customer email sent:', info.response);
    });

    res.status(200).send('Order submitted and confirmation emails sent.');
  });
});

// ===== PRODUCTS ENDPOINTS =====
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).send('Failed to retrieve products.');
    res.status(200).json(results);
  });
});

app.post('/api/products', (req, res) => {
  const { name, price, image, description } = req.body;
  const query = `INSERT INTO products (name, price, image, description) VALUES (?, ?, ?, ?)`;
  db.query(query, [name, price, image, description], (err) => {
    if (err) return res.status(500).send('Error adding product.');
    res.status(200).send('Product added successfully.');
  });
});

app.delete('/api/products/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send('Error deleting product.');
    res.status(200).send('Product deleted successfully.');
  });
});

app.put('/api/products/:id', (req, res) => {
  const { name, price, image, description } = req.body;
  const id = req.params.id;

  console.log('Updating product ID:', id);
  console.log('With data:', { name, price, image, description });

  const sql = 'UPDATE products SET name = ?, price = ?, image = ?, description = ? WHERE id = ?';
  db.query(sql, [name, price, image, description, id], (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).send('Error updating product');
    }
    res.send('Product updated successfully');
  });
});

// ===== LOGIN ENDPOINT =====
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt for:', username);

  db.query('SELECT * FROM admins WHERE username = ? LIMIT 1', [username], (err, results) => {
    if (err) {
      console.error('❌ Database error during login:', err);
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      console.log('❌ No user found with that username');
      return res.status(401).send('Invalid credentials');
    }

    const hashedPassword = results[0].password_hash;

    bcrypt.compare(password, hashedPassword, (err, match) => {
      if (err) {
        console.error('❌ bcrypt error:', err);
        return res.status(500).send('Encryption error');
      }

      console.log('🔍 Password match result:', match);

      if (!match) {
        console.log('❌ Incorrect password');
        return res.status(401).send('Invalid credentials');
      }

      console.log('✅ Login successful for user:', username);
      res.status(200).send('Login successful');
    });
  });
});


// ===== CONTACT FORM EMAIL =====
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  const mailOptions = {
    from: 'emitsoftinfo@gmail.com',
    to: 'emammadov@outlook.com',
    subject: 'New Contact Form Message',
    html: `
      <h3>New Contact Request</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  contactTransporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Contact email error:', error);
    return res.status(500).send('Email failed');
  }
  console.log('Contact form email sent successfully:', info.response);
  res.status(200).send('Email sent');
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});