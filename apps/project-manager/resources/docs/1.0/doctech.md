# Technical Documentation

---

- [Informations](#section-1)
- [Description](#section-2)
    - [Summary](#section-2_1)
    - [Splitting the tool](#section-2_2)
- [Technical Conception](#section-3)
    - [Technologies](#section-3_1)
    - [Tree Structure](#section-3_2)
    - [Schemas](#section-3_3)
        - [App Architecture](#section-3_3_1)
        - [Model entity relational](#section-3_3_2)
    - [Api Endpoints](#section-3_4)
    


<a name="section-1"></a>
# Informations

|       Parameter         		|      Value                    |                        
|-----------------------|-------------------------------|
|Nom du projet			|Project Manager            |
|Type de document     	|Technical documentation        |
|Date          			|24/01/2020|
|Version          		|1.0.1|
|Auteurs          		|Esteban Gobert - esteban@go-aos.io|

### Drafting and modifications

|Version |Date      |Nom 		    |  Description                      
|--------|----------|---------------|-------------------|
|1.0.0	 |24/09/2020| Esteban Gobert| First version
|1.0.1	 |28/09/2020| Esteban Gobert| Using LaRecipe to document project

<a name="section-2"></a>
# Description

<a name="section-2_1"></a>
## Summary
Project Manager is a part of a bigger project called AOS Force. His goal is to help managing the projects with a bunch of features that will assist the Operations Customer Managers with their job.

<a name="section-2_2"></a>
## Splitting the tool
The tool is divided into several parts :
- A project manager which allow users to read, edit and delete a projects. A project is composed by several things : informations about the project, checklist, contacts linked, comments and a screenshot. 
- A contact manager which allow users to read, edit and delete a contact. A contact is composed by : informations about the contact and the projects linked to it. 
- A task manager which allow users to read, edit and delete a task. A task is composed by an end date and a description.

   
<a name="section-3"></a>
# Technical Conception
<a name="section-3_1"></a>
## Technologies

Back-end : PHPoO with framework **Laravel 7**  
Front-end : Javascript **React.js 16**  
Database : NoSQL **MongoDb**  
Server : **AWS**  

<a name="section-3_2"></a>
## Tree Structure

<details>
<summary>├── app</summary>  
<br>
│   ├── Console  <br> 
│   │   └── Kernel.php  <br> 
│   ├── Exceptions  <br> 
│   │   └── Handler.php  <br> 
│   ├── Facades  <br> 
│   │   └── Constants.php  <br> 
│   ├── Http  <br> 
│   │   ├── Controllers <br>  
│   │   │   ├── Auth  <br> 
│   │   │   │   ├── ConfirmPasswordController.php  <br> 
│   │   │   │   ├── ForgotPasswordController.php <br>  
│   │   │   │   ├── LoginController.php  <br> 
│   │   │   │   ├── RegisterController.php  <br> 
│   │   │   │   ├── ResetPasswordController.php  <br> 
│   │   │   │   └── VerificationController.php  <br> 
│   │   │   ├── ContactController.php  <br> 
│   │   │   ├── Controller.php  <br> 
│   │   │   ├── HomeController.php  <br> 
│   │   │   ├── ProjectController.php  <br> 
│   │   │   └── TaskController.php  <br> 
│   │   ├── Kernel.php  <br> 
│   │   ├── Middleware  <br> 
│   │   │   ├── Authenticate.php  <br> 
│   │   │   ├── CheckForMaintenanceMode.php  <br> 
│   │   │   ├── EncryptCookies.php  <br> 
│   │   │   ├── RedirectIfAuthenticated.php  <br> 
│   │   │   ├── TrimStrings.php  <br> 
│   │   │   ├── TrustHosts.php  <br> 
│   │   │   ├── TrustProxies.php  <br> 
│   │   │   └── VerifyCsrfToken.php  <br> 
│   │   └── Resources  <br> 
│   │       ├── Task.php <br>  
│   │       └── TaskCollection.php  <br> 
│   ├── Providers  <br> 
│   │   ├── AppServiceProvider.php  <br> 
│   │   ├── AuthServiceProvider.php  <br> 
│   │   ├── BroadcastServiceProvider.php  <br> 
│   │   ├── EventServiceProvider.php <br>  
│   │   └── RouteServiceProvider.php  <br> 
│   ├── Ability.php  <br> 
│   ├── Contact.php  <br> 
│   ├── Project.php  <br> 
│   ├── Role.php  <br> 
│   ├── Task.php  <br> 
│   └── User.php  <br> 
</details>
├── bootstrap  
│   ├── app.php  
│   └── cache  
│       ├── packages.php  
│       └── services.php  
├── config  
│   ├── app.php  
│   ├── ...  
├── database  
│   ├── factories  
│   │   └── UserFactory.php  
│   ├── migrations  
│   │   ├── ...  
│   └── seeds  
│       ├── ContactSeeder.php  
│       ├── DatabaseSeeder.php  
│       ├── ProjectSeeder.php  
│       ├── RoleSeeder.php  
│       └── UserSeeder.php  
├── node_modules  
├── public  
│   ├── ...  
<details>
<summary>├── resources</summary>  
<br>
│   ├── js  <br>
│   │   ├── Base.js  <br>
│   │   ├── BaseInside.js  <br>
│   │   ├── Http.js  <br>
│   │   ├── Index.js  <br>
│   │   ├── Switcher.js  <br>
│   │   ├── app.js  <br>
│   │   ├── assets  <br>
│   │   │   ├── css  <br>
│   │   │   │   └── material-dashboard-react.css  <br>
│   │   │   ├── github  <br>
│   │   │   │   ├── ...  <br>
│   │   │   ├── img  <br>
│   │   │   │   ├── ...  <br>
│   │   │   └── jss  <br>
│   │   │       ├── material-dashboard-react  <br>
│   │   │       │   ├── ...  <br>
│   │   │       └── material-dashboard-react.js  <br>
│   │   ├── bootstrap.js  <br>
│   │   ├── components  <br>
│   │   │   ├── Comments  <br>
│   │   │   │   ├── Comment.js  <br>
│   │   │   │   ├── CommentForm.js  <br>
│   │   │   │   └── CommentList.js  <br>
│   │   │   ├── CustomButtons  <br>
│   │   │   │   └── Button.js  <br>
│   │   │   ├── CustomInput  <br>
│   │   │   │   └── CustomInput.js  <br>
│   │   │   ├── Dialog  <br>
│   │   │   │   └── ConfirmDialog.js  <br>
│   │   │   ├── Header.js  <br>
│   │   │   ├── Loader.js  <br>
│   │   │   ├── LoginForm.js  <br>
│   │   │   ├── Logo.js  <br>
│   │   │   ├── Navbars  <br>
│   │   │   │   ├── AdminNavbarLinks.js  <br>
│   │   │   │   ├── Navbar.js  <br>
│   │   │   │   └── RTLNavbarLinks.js  <br>
│   │   │   └── Sidebar  <br>
│   │   │       ├── FormSidebar.js  <br>
│   │   │       └── Sidebar.js  <br>
│   │   ├── config.js  <br>
│   │   ├── forms  <br>
│   │   │   ├── contactForms.js  <br>
│   │   │   └── projectForms.js  <br>
│   │   ├── index.css  <br>
│   │   ├── layouts  <br>
│   │   │   └── Admin.js  <br>
│   │   ├── old  <br>
│   │   │   ├── ...  <br>
│   │   ├── pages  <br>
│   │   │   ├── Archive.js  <br>
│   │   │   ├── Auth  <br>
│   │   │   │   ├── ForgotPassword.js  <br>
│   │   │   │   ├── Login.js  <br>
│   │   │   │   ├── Logout.js  <br>
│   │   │   │   ├── Register.js  <br>
│   │   │   │   └── ResetPassword.js  <br>
│   │   │   ├── Contact.js  <br>
│   │   │   ├── Dashboard.js  <br>
│   │   │   ├── Home.js  <br>
│   │   │   ├── NoMatch.js  <br>
│   │   │   ├── Project.js  <br>
│   │   │   ├── Task.js  <br>
│   │   │   └── TaskManager.js  <br>
│   │   ├── routes  <br>
│   │   │   ├── Private.js  <br>
│   │   │   ├── Public.js  <br>
│   │   │   ├── Split.js  <br>
│   │   │   ├── index.js  <br>
│   │   │   ├── routes.js  <br>
│   │   │   └── sidebarRoutes.js  <br>
│   │   ├── serviceWorker.js  <br>
│   │   ├── services  <br>
│   │   │   ├── authService.js  <br>
│   │   │   └── index.js  <br>
│   │   ├── store  <br>
│   │   │   ├── action-types  <br>
│   │   │   │   └── index.js  <br>
│   │   │   ├── actions  <br>
│   │   │   │   └── index.js  <br>
│   │   │   ├── index.js  <br>
│   │   │   └── reducers  <br>
│   │   │       ├── Auth.js  <br>
│   │   │       ├── index.js  <br>
│   │   │       └── persistStore.js  <br>
│   │   ├── theme.js  <br>
│   │   └── utils  <br>
│   │       ├── project.js  <br>
│   │       └── validation.js  <br>
│   ├── lang  <br>
│   │   └── en  <br>
│   │       ├── auth.php  <br>
│   │       ├── pagination.php  <br>
│   │       ├── passwords.php  <br>
│   │       └── validation.php  <br>
│   ├── sass  <br>
│   │   ├── _variables.scss  <br>
│   │   └── app.scss  <br>
│   └── views  <br>
│       ├── ...  <br>
</details>  
├── routes  
│   ├── api.php  
│   ├── channels.php  
│   ├── console.php  
│   └── web.php  
├── storage  
│   ├── ...  
│   └── logs  
│       └── laravel.log  
├── tests  
│   ├── ...  
├── Dockerfile  
├── README.md  
├── artisan  
├── composer.json  
├── composer.lock  
├── package-lock.json  
├── package.json  
├── phpunit.xml  
├── server.php  
├── vendor  
└── webpack.mix.js  

<a name="section-3_3"></a>
## Schemas
<a name="section-3_3_1"></a>
### App architecture
![image](../../images/archi_laravel.jpg)
<a name="section-3_3_2"></a>
### Model entity relational
![image](../../images/graph.png)

<a name="section-3_4"></a>
## API Endpoints
You can test the api with either of these endpoints :
- /api/v1/projects
- /api/v1/contacts
- /api/v1/tasks

> {info} Don't forget to add the Bearer Token to the request headers

<larecipe-swagger endpoint="/api/v1/projects"></larecipe-swagger>

