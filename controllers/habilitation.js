const Habilitation = require('../models/habilitation');
const User = require('../models/user');
const sendEmail = require('../send-email');
exports.createhabilitation = async (req, res, next) => {  
    const origin =req.get('origin');    
    const newHabilitation = new Habilitation({...req.body});   
    const {userId} = req.body
    /*const{mois}=req.body.mois
    const{annee}=req.body.mois*/
   /* Habilitation.find({userId,annee,mois}).then(
      (decfiscmens) => {
        if (decfiscmens.length>0) {
          return (res.status(300).json({ error: 'déclaration pour ce mois et cette année existe déjà! vous pouvez par ailleurs la modifier à travers votre tableau de bord' }),console.log(decfiscmens))      
        } 
      }
    )*/
    const user = await User.findById(userId);
     (newHabilitation.save()/*,sendconfirmemail(user.email,user.clientcode,user.firstname,user.lastname,origin),sendcreationemail(origin,'macompta@macompta.com.tn',user.clientcode,user.firstname,user.lastname,user.email,newDecfiscmens._id)*/).
      then (()=>res.status(200).json({
        data: newHabilitation,
        message: "Votre habilitation a été crée avec succès"
      }))     
      .catch(error => res.status(400).json({ error }));  
}

exports.gethabilitations = (req, res, next) => {
    Habilitation.find().then(
    (habilitationss) => {
      res.status(200).json(habilitationss);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deletehabilitations = async (req, res, next) => {
  try {
    const id = req.params.id;
    const habilitation = await Habilitation.findById(id);
    if (!habilitation) return res.status(401).json({ error: 'habilitation non trouvé !' });
    await Habilitation.findByIdAndDelete(id);

    res.status(200).json({
      data: null,
      message: 'habilitation supprimé avec succès'
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

exports.deletehabilitationss = async (req, res, next) => {
  try { 
    await Habilitation.deleteMany();
    res.status(200).json({
      data: null,
      message: 'tous les habilitations sont supprimés avec succès'
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

exports.gethabilitationbyid = (req, res, next) => {
  
  Habilitation.findOne({
    _id: req.params.id
  }).then(
    (habilitation) => {
    if (res.locals.loggedInUser._id != habilitation.userId&&req.user.role!='admin'&&req.user.role!='supervisor')
  {
return res.status(401).json({error: 'vous n\'avez pas la permission d\'éxécuter cette action'})
  }
      res.status(200).json(habilitation);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );  
};
exports.gethabilitation = (req, res, next) => {
  const {userId} = req.body
  Habilitation.find({userId}).then(
    (habilitation) => {
      res.status(200).json(habilitation);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

/*exports.getdecfiscmensmoisannee = (req, res, next) => {
  const {userId,annee,mois,source} = req.body
  Decfiscmens.find({userId,annee,mois,source}).then(
    (decfiscmens) => {
      res.status(200).json(decfiscmens);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};*/

exports.updatehabilitation = async (req, res, next) => {
  try {
    const origin =req.get('origin'); 
    const habilitationObject = req.file ?
      {
        ...JSON.parse(req.body.habilitation), 
        ficheUrl: `https://${req.get('host')}/fichiers/${req.file.filename}`
      } : { ...req.body };    
    const _id = req.params.id;
    const habilitation = await Habilitation.findById(_id); 
    const user = await User.findById(habilitation.userId);
        await Habilitation.findByIdAndUpdate(_id, { ...habilitationObject});
        const updatedhabilitation = await Habilitation.findById(_id);    
        habilitation.updated = Date.now();
    
        await (habilitation.save()/*,sendupdateemail(user.email,user.clientcode,user.firstname,user.lastname, origin),sendmodificationemailadmin(origin,'macompta@macompta.com.tn',user.email,user.clientcode,user.firstname,user.lastname,decfiscmens._id)*/).
        then (()=> res.status(200).json({
          data: updatedhabilitation,
          message: 'motif réclamation modifée!'
        }))
        .catch(error => res.status(400).json({ error , message: 'opération non aboutie veuillez réessayer'}));   
    }
  catch (error) {
    res.status(404).json({ error });
  }  
}
/*exports.completedecfiscmens = async (req, res, next) => {
 
  try {
    const origin =req.get('origin');
    
    const decfiscmensObject = req.file ?
      {
        ...JSON.parse(req.body.decfiscmens), 
        ficheUrl: `${req.file.url}`
      } : { ...req.body };
     
    const _id = req.params.id;
    const decfiscmens = await Decfiscmens.findById(_id);
    
    const user = await User.findById(decfiscmens.userId);
    if (res.locals.loggedInUser._id != decfiscmens.userId&&req.user.role!='admin'&&req.user.role!='supervisor')
  {
return res.status(401).json({error: 'vous n\'avez pas la permission d\'éxécuter cette action'})
  }
        await Decfiscmens.findByIdAndUpdate(_id, { ...decfiscmensObject});
        
    decfiscmens.updated = Date.now();
    await (decfiscmens.save(),sendmodificationemailadmincollab(origin,'macompta@macompta.com.tn',user.email,res.locals.loggedInUser.firstname,user.clientcode,user.firstname,user.lastname,decfiscmens._id)).
    then (()=> res.status(200).json({
      data: decfiscmens,
      message: 'déclaration modifée!'
    }))
    .catch(error => res.status(400).json({ error , message: 'opération non aboutie veuillez réessayer'}));
  }
  catch (error) {
    res.status(404).json({ error });
  } 
  
}*/


 /* async function sendupdateemail(sendemail,code,prenom,nom, origin) {
    let message;
    if (origin) {
        const updatedecfiscmensUrl = `${origin}/user-board`;
        message = `<p>Cher client,</p> 
        <p>Prénom:${prenom}</p>
        <p>Nom:${nom}</p>
        <p>Code:${code}</p>
        <p>Vos données de déclaration fiscale ont été définitivement traitées, veuillez vous connecter pour l'éditer</p>
        <p>Cordialement.</p>           
                   <p><a href="${updatedecfiscmensUrl}"style="font-size: 20px;">${updatedecfiscmensUrl}</a></p>`;
    } else {
        message = `<p>Veuillez contacter votre cabinet pour débloquer la situation</p>
                   <p><code>${`${origin}/home/contact#contactid`}</code></p>`;
    }
  
    await sendEmail({
        to: sendemail,
        subject: 'Fin de traitement de votre déclaration fiscale',
        html: `<p>Merci pour l'intérêt que vous accordez au cabinet!</p>
               ${message}`
    });
  }
 
  async function sendconfirmemail(sendemail,code,prenom,nom, origin) {
    let message;
    if (origin) {
        const verifydecfiscmensUrl = `${origin}/user-board`;
        message = `<p>Cher client,</p> 
        <p>Prénom:${prenom}</p>
        <p>Nom:${nom}</p>
        <p>Code:${code}</p>
        <p>Vos données de déclaration fiscale ont été reçues avec succès, vous pouvez toujours vous connecter pour savoir l'état d'avancement de son traitement.Nous vous informerons dès que votre déclaration sera définitivement traitée et contrôlée</p>
        <p>Cordialement.</p>           
        <p><a href="${verifydecfiscmensUrl}"style="font-size: 20px;">${verifydecfiscmensUrl}</a></p>`;
    } else {
        message = `<p>Veuillez contacter votre cabinet pour débloquer la situation</p>
                   <p><code>${`${origin}/home/contact`}</code></p>`;
    }
  
    await sendEmail({
        to: sendemail,
        subject: 'confirmation de la réception des données de déclaration',
        html: `<p>Merci pour l'intérêt que vous accordez au cabinet!</p>
               ${message}`
    });
  }
  //sendcreationemail('macompta@macompta.com.tn',user.clientcode,user.firstname,user.lastname,user.email,newDecfiscmens._id, origin)
  async function sendcreationemail(origin,sendemail,code,prenom,nom,email,id) {
    let message;
    if (origin) {
        const verifydecfiscmensUrl = `${origin}/view-decfiscmens/${id}`;
        message = `<p>une déclaration fiscale a été crée avec succès par</p> 
        <p>code:${code}</p>
        <p>Prénom:${prenom}</p>
        <p>Nom:${nom}</p>
        <p>email:${email}</p>
        <p>veuillez la consulter pour traitement</p>
                   <p><a href="${verifydecfiscmensUrl}"style="font-size: 20px;">${verifydecfiscmensUrl}</a></p>
                   <p>Cher client,</p> 
        <p>Prénom:${prenom}</p>
        <p>Nom:${nom}</p>
        <p>Code:${code}</p>
        <p>Vos données de déclaration fiscale ont été reçues avec succès, vous pouvez toujours vous connecter pour savoir l'état d'avancement de son traitement.Nous vous informerons dès que votre déclaration sera définitivement traitée et contrôlée</p>
        <p>Cordialement.</p> `;
    } else {
        message = `<p>Veuillez contacter votre cabinet pour débloquer la situation</p>
                   <p><code>${`${origin}/home/contact`}</code></p>`;
    }
  
    await sendEmail({
        to: sendemail,
        subject: 'réception des données de déclaration fiscale',
        html: `${message}`
    });
  }
  //sendmodificationemailadmin('macompta@macompta.com.tn',user.email,user.clientcode,user.firstname,user.lastname,decfiscmens._id, origin)
  async function sendmodificationemailadmin(origin,sendemail,email,code,prenom,nom,id) {
    let message;
    if (origin) {
        const verifydecfiscmensUrl = `${origin}/view-decfiscmens/${id}`;
        message = `<p>le statut de la déclaration fiscale du client</p>
        <p>code:${code}</p>
        <p>Prénom:${prenom}</p>
        <p>Nom:${nom}</p>
        <p>email:${email}</p>
        <p>a été modifié suite à un traitement, veuillez la consulter pour décider le sort de la déclaration</p>
        
                   <p><a href="${verifydecfiscmensUrl}">${verifydecfiscmensUrl}</a></p>
                   <p>Cher client,</p> 
        <p>Prénom:${prenom}</p>
        <p>Nom:${nom}</p>
        <p>Code:${code}</p>
        <p>Vos données de déclaration ont été définitivement traitées, veuillez vous connecter pour l'éditer</p>
        <p>Cordialement.</p>`;
    } else {
        message = `<p>Veuillez contacter votre cabinet pour débloquer la situation</p>
                   <p><code>${`${origin}/home/contact`}</code></p>`;
    }
  
    await sendEmail({
        to: sendemail,
        subject: 'suivi de déclaration fiscale',
        html: `${message}`
    });
  }
  async function sendmodificationemailadmincollab(origin,sendemail,email,collemail,code,prenom,nom,id) {
    let message;
    if (origin) {
        const verifydecfiscmensUrl = `${origin}/view-decfiscmens/${id}`;
        message = `<p>le statut de la déclaration fiscale du client</p>
        <p>code:${code}</p>
        <p>Prénom:${prenom}</p>
        <p>Nom:${nom}</p>
        <p>email:${email}</p>
        <p>traité par:${collemail}</p>
        <p>a été modifié suite à un traitement, veuillez la consulter pour décider le sort de la déclaration</p>
        
                   <p><a href="${verifydecfiscmensUrl}"style="font-size: 20px;">${verifydecfiscmensUrl}</a></p>`;
    } else {
        message = `<p>Veuillez contacter votre cabinet pour débloquer la situation</p>
                   <p><code>${`${origin}/home/contact`}</code></p>`;
    }
  
    await sendEmail({
        to: sendemail,
        subject: 'suivi de déclaration fiscale',
        html: `${message}`
    });
  }*/