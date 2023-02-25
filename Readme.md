# Passwordless Auth

**This password verification system is built with node/expressjs to send verification link to users instead of using password to verify users**
## To use this project 
- Clone the repo
- On your terminal
```cmd
cd passwordless-auth
```
```cmd
npm install
```
__To install the packages used in this project__
- Express
- nodeMailer
- jsonwebtoken
- dotenv for .env i.e reading evironment variables.

-----
Setting up your .env file.
- Create a .env file under src folder.
- Click on this [link](https://myaccount.google.com/security) 
to get you google password. Refer this medium article for more info [nodeMailer with nodejs/express](https://medium.com/@ogubuikealex/how-to-implement-passwordless-authentication-in-node-js-with-nodemailer-and-gmail-4e6ee338a897)
- Change the value of this variable in your .env file
```txt
EMAIL_USER="your email address"
EMAIL_PASSWORD="your google account password"
JWT_SECRET_KEY="any random text at all is valid: just for hashing."
```

### After the installation run:
```cmd
cd src
```
```cmd
node index.js
```
__This command will run the app on port 8000__

### Now to test it 
**Install this vscode extension thunder client(it function as an alternative for postman)**

- __Paste this route on the search box__
- __At the body do this__
```json
{
    "email": "example@gmail.com"
}
```
- __Change the method to POST and click on the Send button.__


**This will send an email to the email specified on the req.body**
