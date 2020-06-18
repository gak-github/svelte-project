###Description
It is a full stack web application built on svelte, express (serverless-http), and mongodb. It is hosted on netlify [https://agurusamy-svelte.netlify.app](https://agurusamy-svelte.netlify.app).

####Local Setup
1- Since this app uses serverless function, to simulate the netlify lambda, it is required to install nelify-cli.
```
npm install netlify-cli -g
```
2- Clone this repo
```
git clone https://github.com/gak-github/svelte-project.git
npm install
```
3- Run and Test
```
npm run build
ntl dev  # or netlify dev
```

4- Access the page
```
http://localhost:8888
```

5- Note
For some reason the port 5000 is already in use then please kill and then do "ntl dev". Other wise use the below command to kill the process which uses port 5000. If you don't want to kill then use whatever the port shown in the server console.
```
kill $(lsof -t -i:5000)
ntl dev
# or
http://localhost:<port> # port shown in the console
```

