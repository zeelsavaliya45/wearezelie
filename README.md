import React, { useState } from 'react';
import { X, CreditCard, Lock, Smartphone } from 'lucide-react';
import { CartItem, CheckoutForm } from '../types';
import axios from 'axios';

interface CheckoutProps {
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onOrderComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, totalPrice, onClose, onOrderComplete }) => {
  const [form, setForm] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'googlepay',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const handleGooglePayPayment = async () => {
    setPaymentStatus('processing');
    
    try {
      // Create Razorpay hosted checkout
      const orderData = {
        amount: finalTotal * 100, // Amount in paise
        currency: 'INR',
        receipt: `order_${Date.now()}`,
        notes: {
          customer_name: `${form.firstName} ${form.lastName}`,
          customer_email: form.email,
          items: items.map(item => `${item.product.name} x${item.quantity}`).join(', ')
        }
      };

      // Create order with Razorpay
      const response = await axios.post('https://api.razorpay.com/v1/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa('rzp_test_your_key_id:your_key_secret')}` // Replace with your actual keys
        }
      });

      const order = response.data;
      
      // Redirect to Razorpay hosted checkout
      const checkoutUrl = `https://api.razorpay.com/v1/checkout/hosted?order_id=${order.id}&key_id=rzp_test_your_key_id`;
      
      // Open Razorpay checkout in new window
      const paymentWindow = window.open(checkoutUrl, '_blank', 'width=800,height=600');
      
      // Listen for payment completion (you'll need to implement webhook handling)
      const checkPaymentStatus = setInterval(async () => {
        try {
          // Check if payment window is closed
          if (paymentWindow?.closed) {
            clearInterval(checkPaymentStatus);
            
            // Verify payment status (in production, use webhooks)
            const paymentVerification = await verifyPayment(order.id);
            
            if (paymentVerification.success) {
              setPaymentStatus('success');
    const amount = finalTotal;
    const transactionNote = `Zelie Jewelry Order - ${items.length} items`;
    
    // Create UPI payment URL
    const upiUrl = `upi://pay?pa=${receiverUPI}&pn=Zelie Jewelry&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    
    // For mobile devices, try to open UPI apps directly
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = upiUrl;
      
      // Show payment processing state
      setPaymentStatus('processing');
      
      // Simulate payment verification (in real app, you'd verify with backend)
      setTimeout(() => {
        const confirmed = window.confirm('Have you completed the payment in your UPI app? Click OK if payment was successful, Cancel if failed.');
        if (confirmed) {
          setPaymentStatus('success');
          setTimeout(() => {
            onOrderComplete();
          }, 1000);
        } else {
          setPaymentStatus('failed');
          setTimeout(() => {
            setPaymentStatus('idle');
          }, 3000);
        }
      }, 2000);
    } else {
      // For desktop, show QR code or UPI ID
      alert(`Please use your mobile device to pay via UPI.\n\nUPI ID: ${receiverUPI}\nAmount: ₹${amount}\nNote: ${transactionNote}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.paymentMethod === 'googlepay') {
      handleGooglePayPayment();
    } else {
      setIsProcessing(true);
      // Simulate other payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
      onOrderComplete();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const shipping = totalPrice >= 599 ? 0 : 50;
  const tax = Math.round(totalPrice * 0.08);
  const finalTotal = totalPrice + shipping + tax;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={form.address}
                      onChange={handleInputChange}
                      required
                      className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={form.city}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal code"
                      value={form.postalCode}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
                    />
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleInputChange}
                      required
                      className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
                    >
                      <option value="">Select country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="googlepay"
                        name="paymentMethod"
                        value="googlepay"
                        checked={form.paymentMethod === 'googlepay'}
                        onChange={handleInputChange}
                        className="text-[#503e28] focus:ring-[#503e28]"
                      />
                      <label htmlFor="googlepay" className="flex items-center space-x-2">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                        <span>Google Pay / UPI</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Recommended</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={form.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="text-[#503e28] focus:ring-[#503e28]"
                      />
                      <label htmlFor="card" className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Credit Card</span>
                      </label>
                    </div>
                    
                    {form.paymentMethod === 'card' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="Card number"
                          value={form.cardNumber}
                          onChange={handleInputChange}
                          required
                          className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
                        />
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={form.expiryDate}
                          onChange={handleInputChange}
                          required
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={form.cvv}
                          onChange={handleInputChange}
                          required
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#503e28] focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Status Messages */}
                {paymentStatus === 'processing' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-blue-800 font-medium">
                        Redirecting to payment app... Complete payment and return here.
                      </span>
                    </div>
                  </div>
                )}
                
                {paymentStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-sm text-green-800 font-medium">
                        Payment successful! Processing your order...
                      </span>
                    </div>
                  </div>
                )}
                
                {paymentStatus === 'failed' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                      <span className="text-sm text-red-800 font-medium">
                        Payment failed. Please try again.
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing || paymentStatus === 'processing'}
                  className="w-full bg-[#503e28] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#3d2f1f] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {form.paymentMethod === 'googlepay' ? (
                    <>
                      <Smartphone className="w-5 h-5" />
                      <span>Pay with Google Pay - ₹{finalTotal.toLocaleString()}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>
                        {isProcessing ? 'Processing...' : `Complete Order - ₹${finalTotal.toLocaleString()}`}
                      </span>
                    </>
                  )}
                </button>
                
                {form.paymentMethod === 'googlepay' && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      You'll be redirected to your UPI app to complete the payment
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Receiver: zeelsavaliya35@okicici
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">
                    Your payment information is secure and encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;