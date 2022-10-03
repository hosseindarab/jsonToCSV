const axios = require('axios');
const { parse } = require('json2csv');

const sendGetRequest = async () => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${process.env.AUTH}` }
        };

        // const bodyParameters = {
        //    key: "value"
        // };
        const resp = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json', config);
        console.log(resp.data);
        var json = [resp.data]
        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const csvWriter = createCsvWriter({
            path: './csv/file.csv',
            header: [
                'rowCounter',
                'time',
                 'disclaimer',
                 'chartName',
                 'bpi'
            ],
            fieldDelimiter: ';',
        });
        const records1 = [
            { rowCounter: '1', time: new Date() }
        ];
        const records2 = [
            { rowCounter:'2',time: json[0].time.updated, disclaimer: json[0].disclaimer, chartName:json[0].chartName, chartName:json[0].bpi.USD.rate_float }
        ];

        await csvWriter.writeRecords(records1)
        await csvWriter.writeRecords(records2)    
            // returns a promise
            
        // var fields = Object.keys(json)
        // const opts = { fields };
        // const csv = parse(json, opts);
        // console.log(csv);
        // var replacer = function (key, value) { return value === null ? '' : value }
        // var csv = json.map(function (row) {
        //     return fields.map(function (fieldName) {
        //         return JSON.stringify(row[fieldName], replacer)
        //     }).join(',')
        // })
        // csv.unshift(fields.join(',')) // add header column
        // csv = csv.join('\r\n');
        // console.log(csv)
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
sendGetRequest();