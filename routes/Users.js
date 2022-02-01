const express = require('express')
const router = express.Router()
const User = require('../models/users')
const Lot = require('../models/lot')
const upload = require('../middleware/upload')
const users = require('../models/users')
// Getting All
router.get('/show/all/', async (req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})


//Getting One
router.get('/show/one/:id',getUser,(req,res) => {
res.json(res.user)
})

//Login 
router.post('/login', async(req,res) => {
    try{
        const  user = await User.findOne({ email : req.body.email })
        if(user.email == req.body.email)
        {
            return res.json(user)
        } 
        else
        return res.json(null)
    }catch(err)
    {
        return res.json(null)
    }
    
})

//Creating One
router.post('/register', async (req,res) => {
    console.log(req)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
  

    try {
        const  userl = await User.find({ email : req.body.email })
      if(userl.email != user.email){
        const newUser = await user.save()
        var DataJSON = {
            'id': newUser.id,
            'name': newUser.name,
            'email': newUser.email,
            'password': newUser.password,
            'picture': newUser.picture
        } 
        res.json(newUser)
  } 
//else{ res.json(null)}

}
    
    
    
    catch (err)
     {
        res.json({ message: err.message })
     } 
})



// Update One 
router.put('/update/:id',getUser, async (req,res) => {console.log(req.body.name)
    let user= await User.findById(req.params.id) 
    let updateData = {
        name: req.body.name,
        email: req.body.email
      //  picture: req.body.picture

    }
    User.findByIdAndUpdate(user,{$set:updateData})
    .then(
        ()=>{
            res.json({
                message : "update success"
            })
        } )

        .catch(
           error =>{
               res.json({
                   message : "an Error has accured"
               })
           } )
})




//Delete One
router.delete('delete/:id',getUser, async (req,res) => {
try{
    res.user.remove()
    res.json(res.user)

}catch(err){
    res.json({ message: err.message })
}
})

/*async function getUser(req, res, next){
    let user
    try{
            user = await User.findById(req.params.id)
           if(user == null)
           {
               return res.json(null)
           } 
    }catch(err)
    {
        return res.json({message: err.message})
    }
    res.user = user
    next()
}*/
async function getUser(req, res, next){
    let user
    try{
            user = await User.findById(req.params.id)
           if(user == null)
           {
               return res.json(null)
           } 
    }catch(err)
    {
        return res.json({message: err.message})
    }
    res.user = user
    next()
}
async function getLot(req, res, next){
    let lot
    try{
            lot = await Lot.findById(req.params.id)
           if(lot == null)
           {
               return res.json(null)
           } 
    }catch(err)
    {
        return res.json({message: err.message})
    }
    res.lot = lot
    next()
}
// upload.single('picture'),
router.put('/update/picture/:id',upload.single('picture'),getUser, async (req,res) => {
   
    let user= await User.findById(req.params.id) 
    let updateData = {
       picture:req.body.picture
      //  picture: req.body.picture

    }
    User.findByIdAndUpdate(user,{$set:updateData})
    .then(
        ()=>{
            res.json({
                message : "update success"
            })
        } )

        .catch(
           error =>{
               res.json({
                   message : "an Error has accured"
               })
   })
})





//Creating One
router.post('/lot/postuler',upload.single('picture'), async (req,res) => {
    console.log(req)
    const lot = new Lot({
        description: req.body.description,
        localisation: req.body.localisation,
        price: req.body.price,
        contact: req.body.contact,
       picture:req.body.picture
       
    })

    try {
      
        const newLot = await lot.save()
        var DataJSON = {
            'id': newLot.id,
            'description': newLot.description,
            'price': newLot.price,
            'contact': newLot.contact,
            'picture': newLot.picture,
            'localisation': newLot.localisation
           
        } 
        res.json(newLot)
}
    
    catch (err)
     {
        res.json({ message: err.message })
     } 
})

/*router.put('/lot/update/:id',getLot, async (req,res) => {
    let lot
    try {
     lot = await Lot.findById(req.params.id)
    if(req.body.localisation != null)
    {
        res.lot.localisation = req.body.localisation
    }
    if(req.body.description != null)
    {
        res.lot.description = req.body.description
    }

    //if(req.body.picture){
      //  res.lot.picture = req.body.picture
   // }
   
           const updateLot = await lot.save()
           res.json(updateLot)
    }catch(err)
    {
       res.json({ message: err.message })
    }
 })*/
 router.put('/lot/update/:id',getLot, async (req,res,next) => {
     
    
     let lot= await Lot.findById(req.params.id) 
     let updateData = {
         localisation: req.body.localisation,
         description: req.body.description
       //  picture: req.body.picture

     }
     Lot.findByIdAndUpdate(lot,{$set:updateData})
     .then(
         ()=>{
             res.json({
                 message : "update success"
             })
         } )

         .catch(
            error =>{
                res.json({
                    message : "an Error has accured"
                })
            } )
   

 })

   router.delete('/lot/delete/:id',getLot, async (req,res) => {
    try{
        res.lot.remove()
        res.json(res.lot)
    
    }catch(err){
        res.json({ message: err.message })
    }
    })
    
    
 

    router.get('/lot/show/all/', async (req,res) => {
        try {
            const lots = await Lot.find()
           // console.log(lots)
            res.json(lots)
        } catch(err) {
            res.status(500).json({ message: err.message })
        }
    })
    
    
    //Getting One
    router.get('/lot/show/one/:id',getLot,(req,res) => {
    res.json(res.lot)
    })

    router.post('/lot/search/', async (req,res) => {
     const  text = req.body.localisation
     if(text!=""){
         var lots = await Lot.find({"localisation":{"$regex":text,"$options":"i"}}).exec()
        // console.log("tlawej"+text)
        // console.log("l9it"+lots[0])
         if(lots!=undefined){
             res.status(200).send({lots})
            // res.json({lots})
         }
         else{
            res.status(400)
         } 
        // else {res.status(403)} 
     }
 })






  /*  router.put('/lot/update/:id',getLot, async (req,res,next) => {
        const lot = new Lot({
          _id: req.params.id,
          localisation: req.body.localisation,
          description: req.body.description
         
        });
        Lot.updateOne({_id: req.params.id}, lot).then(
          () => {
            res.status(201).json({
              message: 'Thing updated successfully!'
            })
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            })
          }
        )
      })*/









module.exports = router 
//module.exports ={searchLot}

