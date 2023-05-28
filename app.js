const express=require('express');
const mongoose =require("mongoose")
const dotenv =require('dotenv') 
const cors =require('cors')

dotenv.config()
const app = express();
//Les cors
app.use(cors())
//BodyParser Middleware
app.use(express.json());
mongoose.set("strictQuery", false);
// Connexion à la base données
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connexion à la base de données réussie");
    }).catch(err => {
        console.log('Impossible de se connecter à la base de données', err);
        process.exit();
    });
app.get("/", (req, res) => {
    res.send("Bonjour");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on : http://127.0.0.1:${process.env.PORT}`);
});



// Router pour Categorie
const categorieRouter =require("./routes/categorie.route") 
app.use('/api/categories', categorieRouter);
// Router pour Sous Categorie
const scategorieRouter =require("./routes/scategorie.route")
app.use('/api/scategories', scategorieRouter);
//Router pour Atricle
const articleRouter =require("./routes/article.route")
app.use('/api/articles', articleRouter); 
//Router pour Users
const userRouter =require("./routes/user.route")
app.use('/api/users', userRouter); 


module.exports = {
    app,
  };