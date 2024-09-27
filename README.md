
# Background

When I was working in real estate, I realized how few resources there were for small business owners to juggle the tasks of property management. Keeping track of payments, communicating with tenants, and making sure that the business is maximizing profit can become challenging.

# Application Details

In this app, properties are organized with the important details summarized on the dashboard. The dashboard contains a list of recent expenses and deposits, along with a pie wish a breakdown of expenses. (Pie chart figures are automatically calculated when a new expense is input). 

### Dashboard
The top of the dashboard contains a section where the user can research up-to-date data about the real estate market with the following features: 
* The latest real estate related news articles are displayed as a scrollable list on the top (fetched from newsapi.org).
* A full MLS search section where the user can enter a zip code to retrieve all current listings (from realty-in-us api). Each listing can be selected to show listing details including images, last sold for price and date, build date, a brief summary, google street view, and a link to the listing on realtor.com where the user can find additional information.
* A section that retries fair market rental values from anywhere in the United States, that the user can filter by state, county, and zip code (api from HUD.gov)

### Units
The Units tab shows an overview of all units that can be displayed in gallery or list format. A search functionality allows the user to search any part of the unit address to filter the list as desired. A unit can then be selected to show further details including an enlarged image, tenant information, and separate tabs for income, expenses, and mortgage information. Here, the user can edit user and tenant information and add income/expense/mortgage details.

### Accounting
The accounting tab contains the financial details of each unit in list format. The expenses and incomes are listed for each unit, along with total loss or profit (can be toggled to show monthly or annually). Managers can calculate mortgage payments at their current APR, or change the rate to see what payments would be at different rates. Managers can also calculate mortgage payoff amounts, and check what it would be at any time in the loan.

Managers can create rent receipts for tenants for proof of rent payment, while also being able to search for any previous rent receipts. (Organized by tenant and year). Tenants can search their own previous rent receipts by year.

### Messages

This section contains full-featured messaging where tenants and property managers can communicate. An address book is retrieved for property managers to send a message to any tenant, while tenants only have access to directly message the manager. Messages are organized in a thread-like conversation form, with the ability to flag and delete each message. For optimized retrieval from the database, messages are organized in a linked-list format where the most recent message is the headNode. Only headNode messages are displayed in the conversation list. When a user selects a message, the list is traversed to also display previous messages.


# Models
### User
* "system-admin" - Access to read/write all data
* "account-admin" - Access to read/write data in account <-- (property owner/manager)
* "user" - Access to read(only user data)/write(messages to account admin) <-- (tenant)

System admin permissions
1. Create Account Admin
2. Create Account Admin Registration (Account Admin must verify registration to complete setup and create User)

Account Admin Permissions
1. Create/Edit Unit
2. Once Unit exists, account admin can
   1. Add user registration to vacant Unit (User must verify registration)
   2. Edit user data
3. Create/Edit Unit Financial Data
4. Create/View Rent Receipts

User permissions
1. View user's unit data including financial data pertinent to user
2. Send/receive messages to/from account admin


### Account
* One account per company
* Each account contains one admin(property owner or manager) and multiple users(tenants)
* Account admin is created when account instance is created

### Registration
* Account Admin authorizes user by creating Registration instance using tenant details
* Random code generated which must be given to user in order to login and set up user account
* User must verify registration using code to create User instance

### Unit
* account (model)
* user (model)
* finance (model)
* unitNumber
* address
* addressLine2
* city
* state
* zip
* image
* bedrooms
* bathrooms

### Finance
* unit (model)
* purchasePrice
* mortgage
  * principal
  * interest
  * term
  * bank
  * paymentsMade
* insurance
  * company
  * agent
  * phone
  * email
  * coverage
  * annualPremium
* hoa
  * company
  * agent
  * phone
  * email
  * annualFee
* annualPropertyTax

### Expense
* unit (model)
* type
* category ["tax", "insurance", "hoa", "maintenance", "repairs", "advertising", utilities", "other"]
* amount
* balance
* dateDue
* companyName
* companyAddress
* companyPhone

### Income
* unit (model)
* category ["rent", "deposit", "other"]
* amount
* balance
* datePaid

## Front-end features
* react-context api and reducer for global state management
* redux-toolkit
* react-router-dom for navigation
* material ui
* axios for server calls
* formik/yup for forms and validation
