import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for FALLAGNG website",
  openGraph: {
    title: "Terms of Service | FALLAGNG",
    description: "Terms of Service for FALLAGNG website",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-permanent-marker text-text mb-8">
        Terms of Service
      </h1>
      
      <div className="prose prose-invert max-w-none space-y-6 text-muted">
        <p className="text-sm text-muted/80">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Agreement to Terms</h2>
          <p>
            By accessing and using the FALLAGNG website (the "Service"), you accept and agree to be 
            bound by the terms and provision of this agreement. If you do not agree to these Terms of 
            Service, please do not use our Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Use of the Service</h2>
          <p>
            The Service is provided for informational and entertainment purposes. You may use the Service 
            for personal, non-commercial purposes in accordance with these Terms.
          </p>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Service for any unlawful purpose or in violation of any laws</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Interfere with or disrupt the Service or servers connected to the Service</li>
            <li>Reproduce, duplicate, copy, or exploit any portion of the Service without express written permission</li>
            <li>Use automated systems or software to extract data from the Service</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Intellectual Property</h2>
          <p>
            All content on the Service, including but not limited to text, graphics, logos, images, 
            audio clips, video clips, and software, is the property of FALLAGNG or its content suppliers 
            and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            You may not use, reproduce, distribute, modify, or create derivative works from any content 
            on the Service without our express written permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Third-Party Links</h2>
          <p>
            The Service may contain links to third-party websites or services that are not owned or 
            controlled by FALLAGNG. We have no control over, and assume no responsibility for, the content, 
            privacy policies, or practices of any third-party websites or services.
          </p>
          <p>
            You acknowledge and agree that FALLAGNG shall not be responsible or liable, directly or 
            indirectly, for any damage or loss caused or alleged to be caused by or in connection with 
            the use of or reliance on any such content, goods, or services available on or through any 
            such websites or services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "as is" and "as available" basis. FALLAGNG makes no warranties, 
            expressed or implied, and hereby disclaims and negates all other warranties including, without 
            limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
            or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Limitation of Liability</h2>
          <p>
            In no event shall FALLAGNG, its members, or its affiliates be liable for any indirect, 
            incidental, special, consequential, or punitive damages, including without limitation, loss 
            of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless FALLAGNG and its members from and against 
            any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses 
            (including attorney's fees) arising from your use of the Service or violation of these Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, 
            we will try to provide at least 30 days notice prior to any new terms taking effect. What 
            constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions become effective, you agree 
            to be bound by the revised terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with applicable laws, without regard 
            to its conflict of law provisions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text mt-8 mb-4">Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us through our 
            website or social media channels.
          </p>
        </section>
      </div>
    </div>
  );
}


