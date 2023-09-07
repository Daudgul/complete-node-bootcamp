const fs = require('fs');
const http = require('http')
const url = require('url')

const slugify = require('slugify')

const replaceTemplate = require('./modules/replaceTemplate');
//this is updated code

// fs and http called modules which we used to make calls


// FILE

// Blocking, Sunchronous

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)

// const textOut = `This is what we know about the avocado: ${textIn}./nCreated on ${Date.now()}`;clear
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('File written')

// NoN-Blocking, asynchronous way

// fs.readFile('./txt/start.txt','utf-8', (err,data1) => {
//     fs.readFile(`./txt/${data1}.txt` ,'utf-8', (err,data2) => {
//         console.log(data2);

//         fs.writeFile('./txt/final.txt', `${data1} ${data2}`, 'utf-8', err => {
//             console.log('Your file has been written')
//         } )
//       })
// })
// console.log('Will read file!')

////////////////////////////
// SERVER   


    // const replaceTemplate = (temp, product) => {
    //     let output = temp;
    //     output= output.replace(/{%PRODUCTNAME%}/g, product.productName);
    //     output = output.replace(/{%IMAGE%}/g, product.image);
    //     output = output.replace(/{%PRICE%}/g, product.price);
    //     output = output.replace(/{%FROM%}/g, product.from);
    //     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    //     output = output.replace(/{%QUANTITY%}/g, product.quantity);
    //     output = output.replace(/{%DESCRIPTION%}/g, product.description);
    //     output = output.replace(/{%ID%}/g, product.id);
        

    //     if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    //     return output
    // }

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

//WE ARE PUTING THE DATA TOP OF THE SCOPE BECAUSE IT WILL CALL ONLY ONE TIME 

const data =  fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

// const slugs = productData.map(el => slugify(el.productName, {lower: true}))

const server = http.createServer((req, res) => {
    const { query, pathname} = url.parse(req.url, true);


    // Overview page
    if(pathname === '/' || pathname === 'overview'){

        res.writeHead(200,{'Content-type': 'text/html'});

        const cardsHtml = productData.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

        res.end(output);

        // Product page
    }else if (pathname === '/product'){
        res.writeHead(200, {'Content-type': 'text/html'})
        const product = productData[query.id];
        const output = replaceTemplate(tempProduct, product)
       
        res.end(output)

        // API page
    }else if(pathname === '/api'){
        // THIS WAS THE ASYNCHRONOUS WAY TO FETCH THE DATA

        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {            
        //     const productData = JSON.parse(data);
        //     res.writeHead(200,{'Content-type': 'application/json'});
        //     res.end(data)
        // })

        //HERE IS THE SYNCHRONOUS WAY

             res.writeHead(200,{'Content-type': 'application/json'});
            res.end(data)

    }else{
        res.writeHead(404,{
        'Content-type': 'text/html',
        'my-own-header': "hello-world"
        });
        res.end(`<h1 style="text-align: center;">Page not found!</h1>`)
    }
})

// for localhost we call 127.0.0.1 to call in our laptop or masheen 

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})
