import Typography from "@/components/ui/typography";

export default function TermsOfService() {
  return (
    <div className="px-[5%] py-8">
      <Typography as="h1" className="mb-4">
        Terms of Service
      </Typography>
      <Typography as="p" className="mb-4">
        Welcome to AndikaDocs. These Terms of Service ("Terms") govern your use
        of our website, services, and products provided by AndikaDocs ("we,"
        "us," or "our"). By accessing or using our website or services, you
        agree to these Terms. If you do not agree, please do not use our
        services.
      </Typography>

      <Typography as="h2" className="mb-2 mt-6 text-lg font-semibold">
        1. Acceptance of Terms
      </Typography>
      <Typography as="p" className="mb-4">
        By accessing AndikaDocs, you confirm that you have read, understood, and
        agree to these Terms. If you are using our services on behalf of an
        organization, you represent that you are authorized to bind the
        organization to these Terms.
      </Typography>

      <Typography as="h2" className="mb-2 mt-6 text-lg font-semibold">
        2. Services Provided
      </Typography>
      <Typography as="p" className="mb-4">
        AndikaDocs provides technical writing services, including but not
        limited to:
      </Typography>
      <ul className="mb-4 list-disc pl-6">
        <li>Creation of technical articles</li>
        <li>Whitepapers</li>
        <li>API/SDK documentation</li>
        <li>Editing and proofreading services</li>
      </ul>
      <Typography as="p" className="mb-4">
        We reserve the right to modify, suspend, or discontinue any part of our
        services at any time, with or without notice.
      </Typography>

      <Typography as="h2" className="mb-2 mt-6 text-lg font-semibold">
        3. User Responsibilities
      </Typography>
      <Typography as="p" className="mb-4">
        You agree to:
      </Typography>
      <ul className="mb-4 list-disc pl-6">
        <li>
          Provide accurate and complete information when engaging our services.
        </li>
        <li>Not use our services for unlawful or prohibited purposes.</li>
        <li>
          Refrain from submitting content that is defamatory, obscene, or
          violates the intellectual property rights of others.
        </li>
      </ul>

      <Typography as="h2" className="mb-2 mt-6 text-lg font-semibold">
        4. Intellectual Property
      </Typography>
      <Typography as="p" className="mb-4">
        All content and materials created by AndikaDocs, including but not
        limited to articles, whitepapers, and documentation, remain our
        intellectual property until full payment has been made. Upon full
        payment, ownership of the content will be transferred to you, unless
        otherwise agreed upon.
      </Typography>
      <Typography as="p" className="mb-4">
        You are not allowed to copy, modify, or redistribute any content created
        by us without prior written consent.
      </Typography>

      <Typography as="h2" className="mb-2 mt-6 text-lg font-semibold">
        5. Payment and Refunds
      </Typography>
      <Typography as="p" className="mb-4">
        - Payment for services must be made according to the agreed terms
        outlined in the contract or invoice.
      </Typography>
      <Typography as="p" className="mb-4">
        - Refunds are issued only at our discretion and under exceptional
        circumstances. No refunds will be issued for completed and delivered
        work.
      </Typography>

      <Typography as="h2" className="mb-2 mt-6 text-lg font-semibold">
        6. Confidentiality
      </Typography>
      <Typography as="p" className="mb-4">
        We understand the importance of confidentiality and agree to keep all
        client-provided materials, communications, and projects private.
        Similarly, you agree not to disclose any confidential information shared
        by AndikaDocs.
      </Typography>

      <Typography as="h2" className="mb-2 mt-6 text-lg font-semibold">
        7. Limitation of Liability
      </Typography>
      <Typography as="p" className="mb-4">
        AndikaDocs is not responsible for any damages, including but not limited
        to direct, indirect, incidental, or consequential damages, arising from
        the use or inability to use our services.
      </Typography>
      <Typography as="p" className="mb-4">
        Our total liability for any claim related to our services is limited to
        the amount paid by you for those services.
      </Typography>

      <Typography as="h2" className="mb-2 mt-6 text-lg font-semibold">
        8. Termination
      </Typography>
      <Typography as="p" className="mb-4">
        We reserve the right to terminate your access to our services at any
        time, with or without notice, for any breach of these Terms or any other
        reason.
      </Typography>

      <Typography as="h2" className="mb-2 mt-6 text-lg font-semibold">
        9. Changes to Terms
      </Typography>
      <Typography as="p" className="mb-4">
        AndikaDocs may update these Terms from time to time. Changes will be
        effective immediately upon posting. By continuing to use our services
        after changes are made, you accept the revised Terms.
      </Typography>

      <Typography as="h2" className="mb-2 mt-6 text-lg font-semibold">
        10. Contact Us
      </Typography>
      <Typography as="p" className="mb-4">
        For any questions or concerns regarding these Terms, please contact us
        at:
      </Typography>
      <Typography as="p" className="mb-4">
        <strong>AndikaDocs Support</strong>
        <br />
        Email: sam@andikadocs.com
      </Typography>

      <Typography as="p" className="text-sm italic">
        By using our services, you acknowledge that you have read, understood,
        and agree to these Terms of Service.
      </Typography>
    </div>
  );
}
