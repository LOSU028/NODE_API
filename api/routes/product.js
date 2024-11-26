const express = require("express");
const { addProduct, updateProduct, deleteProduct, getAllProducts, getProduct } = require("../handlers/product-handler");
const router = express.Router();

router.post("/", async (req,res)=>{
    let model = req.body;
    let product = await addProduct(model);
    res.send(product);
});

router.get("", async (req,res) => {
    let products = await getAllProducts();
    res.send(products);
})

router.get("/:id", async (req,res) => {
    let id = req.params['id'];
    let result = await getProduct(id);
    res.setHeader('content-type', 'text/plain');
    res.send(JSON.stringify({result}));
})

router.put("/:id", async (req,res)=>{
    let model = req.body;
    let id = req.params['id'];
    let product = await updateProduct(id, model);
    res.send({ message: "updated"});
});

router.delete("/:id", async (req,res) => {
    let id = req.params['id'];
    await deleteProduct(id);
    res.send({message: "deleted"})
})

module.exports = router;