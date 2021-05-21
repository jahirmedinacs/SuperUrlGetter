const DailySale = require('./gScholarUrl.model.js');

//Create URL
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "url content can not be empty"
        });
    }

    console.log(req.body);

    // Create a saleEntry
    const dailySale = new DailySale({
        gSearchParent : req.body.gSearchParent,
        baseUrl: req.body.baseUrl,
        fullUrl : req.body.fullUrl,

        totalIds : req.body.totalIds,
        thisId: req.body.thisId,

	    sessionName: req.body.sessionName,

        date : req.body.date
    });

    // Save saleEntry in the database
    dailySale.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while appending the url."
        });
    });
};

// // Retrieve all products from the database.
// exports.findAll = (req, res) => {
//     DailySale.find()
//     .then(dailySales => {
//         res.send(dailySales);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Something wrong while retrieving ."
//         });
//     });
// };
//
// // Find a single product with a productId
// exports.findOne = (req, res) => {
//     DailySale.find(
//         {
//             saleDate:
//                 {
//                     $gte: new Date(req.params.saleDateStart),
//                     $lte: new Date(req.params.saleDateEnd)
//                 }
//         }
//     )
//     .then(dailySales => {
//         if(!dailySales) {
//             return res.status(404).send({
//                 message: "Sale/s not found with id " + req.params.saleDate
//             });
//         }
//         res.send(dailySales);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Sale/Sales not found with in given date " + req.params.saleDate
//             });
//         }
//         return res.status(500).send({
//             message: "Something wrong retrieving sale with in given date " + req.params.saleDate
//         });
//     });
// };

// // Update a product
// exports.update = (req, res) => {
//     // Validate Request
//     if(!req.body) {
//         return res.status(400).send({
//             message: "Product content can not be empty"
//         });
//     }
//
//     // Find and update product with the request body
//     DailySale.findByIdAndUpdate(req.params.productId, {
//         title: req.body.title || "No product title",
//         description: req.body.description,
//         price: req.body.price,
//         company: req.body.company
//     }, {new: true})
//     .then(product => {
//         if(!product) {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         res.send(product);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         return res.status(500).send({
//             message: "Something wrong updating note with id " + req.params.productId
//         });
//     });
// };
//
// // Delete a note with the specified noteId in the request
// exports.delete = (req, res) => {
//     DailySale.findByIdAndRemove(req.params.productId)
//     .then(product => {
//         if(!product) {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         res.send({message: "Product deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Product not found with id " + req.params.productId
//             });
//         }
//         return res.status(500).send({
//             message: "Could not delete product with id " + req.params.productId
//         });
//     });
// };
