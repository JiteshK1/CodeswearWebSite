import { rejects } from 'assert';
import { resolve } from 'path';

const https = require('https');
/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
const PaytmChecksum = require('paytmchecksum');

export default async function handler(req, res) {

  if (req.method == 'POST') {

    var paytmParams = {};

    paytmParams.body = {
      "requestType": "Payment",
      "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
      "websiteName": "WEBSTAGING",
      "orderId": req.body.oId,
      "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      "txnAmount": {
        "value": req.body.subTotal,
        "currency": "INR",
      },
      "userInfo": {
        "custId": req.body.email,
      },
    };

    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */



    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_MKEY)

      paytmParams.head = {
        "signature": checksum
      };

      var post_data = JSON.stringify(paytmParams);

      const requestAsync = async() => {
        return new Promise((resolve, reject) => {

          var options = {

            /* for Staging */
            hostname: 'securegw-stage.paytm.in',

            /* for Production */
            // hostname: 'securegw.paytm.in',

            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oId}`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': post_data.length
            }
          };

          var response = "";
          var post_req = https.request(options, function (post_res) {
            post_res.on('data', function (chunk) {
              response += chunk;
            });

            post_res.on('end', function () {
              console.log('Response: ', response);
              resolve(JSON.parse(response).body)
            });
          });

          post_req.write(post_data);
          post_req.end();

        })
      }

      let myr = await requestAsync()
      res.status(200).json(myr)
  }
}