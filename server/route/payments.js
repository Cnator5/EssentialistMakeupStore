// routes/payments.js
import express from 'express';
import { client } from '../config/payunit.js';

const router = express.Router();

// MTN Mobile Money
router.post('/mtn', async (req, res) => {
  try {
    const { amount, phone, order_id, email, name } = req.body;
    const payment = await client.collections.initiatePayment({
      total_amount: amount,
      currency: 'XAF',
      transaction_id: order_id,
      return_url: 'https://esmakeupstore.com/return',
      notify_url: 'https://esmakeupstore.com/webhook',
      payment_country: 'CM',
      pay_with: 'CM_MTNMOMO',
      custom_fields: { order_id, customer_type: 'web' },
    });
    res.json({ payment_url: payment.transaction_url });
  } catch (err) {
    res.status(500).json({ error: 'Payment initiation failed' });
  }
});

// Orange Money
router.post('/orange', async (req, res) => {
  try {
    const { amount, phone, order_id, email, name } = req.body;
    const payment = await client.collections.initiatePayment({
      total_amount: amount,
      currency: 'XAF',
      transaction_id: order_id,
      return_url: 'https://esmakeupstore.com/return',
      notify_url: 'https://esmakeupstore.com/webhook',
      payment_country: 'CM',
      pay_with: 'CM_ORANGE',
      custom_fields: { order_id, customer_type: 'web' },
    });
    res.json({ payment_url: payment.transaction_url });
  } catch (err) {
    res.status(500).json({ error: 'Payment initiation failed' });
  }
});

export default router;