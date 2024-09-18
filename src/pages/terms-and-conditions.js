import React from "react";

// Internal imports
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@component/header/PageHeader";
import CMSkeleton from "@component/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const TermAndConditions = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Layout
      title="Terms & Conditions"
      description="This is terms and conditions page"
    >
      <PageHeader
        headerBg={storeCustomizationSetting?.term_and_condition?.header_bg}
        title={showingTranslateValue(
          storeCustomizationSetting?.term_and_condition?.title
        )}
      />
      <div className="bg-white">
        <b>Last Updated: 18th September 2024</b>
        <p>
          Welcome to ABH! By accessing or using our platform, you agree to
          comply with and be bound by the following Terms & Conditions. Please
          read them carefully. If you do not agree with any part of these terms,
          you may not use our services.
        </p>

        <h2>1. General Terms</h2>
        <h3>1.1 Eligibility:</h3>
        <p>
          To use ABH, you must be at least 18 years old and have the legal
          capacity to enter into contracts. By using our platform, you represent
          and warrant that you meet these requirements.
        </p>

        <h3>1.2 Account Registration:</h3>
        <p>
          You must create an account to access certain services on the ABH
          platform. You agree to provide accurate, complete, and updated
          information during registration and to keep your account information
          confidential. You are responsible for all activities under your
          account.
        </p>

        <h3>1.3 Prohibited Conduct:</h3>
        <p>
          You agree not to engage in any of the following prohibited activities:
          <ul>
            <li>
              Violating any local, national, or international laws or
              regulations.
            </li>
            <li>Infringing on the intellectual property rights of others.</li>
            <li>Posting false, misleading, or defamatory content.</li>
            <li>Engaging in fraudulent transactions.</li>
            <li>
              Interfering with the security or proper functioning of the
              platform.
            </li>
          </ul>
        </p>

        <h2>2. Product Listings and Transactions</h2>
        <h3>2.1 Manufacturers:</h3>
        <p>
          <ul>
            <li>
              Manufacturers are responsible for providing accurate and complete
              product descriptions, pricing, and availability information.
            </li>
            <li>
              Products listed must comply with all applicable regulations and
              safety standards.
            </li>
            <li>
              ABH reserves the right to remove any product listings that are
              deemed inappropriate or in violation of these Terms & Conditions.
            </li>
          </ul>
        </p>

        <h3>2.2 Wholesalers:</h3>
        <p>
          <ul>
            <li>
              Wholesalers are required to maintain accurate inventory records
              and provide timely updates on stock levels.
            </li>
            <li>
              Bulk orders placed through the platform must be fulfilled within
              the agreed-upon timelines.
            </li>
            <li>
              ABH reserves the right to mediate disputes between wholesalers and
              other parties on the platform.
            </li>
          </ul>
        </p>

        <h3>2.3 Retailers:</h3>
        <p>
          <ul>
            <li>
              Retailers are responsible for ensuring that all orders placed
              through the platform are accurate and in compliance with customer
              requests.
            </li>
            <li>
              ABH is not responsible for discrepancies in pricing, product
              quality, or order fulfillment issues between retailers and
              suppliers.
            </li>
            <li>
              Retailers must adhere to all payment terms and conditions set
              forth by ABH and the respective suppliers.
            </li>
          </ul>
        </p>

        <h3>2.4 Drop-shippers:</h3>
        <p>
          <ul>
            <li>
              Drop-shippers must accurately represent product information and
              delivery times to their customers.
            </li>
            <li>
              ABH is not liable for any issues arising from third-party
              fulfillment services used by drop-shippers.
            </li>
            <li>
              Drop-shippers are responsible for managing their customer
              relationships and resolving disputes directly.
            </li>
          </ul>
        </p>

        <h2>3. Payments and Fees</h2>
        <h3>3.1 Payment Terms:</h3>
        <p>
          All transactions on the ABH platform must be conducted through the
          approved payment methods. You agree to pay all applicable fees,
          including any taxes or shipping costs, as indicated during the
          transaction process.
        </p>

        <h3>3.2 Fees for Services:</h3>
        <p>
          ABH charges fees for certain services, such as premium listings,
          advertising, and transaction processing. Fees are clearly disclosed on
          the platform and are subject to change. By using these services, you
          agree to pay the fees as outlined.
        </p>

        <h3>3.3 Refunds and Cancellations:</h3>
        <p>
          Refunds and cancellations are subject to the terms agreed upon between
          the buyer and seller. ABH is not responsible for issuing refunds but
          may assist in resolving disputes.
        </p>

        <h2>4. Shipping and Delivery</h2>
        <h3>4.1 Shipping Responsibility:</h3>
        <p>
          The seller (manufacturer, wholesaler, or drop-shipper) is responsible
          for ensuring timely and accurate delivery of products to the buyer.
          ABH does not guarantee delivery times or conditions but will
          facilitate communication between parties if issues arise.
        </p>

        <h3>4.2 Delivery Disputes:</h3>
        <p>
          Any disputes regarding shipping delays, lost items, or damaged goods
          must be resolved between the buyer and seller. ABH may intervene at
          its discretion to mediate disputes but is not liable for
          shipping-related issues.
        </p>

        <h2>5. Intellectual Property</h2>
        <h3>5.1 Ownership:</h3>
        <p>
          All content, trademarks, and intellectual property on the ABH
          platform, including but not limited to text, graphics, logos, and
          software, are the property of ABH or its licensors. You may not
          reproduce, distribute, or create derivative works from any content
          without express written permission from ABH.
        </p>

        <h3>5.2 User-Generated Content:</h3>
        <p>
          By uploading or posting content on the ABH platform, you grant ABH a
          worldwide, royalty-free, perpetual, and non-exclusive license to use,
          distribute, modify, and display your content in connection with our
          services.
        </p>

        <h2>6. Privacy and Data Security</h2>
        <p>
          Your use of the ABH platform is governed by our Privacy Policy, which
          explains how we collect, use, and protect your personal information.
          By using our platform, you consent to the collection and use of your
          information as described in the Privacy Policy.
        </p>

        <h2>7. Dispute Resolution</h2>
        <h3>7.1 Mediation:</h3>
        <p>
          ABH encourages users to resolve disputes amicably through direct
          communication. If mediation is necessary, ABH may assist in
          facilitating a resolution but does not guarantee outcomes.
        </p>

        <h3>7.2 Arbitration:</h3>
        <p>
          If disputes cannot be resolved through mediation, the parties agree to
          submit the matter to binding arbitration by the laws of [Insert
          Jurisdiction]. The decision of the arbitrator will be final and
          binding on all parties.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, ABH shall not be liable for
          any indirect, incidental, special, or consequential damages arising
          out of or in connection with the use of our platform, including but
          not limited to loss of profits, data, or business opportunities.
        </p>

        <h2>9. Termination</h2>
        <p>
          ABH reserves the right to suspend or terminate your account and access
          to the platform at any time for any reason, including violation of
          these Terms & Conditions. You may also terminate your account at any
          time by contacting our support team.
        </p>

        <h2>10. Changes to These Terms</h2>
        <p>
          ABH may update these Terms & Conditions from time to time. You will be
          notified of any significant changes via email or through the platform.
          Your continued use of the platform after such changes constitutes your
          acceptance of the updated terms.
        </p>
      </div>
    </Layout>
  );
};

export default TermAndConditions;
