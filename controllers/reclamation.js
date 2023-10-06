const CryptoJS = require("crypto-js");
const fetch =require('node-fetch');
const User = require('../models/user');
const Reclamation = require('../models/reclamation');
/* Fetch all reclamation */
exports.getreclamations = async (req, res, next) => {
  await Reclamation.find().then(
    (reclamations) => {
      res.status(200).json(reclamations);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
exports.getReclamation = (req, res, next) => {
  const {userId} = req.body
  Reclamation.find({ userId}).then(
    (reclamation) => {
      res.status(200).json(reclamation);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
exports.createreclamation = async (req, res, next) => {  

  const origin =req.get('origin');
  const reclamationObject = req.file ?
  {
    ...JSON.parse(req.body.reclamation),
    ficheUrl: `https://${req.get('host')}/${req.file.filename}`
  } : { ...req.body };
  const newReclamation = new Reclamation({...reclamationObject}); 
   (newReclamation.save()).
    then (()=>res.status(200).json({
      data: newReclamation,
      message: "Votre réclamation a été crée avec succès"
    }))
}
exports.getreclamationbyid = (req, res, next) => {
    Reclamation.findOne({
      _id: req.params.id
    }).then(
      (data) => {
        res.status(200).json(data);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  exports.updatereclamation = async (req, res, next) => {

    const origin =req.get('origin');
    const reclamationObject = req.file ?JSON.parse(req.body.reclamation): { ...req.body };
    let changements = reclamationObject.changements
    req.file?changements[changements.length-1].ficheUrl= `https://${req.get('host')}/${req.file.filename}`:changements[changements.length-1].ficheUrl=reclamationObject.ficheUrl;
    const _id = req.params.id;
    const reclamation = await Reclamation.findById(_id);
    const user = await User.findById(reclamation.userId);
    if (res.locals.loggedInUser._id != reclamation.userId&&req.user.role!='admin'&&req.user.role!='supervisor')
  {
return res.status(401).json({error: 'vous n\'avez pas la permission d\'éxécuter cette action'})
  }
        await Reclamation.findByIdAndUpdate(_id, { ...reclamationObject}); 
        reclamation.updated = Date.now();
    await (reclamation.save()).
    then (()=> res.status(200).json({
      data: reclamation,
      message: 'reclamation modifée!'
    }))
    .catch(error => res.status(400).json({ error , message: 'opération non aboutie veuillez réessayer'}));
  }
  exports.savereclamation = async (req, res, next) => {

    const origin =req.get('origin');
    const reclamationObject = { ...req.body };
   
    const _id = req.params.id;
    const reclamation = await Reclamation.findById(_id);
    const user = await User.findById(reclamation.userId);
    if (res.locals.loggedInUser._id != reclamation.userId&&req.user.role!='admin'&&req.user.role!='supervisor')
  {
return res.status(401).json({error: 'vous n\'avez pas la permission d\'éxécuter cette action'})
  }
        await Reclamation.findByIdAndUpdate(_id, { ...reclamationObject}); 
        reclamation.updated = Date.now();
    await (reclamation.save()).
    then (()=> res.status(200).json({
      data: reclamation,
      message: 'reclamation modifée!'
    }))
    .catch(error => res.status(400).json({ error , message: 'opération non aboutie veuillez réessayer'}));
  }
  exports.deletereclamation = async (req, res, next) => {
    try {
      const id = req.params.id;
      const reclamation = await Reclamation.findById(id);
      if (!reclamation) return res.status(401).json({ error: 'Reclamation non trouvé !' });
      await Reclamation.findByIdAndDelete(id);
  
      res.status(200).json({
        data: null,
        message: 'reclamation supprimée avec succès'
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
  exports.deletereclamationss = async (req, res, next) => {
    try {
      
      await Reclamation.deleteMany();
  
      res.status(200).json({
        data: null,
        message: 'toutes les réclamations sont supprimés avec succès'
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }