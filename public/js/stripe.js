/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51K2vfmLqZ3eMAGJKEcKoeEXZkjgObvQfD6aqntNGXg5xfozQQXyYoO1P25JflokanaNGx7kBNIb3tdvsx0g7OawE00PR2ohSXQ'
);

export const bookTour = async tourId => {
  console.log(tourId);
  try {
    // 1) get session from the API
    console.log('tourId', tourId);
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
