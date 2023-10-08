

<br />
<div align="center">
  <a href="">
    <img src="public/images/6c51ea8f8de48e439d4e3c358a89c07837bbf409_00.gif" alt="Logo" width="80" height="80">
  </a>

</div> 

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#in-addition">In Addition</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

This project is a task from lemonCode bootcamp backend. 

We need to create a rest api to book an apartament.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


* [![Node][Node.js]][nodejs-url]
* [![express][Express.js]][express-url]



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

<!-- TODO: WHEN FINISH THE API TERMINATE THIS SECTION -->

### Prerequisites

install node

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/adriel87/Api-rest-airbnb-mongo.git
   ```
2. Install NPM packages
   ```sh
   pnpm install
   ```
   all scripts in `package.json` are made thinking in pnpm, please use pnpm for this project

3. Set your `env` and `.env.test` file, take .env.example create a copy and rename for .env and .env.test and update your variables

4. before run the project you need to create a mongodb database
  1. first clone the next repository https://github.com/Lemoncode/mongodb-sample-dbs-backup
  2. you could use console-runner to create and seed the database

  ```sh
  pnpm start:console-runners
  ```
  select `seed data`

  3. Now you need to create 2 valid user to test the application run console runner again and select create user
  
  creata one user whit role `ADMIN` and one whit role `USER`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage


1. once you install the project [import the postman collection to your postman](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/)

2. right now you can run the next command

```sh
pnpm start
```

3. consume the api
  - first login, this action set in your postman or browser a cookie whit token
  - use the apartment api define in apartments collection

### testing

the project count whit unit test and e2e test

```sh
pnpm test
```

I can't end test for all helpers files, to much hot 🔥🔥🔥

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Setup initial repo architecture
- [x] implement basic configuration of express server
- [x] Define the core
- [x] first implementation whit mock data
- [x] implement whit mongodb

### optional

- [x] enable login
- [x] create endpoint to update an apartment
- [x] enable login
- [x] integration test
- [x] console runner, seed and restore
- [x] mongoose implementation

for mongoose issue you need change the environment variable `USE_MONGOOSE` to true
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### In Addition

For this exercise I decided to create a new script in repo `create-folder-dev.sh` because in UNIX-SYSTEMS we need to create a folder for DB manually, the script only create the folder when the folder don't exists.

Also I change the behavior of index of console-runner, reading the files in folder and listing in CLI menu 
 
See the [open issues](https://github.com/adriel87/Api-rest-airbnb-mongo/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->


<!-- CONTACT -->
## Contact

Adriel Arocha Oronoz - [@AdrielOronoz](https://twitter.com/AdrielOronoz) - adrielarochaoronoz@gmail.com

Project Link: [Api-rest-airbnb-mongo](https://github.com/adriel87/Api-rest-airbnb-mongo)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments



* [LemonCode](https://lemoncode.net/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Node.js]: https://img.shields.io/badge/node.js-2fc448?style=for-the-badge&logo=nodedotjs&logoColor=white
[Express.js]: https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=expressdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 

[nodejs-url]: https://nodejs.org
[express-url]: https://expressjs.com
