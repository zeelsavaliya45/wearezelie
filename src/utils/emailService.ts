// Email service configuration for EmailJS
// You'll need to set up EmailJS account and replace the credentials

export const EMAIL_CONFIG = {
  SERVICE_ID: 'your_service_id', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'your_template_id', // Replace with your EmailJS template ID  
  USER_ID: 'your_user_id' // Replace with your EmailJS user ID
};

// Email template for payment notifications
export const EMAIL_TEMPLATE = `
New Order Received - Zelie Jewelry

Order Details:
- Customer: {{customer_name}}
- Email: {{customer_email}}
- Order Total: {{order_total}}
- Payment Method: {{payment_method}}
- UPI ID: {{upi_id}}
- Order Date: {{order_date}}

Items Ordered:
{{order_items}}

Shipping Address:
{{customer_address}}

Please process this order promptly.

Best regards,
Zelie Jewelry System
`;

// Instructions for EmailJS setup:
/*
1. Go to https://www.emailjs.com/ and create an account
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - to_email
   - customer_name
   - customer_email
   - order_total
   - order_items
   - customer_address
   - order_date
   - payment_method
   - upi_id
4. Get your Service ID, Template ID, and User ID
5. Replace the credentials in the Checkout component
*/