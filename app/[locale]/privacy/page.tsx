import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for FALLAGNG website",
  openGraph: {
    title: "Privacy Policy | FALLAGNG",
    description: "Privacy Policy for FALLAGNG website",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-permanent-marker text-text mb-8">
        Privacy Policy
      </h1>
      
      <div className="prose prose-invert max-w-none space-y-6 text-muted">
        <p className="text-sm text-muted/80">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Introduction</h2>
          <p>
            FALLAGNG ("we," "our," or "us") operates the website fallagng.com (the "Service"). 
            This Privacy Policy informs you of our policies regarding the collection, use, and 
            disclosure of personal data when you use our Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Information We Collect</h2>
          <p>
            We collect minimal information necessary to provide and improve our Service:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text">Usage Data:</strong> We may collect information about 
              how you access and use the Service, including your IP address, browser type, pages 
              visited, and time spent on pages. This information is collected through analytics 
              tools such as Google Analytics.
            </li>
            <li>
              <strong className="text-text">Cookies:</strong> We use cookies to store your language 
              preference (English or French) and to enhance your browsing experience. These cookies 
              are stored locally on your device.
            </li>
            <li>
              <strong className="text-text">External Links:</strong> When you click on links to 
              external platforms (such as Spotify, YouTube, Instagram), we may track these clicks 
              for analytics purposes, but we do not collect personal information from these interactions.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">How We Use Your Information</h2>
          <p>We use the collected information for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing and maintaining our Service</li>
            <li>Understanding how visitors use our website</li>
            <li>Improving user experience and website functionality</li>
            <li>Remembering your language preferences</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Third-Party Services</h2>
          <p>
            Our Service may contain links to third-party websites and services (such as music 
            streaming platforms and social media). We are not responsible for the privacy practices 
            of these external sites. We encourage you to review the privacy policies of any third-party 
            services you visit.
          </p>
          <p>
            We use Google Analytics to analyze website traffic. Google Analytics may collect and 
            process data according to Google's Privacy Policy. You can opt out of Google Analytics 
            by installing the Google Analytics Opt-out Browser Add-on.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information. 
            However, no method of transmission over the Internet or electronic storage is 100% secure, 
            and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of analytics tracking</li>
            <li>Disable cookies through your browser settings</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our Service is not intended for children under the age of 13. We do not knowingly collect 
            personal information from children under 13. If you are a parent or guardian and believe 
            your child has provided us with personal information, please contact us.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our 
            website or social media channels.
          </p>
        </section>
      </div>
    </div>
  );
}



