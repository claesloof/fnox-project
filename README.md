# fnox-project

fnox_project is a simple project for registering and fetching boxes. Built with:
* Frontend: React + Redux
* Backend: Java REST API

## Start instructions
```sh
git clone https://github.com/claesloof/fnox-project.git
```
### Frontend
In fnox_project/app:
```sh
npm start
```
Then open http://localhost:3000/ to see the app.

To run tests:
```sh
npm test
```

### Backend
#### API
In fnox_projet/backend:
```sh
mvn spring-boot:run
```
Rest API available at http://localhost:8080/.

#### Database
Create a database called boxes_db and import box.sql
MySQL config available in fnox_project/backend/main/java/resources/application.properties
* Username: root
* Password: boxinator
* Connection: localhost
