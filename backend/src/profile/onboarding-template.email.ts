export class OnboardingMessage {
  message(name: string) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Andika</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 0;
      margin: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3 {
      margin-bottom: 10px;
      font-weight: normal;
    }
    p, ul, ol {
      margin-bottom: 20px;
    }
    ul, ol {
      padding-left: 20px;
    }
    .footer {
      font-size: 0.9em;
      color: #555;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Andika!</h1>
    <p>Hi <strong>${name}</strong>,</p>

    <p>Welcome to <strong>Andika</strong>, your trusted partner in crafting high-quality technical documentation and articles that spotlight your product, brand, or idea.</p>

    <p>At Andika, our mission is simple: to bridge the gap between technology and its audience. We specialize in creating documentation and articles that explain the "how" and emphasize the "why," helping your product resonate with developers, users, and decision-makers alike.</p>

    <h2>Our Process</h2>
    <p>Our process is simple and efficient. Here’s how it works:</p>

    <ul>
      <li><strong>Submit Your Request</strong>: Begin by filling out our project request form at <a href="https://www.andikadocs.tech/projects/create">https://andikadocs.tech/projects/create</a>.</li>
      <li><strong>Project Review</strong>: We’ll promptly review your request and contact you to discuss the project details. This typically takes less than 5 minutes.</li>
      <li><strong>Agreement and Payment</strong>: Once we agree on the project scope, we’ll send you a payment invoice. To begin, we require partial payment upfront. We accept payments in USD, EUR, and cryptocurrency.</li>
      <li><strong>First Draft Delivery</strong>: Our expert team of writers will work on your project and deliver the first draft within the agreed timeline.</li>
      <li><strong>Feedback and Revisions</strong>: You’ll have the opportunity to review the draft and provide feedback. We’ll revise the document as needed until you’re 100% satisfied.</li>
      <li><strong>Final Delivery</strong>: Once approved, we’ll deliver the final document in your preferred format.</li>
      <li><strong>Share Your Story</strong>: Use your new documentation to showcase your product to the world!</li>
    </ul>

    <h2>What’s Next?</h2>
    <p>Getting started is as easy as visiting <a href="https://andikadocs.tech/projects/create">https://andikadocs.tech/projects/create</a> to submit your request. We’ll get back to you promptly and begin the process.</p>

    <h2>Need Assistance?</h2>
    <p>Have questions or specific requests? We’re here to help! Reach out to us anytime at <a href="mailto:sam@andikadocs.tech">sam@andikadocs.tech</a>. You can also use the chatbox in your dashboard for real-time assistance.</p>

    <p>Thank you for trusting <strong>Andika</strong> to bring your product’s story to life. We’re excited to partner with you and showcase your innovation to the world!</p>

    <div class="footer">
      <p>Warm regards,</p>
      <p>
        <strong>Team Andika</strong><br />
        <a href="https://www.andikadocs.tech">andikadocs.tech</a> | <a href="mailto:sam@andikadocs.tech">sam@andikadocs.tech</a>
      </p>
    </div>
  </div>
</body>
</html>
`;
  }
}
