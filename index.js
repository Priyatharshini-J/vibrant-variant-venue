import express from 'express'
import catalyst from "zcatalyst-sdk-node";

const app = express();
app.use(express.json());


let mainPort = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 4000;
app.listen(mainPort, async (err) => {
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log("listening");
})

app.get("/getProducts", async (req, res) => {
    try {
        const catalystApp = catalyst.initialize(req);
        const rowPromise = await catalystApp.datastore().table('vibrantProducts').getPagedRows();
        res.status(200).send(rowPromise.data);
    } catch (err) {
        console.log("Error in getProperties >>> " + err);
        res.status(500).send({
            message: "Internal Server Error in Getting User Details. Please try again after sometime.",
            error: err,
        });
    }
})

app.get("/product/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const catalystApp = catalyst.initialize(req);
        const query = `Select * from vibrantProducts where id = '${id}'`;
        let result = await catalystApp.zcql().executeZCQLQuery(query);
        res.status(200).send(result[0]['vibrantProducts']);
    } catch (err) {
        console.log("Error in getVibrantProducts >>> " + err);
        res.status(500).send({
            message: "Internal Server Error in Getting User Details. Please try again after sometime.",
            error: err,
        });
    }
});

app.post("/checkout", async (req, res) => {
    try {
        const catalystApp = catalyst.initialize(req);
        const { orders, address, total, phone, userId } = req.body;
        const catalystTable = catalystApp.datastore().table("vibrantOrders");
        const response = await catalystTable.insertRow({
            Orders: orders,
            Address: address,
            Total: total,
            Phone: phone,
            userId
        });
        res.status(200).send({ message: `Order placed successfully.`, orderId: response.ROWID });
    } catch (err) {
        console.log(`Error in checkout >>> ` + err);
        res.status(500).send({
            message: "Internal Server Error. Please try again after sometime.",
            error: err
        });
    }
});

app.get("/getOrders/:userId", async (req, res) => {
    try {
        const catalystApp = catalyst.initialize(req);
        const userId = req.params.userId;
        let query = `Select * from vibrantOrders where vibrantOrders.userId = ${userId}`;
        let result = await catalystApp.zcql().executeZCQLQuery(query);
        let ordersArray = [];
        for (let i = 0; i < result.length; i++) {
            let orderData = result[i]['vibrantOrders'];
            ordersArray.push(orderData);
        }
        res.status(200).json({ data: ordersArray });
    } catch (err) {
        console.log(`Error in checkout >>> ` + err);
        res.status(500).send({
            message: "Internal Server Error. Please try again after sometime.",
            error: err
        });
    }
});
