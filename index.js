const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
  // Run your code here, after you have insured that the connection was made

  // Create new recipe, then console log the title of said recipe
    Recipe.create(myFirstRecipe);
    console.log(myFirstRecipe.title);
  })
  .then(()=> {
  // Iteration 3: Insert many recipes from data.json
    Recipe.insertMany(data);
    data.forEach(recipe => console.log(recipe.title))
  }).then( ()=> {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"}, { duration: 100 }, {new: true}).then(() => {
      console.log("Recipe updated");
    })
  }).then( () => {
    return Recipe.deleteOne({ title: "Carrot Cake"}).then(()=> {
      console.log("Deleted Carrot Cake");
    })
  })
  .then( () => {
    mongoose.connection.close(() => {
      console.log("Disconnected!");
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

let myFirstRecipe = {
  title: "My First Recipe",
  level: "Easy Peasy",
  ingredients: [
    "peanut butter", "jelly", "bread"
  ],
  cuisine: "American",
  dishType: "snack",
  duration: 5,
  creator: "Will"
}