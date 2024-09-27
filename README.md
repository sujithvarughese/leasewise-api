
### Background

When I was working in real estate, I realized how few resources there were for small business owners to juggle the tasks of property management. Keeping track of payments, communicating with tenants, and making sure that the business is maximizing profit can become challenging.

In this app, properties are organized with the important details shown on login. Each property’s financial details are neatly laid out. Managers can calculate mortgage payments at their current APR, or change the rate to see what payments would be at different rates. Managers can also calculate mortgage payoff amounts, and check what it would be at any time in the loan. Seeing how little of the payment is going towards the principal until the end of the loan is mind-boggling! For managers with multiple properties, all payments and rents collected are summarized on the Finances home page to show an overview of total profit or loss.

Managers can create rent receipts for tenants for proof of rent payment, while also being able to search for any previous rent receipts. (Organized by tenant and year). Tenants can search their own previous rent receipts by year.

Mobile has the same features, but property managers have the aded ability to call or message any tenant straight from the Home Screen.

I created a Messages section where tenants and property managers can communicate. Managers can message any tenant in the account, while tenants only have access to message the admin (property manager). Messages are organized in a thread-like conversation form, similar to our phones. Traditional Incoming and Outgoing folders are also accessible via tabs in the Messaging section.

### Application Details

* MERN stack (React front end, NodeJS/Express back end and Mongo to handle database)
* Roles for account managers who have access to all data in their account and tenants who have access to only data related to their unit
* Context and reducer for state management where needed
* React Router for basic navigation
* Tokens attached to signed cookies for verification (JWT)
* Integrated API from HUD.gov so managers can get nationwide rent values based on state/county/zip code


### Models
**User**
* "system-admin" - Access to read/write all data
* "account-admin" - Access to read/write data in account <-- (property owner/manager)
* "user" - Access to read(only user data)/write(messages to account admin) <-- (tenant)

**Account**
* One account per company
* Each account contains one admin(property owner or manager) and multiple users(tenants)
* Account admin is created when account instance is created

**Registration**
* Account Admin authorizes user by creating Registration instance using tenant details
* Random code generated which must be given to user in order to login and set up user account
* User must verify registration using code to create User instance



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
