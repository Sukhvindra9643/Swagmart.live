const express = require( 'express' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".
 */
const router = express.Router();
const Insta = require('instamojo-nodejs');
const url = require('url');

// /api/bid/pay
router.post( '/pay', ( req, res ) => {
	// Insta.setKeys('test_74b5c34aa4bf0b53e8e111ad7b8', 'test_3678620a86439dda39bd96558b2');
	Insta.setKeys('7c4c547c97c6c877c84d8a05bf95cf01', '1aeff8aa7d64fce0f3c5c731926d0d6b');

	const data = new Insta.PaymentData();
	// Insta.isSandboxMode(true);


	data.purpose =  req.body.purpose;
	data.amount = req.body.amount;
	data.buyer_name =  req.body.buyer_name;
	data.redirect_url =  req.body.redirect_url;
	data.email =  req.body.email;
	data.phone =  req.body.phone;
	data.send_email =  true;
	data.webhook= 'http://www.example.com/webhook/';
	data.send_sms= true;
	data.allow_repeated_payments =  false;

	
	Insta.createPayment(data, function(error, response) {
		if (error) {
			// some error
		} else {
			// Payment redirection link at response.payment_request.longurl
			const responseData = JSON.parse( response );
			const redirectUrl = responseData.payment_request.longurl;
			res.status( 200 ).json( redirectUrl );
		}
	});

} );


/**
 * @route GET api/bid/callback/
 * @desc Call back url for instamojo
 * @access public
 */
router.get( '/callback/', ( req, res ) => {
	let url_parts = url.parse( req.url, true),
	responseData = url_parts.query;

	if ( responseData.payment_id ) {
		return res.redirect('http://localhost:4000/payment-complete' );
	}
} );

// We export the router so that the server.js file can pick it up
module.exports = router;