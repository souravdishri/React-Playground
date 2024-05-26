import express from "express";

const app = express();

const port = process.env.PORT || 3000;

app.get('/api/products', (req, res) =>{
    const products = [
        {
            id: 1,
            name: "table wooden",
            price: "200",
        },        {
            id: 2,
            name: "table grass",
            price: "250",
        },
        {
            id: 3,
            name: "table glass",
            price: "300",
        },
        {
            id: 4,
            name: "table fiber",
            price: "100",
        },
        {
            id: 5,
            name: "table silver",
            price: "2000",
        },
    ];
//http://localhost:3000/api/products?search=metal

if (req.query.search) {
    const filterProducts = products.filter(product => product.name.includes(req.query.search))
    res.send(filterProducts)
    return         //used here otherwise application will crash
}

    setTimeout(() => {
        res.send(products);
    }, 3000);
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});