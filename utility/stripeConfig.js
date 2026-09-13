const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY );

const stripeSession = async ({ payment_method_types = ['card'], product_data, unit_amount, currency = 'INR' }) => {
    if (unit_amount === undefined || unit_amount === null) {
        throw new Error('unit_amount is required');
    }

    const cur = (String(currency || 'USD')).toLowerCase();
    let unitAmountSmallest;

    // Convert major units to smallest units for common currencies
    if (cur === 'usd') {
        // dollars -> cents
        unitAmountSmallest = Math.round(Number(unit_amount) * 100);
    } else if (cur === 'inr') {
        // rupees -> paise
        unitAmountSmallest = Math.round(Number(unit_amount) * 100);
    } else {
        // assume caller provided smallest unit already
        unitAmountSmallest = Math.round(Number(unit_amount));
    }

    if (!Number.isFinite(unitAmountSmallest) || unitAmountSmallest <= 0) {
        throw new Error('unit_amount must be a positive number');
    }


    const MINIMUMS = { usd: 50, inr: 5000 };
    const min = MINIMUMS[cur] || 50;

    if (unitAmountSmallest < min) {
        const humanMin = cur === 'inr' ? `approximately ₹${(min / 100).toFixed(2)}` : `$${(min / 100).toFixed(2)}`;
        throw new Error(`Amount too small for currency ${currency}. Minimum is ${humanMin} (smallest unit: ${min}).`);
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types,
        line_items: [
            {
                price_data: {
                    currency: cur,
                    product_data,
                    unit_amount: unitAmountSmallest,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://yourdomain.com/success',   // pass your redirect url after payment
        cancel_url: 'https://yourdomain.com/cancel',     // pass your redirect url after cancel
    });

    return session;
};

module.exports = stripeSession;

// {
//     "unit_amount":200,
//     "payment_method_types":["card"],
//     "product_data":{
//         "name":"xyxx tshirt"
//     },  
//    "currency":"INR"
// }