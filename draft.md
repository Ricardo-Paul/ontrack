{
	"task":{
		"title": "first task",
		"done": "false",
		"day_id": "1"
	}
}

{
	"day":{
		"chosen_date": "2020-03-02"
	}
}

User.create(name: "Ricardo Paul", email:"ricardo459@gmail.com", password:"1234567", password_confirmation:"1234567")

#Procfile.dev

web: bundle exec rails s
webpacker: ./bin/webpack-dev-server


    // "start": "node server.js",
    // "build": "npm install && npm build",
    // "deploy": "cp -a build/. public/",

	    "heroku-postbuild": "npm run webpack:deploy",

sudo kill $(sudo lsof -t -i:3000)

    // "npm": "6.13.4",
    // "node": "13.5.0"