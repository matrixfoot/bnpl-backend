const Compconf = require('../models/conf137');
const Workgab = require('../models/workgab');
const Workpos = require('../models/workpos');
const Worksms = require('../models/worksms');
const CryptoJS = require("crypto-js");

const fetch =require('node-fetch');
const User = require('../models/user');
/* Fetch all compconf */
exports.getcompconf = async (req, res, next) => {
  await Compconf.find().then(
    (files) => {
      res.status(200).json(files);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
/*insert many Relations*/
exports.createcompconf = async (req, res, next) => {   
 
    const origin =req.get('origin');
    let datas=req.body 
    datas.forEach(element => {
      let ciphertext = CryptoJS.AES.encrypt(element.CARDHOLDERNUMBER, '****************').toString();
      element.CARDHOLDERNUMBER = ciphertext
    });
    await Compconf.insertMany(datas)
      res.status(200).json({
        data: null,
        message: 'compconf ajoutée avec succès'
      })
}
/* Delete single compconf */
exports.deletecompconfbyid = async (req, res, next) => {
  
    const id = req.params.id;
    const compconf = await Compconf.findById(id);
    if (!compconf) return res.status(401).json({ error: 'Demande non trouvé !' });
    await Compconf.findByIdAndDelete(id);

    res.status(200).json({
      data: null,
      message: 'compconf supprimée avec succès'
    });
 
}
exports.getcompconfbyid = (req, res, next) => {
    Compconf.findOne({
      _id: req.params.id
    }).then(
      (compconf) => {
        res.status(200).json(compconf);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  } 
exports.updatecompconf =async  (req, res, next) => {
    try { 
        const compconfObject = req.file ?
          {
            ...JSON.parse(req.body.compconf),
            ficheUrl: `${req.file.url}`
          } : { ...req.body };
        const _id = req.params.id;
        const compconf =  await Compconf.findById(_id);
        
        await Compconf.findByIdAndUpdate(_id, { ...compconfObject});
            
        compconf.updated = Date.now();
         await compconf.save().
        then (()=> res.status(200).json({
          data: compconf,
          message: 'compconf modifié !'
        }))
        .catch(error => res.status(400).json({ error , message: 'opération non aboutie veuillez réessayer'}));
        
      } catch (error) {
        res.status(404).json({ error });
      }
  }
  exports.deletecompconfs = async (req, res, next) => {
    try {
      
      await Compconf.deleteMany();
  
      res.status(200).json({
        data: null,
        message: 'tous les fichiers compconf sont supprimés avec succès'
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }


  //workgab
  /* Fetch all compconf */
exports.getWorkgab = async (req, res, next) => {
  await Workgab.find().then(
    (files) => {
      res.status(200).json(files);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
/*insert many Relations*/
exports.createWorkgab = async (req, res, next) => {   
  try
  {
    const origin =req.get('origin');
    let datas=req.body 
    datas.forEach(element => {
      let ciphertext = CryptoJS.AES.encrypt(element.CARDHOLDERNUMBER, '****************').toString();
      element.CARDHOLDERNUMBER = ciphertext
    });
    await Workgab.insertMany(datas)
      res.status(200).json({
        data: null,
        message: 'Workgab ajoutée avec succès'
      })
  }
catch (error) {
  res.status(400).json({ error });
}
}
/* Delete single Workgab */
exports.deleteWorkgabbyid = async (req, res, next) => {
  
    const id = req.params.id;
    const Workgab = await Workgab.findById(id);
    if (!Workgab) return res.status(401).json({ error: 'Demande non trouvé !' });
    await Workgab.findByIdAndDelete(id);

    res.status(200).json({
      data: null,
      message: 'Workgab supprimée avec succès'
    });
 
}
exports.getWorkgabbyid = (req, res, next) => {
    Workgab.findOne({
      _id: req.params.id
    }).then(
      (Workgab) => {
        res.status(200).json(Workgab);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  } 
exports.updateWorkgab =async  (req, res, next) => {
    try { 
        const WorkgabObject = req.file ?
          {
            ...JSON.parse(req.body.Workgab),
            ficheUrl: `${req.file.url}`
          } : { ...req.body };
        const _id = req.params.id;
        const Workgab =  await Workgab.findById(_id);
        
        await Workgab.findByIdAndUpdate(_id, { ...WorkgabObject});
            
        Workgab.updated = Date.now();
         await Workgab.save().
        then (()=> res.status(200).json({
          data: Workgab,
          message: 'Workgab modifié !'
        }))
        .catch(error => res.status(400).json({ error , message: 'opération non aboutie veuillez réessayer'}));
        
      } catch (error) {
        res.status(404).json({ error });
      }
  }
  exports.deleteWorkgabs = async (req, res, next) => {
    try {
      
      await Workgab.deleteMany();
  
      res.status(200).json({
        data: null,
        message: 'tous les fichiers Workgab sont supprimés avec succès'
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  //workpos
  /* Fetch all Workpos */
exports.getWorkpos = async (req, res, next) => {
  await Workpos.find().then(
    (files) => {
      res.status(200).json(files);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
/*insert many Relations*/
exports.createWorkpos = async (req, res, next) => {   
  try
  {
    const origin =req.get('origin');
    let datas=req.body 
    datas.forEach(element => {
      let ciphertext = CryptoJS.AES.encrypt(element.CARDHOLDERNUMBER, '****************').toString();
      element.CARDHOLDERNUMBER = ciphertext
    });
    await Workpos.insertMany(datas)
      res.status(200).json({
        data: null,
        message: 'Workpos ajoutée avec succès'
      })
  }
catch (error) {
  res.status(400).json({ error });
}
}
/* Delete single Workpos */
exports.deleteWorkposbyid = async (req, res, next) => {
  
    const id = req.params.id;
    const Workpos = await Workpos.findById(id);
    if (!Workpos) return res.status(401).json({ error: 'Demande non trouvé !' });
    await Workpos.findByIdAndDelete(id);

    res.status(200).json({
      data: null,
      message: 'Workpos supprimée avec succès'
    });
 
}
exports.getWorkposbyid = (req, res, next) => {
    Workpos.findOne({
      _id: req.params.id
    }).then(
      (Workpos) => {
        res.status(200).json(Workpos);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  } 
exports.updateWorkpos =async  (req, res, next) => {
    try { 
        const WorkposObject = req.file ?
          {
            ...JSON.parse(req.body.Workpos),
            ficheUrl: `${req.file.url}`
          } : { ...req.body };
        const _id = req.params.id;
        const Workpos =  await Workpos.findById(_id);
        
        await Workpos.findByIdAndUpdate(_id, { ...WorkposObject});
            
        Workpos.updated = Date.now();
         await Workpos.save().
        then (()=> res.status(200).json({
          data: Workpos,
          message: 'Workpos modifié !'
        }))
        .catch(error => res.status(400).json({ error , message: 'opération non aboutie veuillez réessayer'}));
        
      } catch (error) {
        res.status(404).json({ error });
      }
  }
  exports.deleteWorkposs = async (req, res, next) => {
    try {
      
      await Workpos.deleteMany();
  
      res.status(200).json({
        data: null,
        message: 'tous les fichiers Workpos sont supprimés avec succès'
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }


  //worksms
  /* Fetch all Worksms */
exports.getWorksms = async (req, res, next) => {
  await Worksms.find().then(
    (files) => {
      res.status(200).json(files);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
/*insert many Relations*/
exports.createWorksms = async (req, res, next) => {   
  try
  {
    const origin =req.get('origin');
    let datas=req.body 
    datas.forEach(element => {
      let ciphertext = CryptoJS.AES.encrypt(element.CARDHOLDERNUMBER, '****************').toString();
      element.CARDHOLDERNUMBER = ciphertext
    });
    await Worksms.insertMany(datas)
      res.status(200).json({
        data: null,
        message: 'Worksms ajoutée avec succès'
      })
  }
catch (error) {
  res.status(400).json({ error });
}
}
/* Delete single Worksms */
exports.deleteWorksmsbyid = async (req, res, next) => {
  
    const id = req.params.id;
    const Worksms = await Worksms.findById(id);
    if (!Worksms) return res.status(401).json({ error: 'Demande non trouvé !' });
    await Worksms.findByIdAndDelete(id);

    res.status(200).json({
      data: null,
      message: 'Worksms supprimée avec succès'
    });
 
}
exports.getWorksmsbyid = (req, res, next) => {
    Worksms.findOne({
      _id: req.params.id
    }).then(
      (Worksms) => {
        res.status(200).json(Worksms);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  } 
exports.updateWorksms =async  (req, res, next) => {
    try { 
        const WorksmsObject = req.file ?
          {
            ...JSON.parse(req.body.Worksms),
            ficheUrl: `${req.file.url}`
          } : { ...req.body };
        const _id = req.params.id;
        const Worksms =  await Worksms.findById(_id);
        
        await Worksms.findByIdAndUpdate(_id, { ...WorksmsObject});
            
        Worksms.updated = Date.now();
         await Worksms.save().
        then (()=> res.status(200).json({
          data: Worksms,
          message: 'Worksms modifié !'
        }))
        .catch(error => res.status(400).json({ error , message: 'opération non aboutie veuillez réessayer'}));
        
      } catch (error) {
        res.status(404).json({ error });
      }
  }
  exports.deleteWorksmss = async (req, res, next) => {
    try {
      
      await Worksms.deleteMany();
  
      res.status(200).json({
        data: null,
        message: 'tous les fichiers Worksms sont supprimés avec succès'
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }