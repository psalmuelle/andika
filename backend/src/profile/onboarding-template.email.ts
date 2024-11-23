export class OnboardingMessage {
  message() {
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
    <p>Hi [Client's First Name],</p>

    <p>We welcome you to Andika, where you can effortlessly request high-quality technical articles to spotlight your product, brand or idea.</p>
    
    <p>Our mission is simple: to bridge the gap between technology and its audience. We deliver technical articles that explain the how and highlight the why so your product resonates with developers, users, and decision-makers alike.</p>

    <h2>Here's What to Expect from Us:</h2>
    <h3>1. Discovery and Planning</h3>
    <p>Our first step is to understand your product inside and out. We'll start wih a kickoff meeting to dive into your goals, key features, and the core problems your product solves.</p>

    <h3>2. Tailored Content Strategy</h3>
    <p>Based on our discussion, we’ll create a content plan specifically designed for your audience. Every article, guide, and blog post will serve a purpose—whether it’s to explain complex concepts, demonstrate use cases, or inspire adoption.</p>

    <h3>3. End-to-End Article Creation</h3>
    <p>From research to revisions, our team takes care of everything. We work closely with you for feedback and ensure that each piece aligns with your brand’s voice and vision.</p>

    <h3>4. Optimized for Reach</h3>
    <p>We understand that great content only works if it reaches the right audience. Our articles are optimized for search engines and social platforms, making it easy for developers and users to discover your product.</p>

    <h2>Next Steps</h2>
    <ol>
      <li><strong>Complete Our Onboarding Questionnaire</strong>  
        <p>This will help us understand your product better and streamline our process.</p></li>
      <li><strong>Schedule a Kickoff Call</strong>  
        <p>Book a time that works best for you to go over initial ideas and answer any questions.</p></li>
    </ol>

    <h2>Need Help?</h2>
    <p>Have any questions about the process or specific requests? Reach out to us anytime at <a href="mailto:support@agencyname.com">support@agencyname.com</a>.</p>

    <p>Thank you for trusting Andika with your product’s story. We’re excited to work together to bring your innovation to the world!</p>

      <div class="footer">
        <p>Warm regards,</p>
        <p
          >Team Andika<br />
          <br />
          <a href="[Website URL]">[Website URL]</a> |
          <a href="mailto:[Contact Email]">[Contact Email]</a> | [Phone
          Number]</p
        >
      </div>
  </div>
</body>
</html>

`;
  }
}
