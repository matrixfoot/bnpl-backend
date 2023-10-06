const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/user');
const cors = require('cors');
const isJwtExpired =require ('jwt-check-expiration');
require ('dotenv').config();
const fetch =require('node-fetch');
const userRoutes = require('./routes/user');
const compconfRoutes = require('./routes/compconf');
const communRoutes = require('./routes/communinfo');
const statisticsRoutes = require('./routes/statistics');
const reclamationRoutes = require('./routes/reclamation');
const motifreclamationRoutes = require('./routes/motifreclamation');
const habilitationRoutes = require('./routes/habilitation');

const cron = require("node-cron");
const app = express();
mongoose.connect('mongodb+srv://'+process.env.USERNAMEMONGO+':'+process.env.PASSWORDMONGO+process.env.URIMONGO,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization,x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(
    bodyParser.urlencoded({
      extended: false, limit: '50mb'
    })
  );
  app.use(async (req, res, next) => {
    try{
    if (req.headers["x-access-token"]) {
      const accessToken = req.headers["x-access-token"];
      const { userId} = await jwt.verify(accessToken, 'RANDOM_TOKEN_SECRET');
      // Check if token has expired
      res.locals.loggedInUser = await User.findById(userId);
      next();
     } else {
      next();
     }}
     catch (error) {
      res.status(415).json({ error });
    }
  });


  async function makeRequest() {
    User.find().then(
      (users) => {
        let filtredusers=users.filter((e => e.usertype=='Client'&&e.desactive.statut==false))
        console.log(filtredusers.length)
        filtredusers.forEach(async (element, key) => {
          event.find().then(
            (events) => {
              events.forEach(async (item, index) => {
                const currentdate=new Date()
                const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };

                if(`${item.date.getDate()}`==currentdate.getDate() +4&&`${item.date.getMonth()}`==currentdate.getMonth()&&`${item.date.getFullYear()}`==currentdate.getFullYear())
                {
                  if((item.nature.split(';').filter(x=>x==`${element.nature}`)).length>0||item.nature=='')
                  {
                    if((item.natureactivite.split(';').filter(x=>x==`${element.natureactivite}`)).length>0||item.natureactivite=='')
                    {
                      if((item.activite.split(';').filter(x=>x==`${element.activite}`)).length>0||item.activite=='')
                      {
                        if((item.sousactivite.split(';').filter(x=>x==`${element.sousactivite}`)).length>0||item.sousactivite=='')
                        {
                          if((item.regimefiscal.split(';').filter(x=>x==`${element.regimefiscalimpot}`)).length>0||item.regimefiscal=='')
                          {
                            const mySender = 'MACOMPTA';
                            /* const Url_str_accuse ="https://www.tunisiesms.tn/client/Api/Api.aspx?fct=dlr&key=8Xt1bBmrfe9Fuxj1tnAu9EXxNQmD9ilyxd2nzJ/ft5vUcv8d0FlnUbD/-/xkjFm6xYJgrZQib3Xq9c1qDuQfPIVaaOqRtTK9SD&msg_id=XXXX;YYYY";   */               
                             const Url_str ="https://www.tunisiesms.tn/client/Api/Api.aspx?fct=sms&key=8Xt1bBmrfe9Fuxj1tnAu9EXxNQmD9ilyxd2nzJ/ft5vUcv8d0FlnUbD/-/xkjFm6xYJgrZQib3Xq9c1qDuQfPIVaaOqRtTK9SD&mobile=216XXXXXXXX&sms=Hello+World&sender=YYYYYYY&date=jj/mm/aaaa&heure=hh:mm:ss";                  
                             const Url_str2 = Url_str.replace("Hello+World",`cher client ${item.title}: dernier délai ${item.date.toLocaleDateString(undefined, options)} `);
                             const Url_str3 = Url_str2.replace("YYYYYYY",mySender);
                             /*const Url_str_accuse1 = Url_str_accuse.replace("216XXXXXXXX",element.mobile)
                             const Url_str_accuse2 = Url_str_accuse1.replace("Hello+World",`veuillez noter que la date du ${item.date.split('T')[0]}est la date du ${item.title}`);
                             const Url_str_accuse3 = Url_str_accuse2.replace("YYYYYYY",mySender);
                             const Url_str_accuse4 = Url_str_accuse3.replace("jj/mm/aaaa",myDate);
                             const Url_str_accuse5 = Url_str_accuse4.replace("hh:mm:ss",myTime);
                             const finalurlaccuse=Url_str_accuse5*/
                             /*console.log(finalurlaccuse);*/
                                   const Url_str1 = Url_str3.replace("216XXXXXXXX",element.mobile)
                                   const finalurl=Url_str1
                                  
                                   const response = await fetch(finalurl);
                                   /*const response2 = await fetch(finalurl);*/
                                  console.log('status code: ', response.status); // 👉️ 200
                                   if (!response.ok) {
                                     throw new Error(`Error! status: ${response.status}`);
                                   }
                          }

                        }
                      }

                    }
                  }
            
                  
                }
                
                 }) 
            }
          ).catch(
            (error) => {
              console.log(error)
              });
          
         })
      }
    ).catch(
      (error) => {
        console.log(error)
        });   
  }
     // makeRequest();

 /*cron.schedule('0 30 09 * * *', () => {
      makeRequest();
 });*/
 app.use('/api/users', userRoutes);
 app.use('/api/compconfs', compconfRoutes);
 app.use('/api/reclamations', reclamationRoutes);
 app.use('/api/motifreclamation', motifreclamationRoutes);
 app.use('/api/habilitation', habilitationRoutes);

 app.use('/api/commun', communRoutes);
 app.use('/iisnode',statisticsRoutes, express.static(path.join(__dirname, 'iisnode')));
 app.use(express.static(path.join(__dirname, 'fichiers')));
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'fichiers'));
  })
module.exports = app;