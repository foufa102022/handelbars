const express = require('express');
const puppeteer = require('puppeteer');
const engine = require('express-handlebars').engine;




const app = express();
app.use("/public",express.static(__dirname+"/public"));
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('views','/views');

app.get('/', (req, res) => {
    res.render('home');
  });
  

  app.get('/search', async (req, res) => {
      const searchQuery = req.query.q; 
      const browser = await puppeteer.launch();
      try{
      const page = await browser.newPage();
      await page.goto("https://www.amazon.com/s?k=" + searchQuery);
      await page.type("#twotabsearchtextbox", searchQuery{
        delay: 500
      }); //Control keypress est l’intervalle de chaque entrée de lettre

      await page.tap("#searchQuery");  

   await page.waitFor(2000);

   await browser.close();
      }
      catch (error) {
        console.log("error\n", error);
        process.exit(0);
       }
      
      });
      res.render('search', { amazonSearchArray });
  



app.listen(3000, () => {
    console.log('Le serveur Express écoute sur le port 3000.');
  });
