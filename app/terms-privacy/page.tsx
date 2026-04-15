import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Privacy | create by™",
  description: "Terms and Conditions and Privacy Policy for create by™ / Cueni AS.",
};

const Nav = () => (
  <nav className="fixed top-0 inset-x-0 z-50 px-8 py-6 flex items-center justify-between border-b border-stone-200/60 bg-[#fafaf9]/70 backdrop-blur-md">
    <Link href="/" className="text-sm font-medium tracking-tight">
      create by™
    </Link>
    <div className="flex items-center gap-6 text-sm text-stone-500">
      <Link href="/about" className="hover:text-stone-900 transition-colors">
        About
      </Link>
      <a
        href="mailto:hello@createby.no"
        className="hover:text-stone-900 transition-colors"
      >
        Contact
      </a>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="px-8 py-8 border-t border-stone-200">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-stone-400">
      <div>
        <strong className="text-stone-600">create by™</strong>
        <span> — Cueni AS, 932292793</span>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/about" className="hover:text-stone-700 transition-colors">
          About
        </Link>
        <Link
          href="/terms-privacy"
          className="hover:text-stone-700 transition-colors"
        >
          Privacy &amp; Terms
        </Link>
        <a
          href="https://www.linkedin.com/in/lucascueni"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-stone-700 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/lueni"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-stone-700 transition-colors"
        >
          Twitter
        </a>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  </footer>
);

export default function TermsPrivacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1 px-8 pt-32 pb-20 max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-12">
          Legal
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 mb-16">
          Terms and Conditions &amp; Privacy Policy
        </h1>

        {/* Terms */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-stone-900 mb-8">
            Terms and Conditions
          </h2>
          <p className="text-stone-500 text-sm mb-8">
            Welcome to create by™. By accessing or using this website (the
            &quot;Site&quot;), you agree to be bound by these Terms and
            Conditions. Please read them carefully.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                1. Use of the Site
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                You agree not to use the Site for any illegal or unauthorized
                purpose. You must not transmit any worms or viruses or any code
                of a destructive nature. Any misuse of the Site is strictly
                prohibited.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                2. Intellectual Property
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                All content on the Site, including but not limited to text,
                graphics, logos, and images, is owned by create by™ and is
                protected by applicable intellectual property laws. You are
                granted a limited, non-exclusive, non-transferable license to
                access and use the Site for personal or internal business
                purposes only.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                3. Service Offerings
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                The information provided on this Site regarding services is a
                general overview. Specific agreements for services will be
                governed by separate contracts between create by™ and its
                clients.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                4. Limitation of Liability
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                create by™ shall not be liable for any direct, indirect,
                incidental, or consequential damages arising from your use of,
                or inability to use, the Site or its content.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                5. Payment Terms (If Applicable)
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Payment terms for services are outlined in individual service
                agreements. Disputes regarding payments will be handled in
                accordance with Norwegian law.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                6. Governing Law
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                These Terms and Conditions are governed by the laws of Norway.
                Any disputes arising from these terms shall be subject to the
                exclusive jurisdiction of the courts in Oslo, Norway.
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-stone-200 mb-16" />

        {/* Privacy */}
        <section>
          <h2 className="text-xl font-semibold text-stone-900 mb-8">
            Privacy Policy
          </h2>
          <p className="text-stone-500 text-sm mb-8">
            I am committed to protecting your personal data. This Privacy Policy
            explains how I collect, use, and protect your information.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                1. Information We Collect
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                I collect personal information you voluntarily provide, such as
                your name and email address when you contact me. I also collect
                automatically generated information, such as IP addresses and
                browser type, to improve this website.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                2. How We Use Your Information
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                I use your personal information for the following purposes:
                responding to your inquiries, providing and improving my
                services, and complying with legal obligations. I do not sell
                your personal data to third parties.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                3. Cookies
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                This website may use cookies to enhance your experience. You can
                manage your cookie preferences through your browser settings.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                4. Third-Party Services
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                I may use third-party services, such as analytics tools, to help
                understand how this website is used. These services may collect
                information in accordance with their own privacy policies.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                5. Your Rights
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Under applicable data protection laws, you have the right to:
                access the personal data I hold about you, request corrections
                to any inaccurate data, request deletion of your personal data
                in certain circumstances, and withdraw consent where processing
                is based on consent.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                6. Data Security
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                I take appropriate technical and organisational measures to
                protect your personal data against unauthorised access, loss, or
                destruction.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                7. Changes to this Policy
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                I may update this Privacy Policy from time to time. Any changes
                will be posted on this page with a revised date.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-200">
            <h3 className="text-sm font-semibold text-stone-700 mb-2">
              Contact
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              For any questions about these policies, please contact me at{" "}
              <a
                href="mailto:hello@createby.no"
                className="text-stone-700 underline underline-offset-4 hover:text-stone-900"
              >
                hello@createby.no
              </a>
              .
            </p>
            <p className="text-sm text-stone-400 mt-2">
              Cueni AS — Org. 932292793
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
