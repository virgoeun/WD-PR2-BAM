
# Express App Project
## "Hugger - Online Community for Mental Health" 

<img src="./public/images/Hugger Logo.png" alt="Alt text" title="Optional title">

[Deployment Link](https://bam-hugger.adaptable.app)

<br>

## Our Aspiration
We envision a world where individuals can openly discuss mental health topics and inspire positive change, all while feeling safe, accepted, and empowered.
<br>
<br>
<img src="./public/images/Hugger project main.png" alt="Alt text" title="Optional title">
<br>

## What Problem Does it Solve?
Hugger provides a secure and compassionate digital platform where people can connect, learn, and grow together in their mental health journeys. Users get informative resources, have meaningful discussions, and support each other, to break the stigma surrounding mental health and promote mental well-being. 
<br>

## Main Functionality
- Hugger is based on Express App 
- Mongoose Models for data modelings & dadtabase communication 
- Cloudinary for user media management (database)
- Axios for HTTP client requests(Javascript) & external API service
- CRUD(Create, Read, Update, Delete) implementation
- Multiple endpoints(routes) managements (GET/POST method) 
- Handlebars as viewengine for renderings
- Session & Cookie management 
- User login/out & Signup 
- User Authentication & Authorization
- CSS: Bootstrap 5.0.2v (Reponstive design)

<br>

## Backlog
- Comment threads
- Live Post Update Feature
- Social Media Login
- Social Media Share & Likes
- Journal Password
- Live Chat Functions
- Video Post DB 

<br>

## Technologies Used
- HTML
- CSS
- JavaScript
- OOP (Object Oriented Programming)
- Node.JS
- Express.Js
- Handlebars
- Mongo DB & Mongoose
- Axios (external API)
- Cloudinary 
- Github 


<br>

## User Flow

<img src="./public/images/Userflow.png" alt="UserFlow" title="Optional title">

*Session Expries every 1hour*
1. User Enter
2. Login or Signup
3. Guest User Access denied to Community & Profile Page
   -  Redirect to the Signup Page
4. LoggedIn user accesses to Profie Dashboard
5. LoggedIn user accesses to private Journal page
6. LoggedIn user accesses to Community page
7. LogOut is possible from No.4 to No.6 journey

<br>

## Project Structure
#### Models
- User model (Ref: Post & Journal)
- Post model (Ref: User & Comment)
- Comment model (Ref: User)
- Journal model (Ref: User)

#### Routes
- Login/Logout routes
- Signup route
- Profile routes: CRUD actions
- Post routes: CRUD actions
- Comment routes: CRUD actions
- Journal routes: CRUD actions
- About routes

#### Views (hbs)
- Layout
- Index(Main)
- Abous Us
- Login
- Signup
- Journal: Create, Edit, Details, Delete, List
- Post: Create, Edit, Details, Delete, List
- User: Edit(profile)
- Not-found
- Error

#### Configuration
- Claudinary Configuration
- Session Configuration
- Express App

#### 3rd Party API
- Yoga API: https://github.com/alexcumplido/yoga-api
- Axios 

#### Middleware
- Login Authorization & Authentication 

#### Cloudinary

#### MongoDB & Mongoose 
- Database 

#### .env
- Port
- API URL
- MongoDB URL
- Session Secret 
- Cloudinary Key & Secret  


## Extra Links
- [Yoga API](https://github.com/alexcumplido/yoga-api)
- [Github repository Link](https://github.com/virgoeun/WD-PR2-BAM)
- [Deployment Link](http://localhost:3000/)
- [Trello Link](https://trello.com/b/Qal8Yq1j/%E2%AD%90%EF%B8%8F-ironhack-wd-project-2-bam)
- [Figma Link](https://www.figma.com/file/4GYLhDwu2LBHAiB4aH2nvd/Hugger-User-Flows-%26-Backlogs?type=whiteboard&t=5yOnyTPw0v982G6o-0)
- [Slides Link](https://docs.google.com/presentation/d/1cjEvEim-JHhBTwSs8KTZ3oTR5vuaugeUTwzCeFCFzM4/edit#slide=id.g2775d7d4e5c_0_452)

