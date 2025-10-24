const stripeSession = require("../utility/stripeConfig");

exports.paymentController = async (req, res) => {
    try {
        const { payment_method_types, product_data, unit_amount, currency } = req.body;

        // Await the Stripe session creation. stripeSession will validate amounts and currency.
        const paymentResponse = await stripeSession({ payment_method_types, product_data, unit_amount, currency });

        // Return the session object to the client so they can redirect to `session.url` or use the id.
        res.status(200).json({ success: true, session: paymentResponse });
    } catch (err) {
        // Provide helpful error message (validation or Stripe error)
        const message = err && err.message ? err.message : 'Internal Server Error';
        res.status(400).json({ success: false, error: message });
    }
};