import React from "react";
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@component/header/PageHeader";
import useUtilsFunction from "@hooks/useUtilsFunction";

const PrivacyPolicy = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Layout title="Privacy Policy" description="This is privacy policy page">
      <PageHeader
        headerBg={storeCustomizationSetting?.privacy_policy?.header_bg}
        title="Privacy Policy"
      />
      <div className="bg-white py-10">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          {/* <h2 className="text-3xl font-bold mb-6 text-center">
            Privacy Policy
          </h2> */}
          <b>Last Updated September 18 2024</b>
          <p className="mb-8">
            At ABH, we are committed to protecting the privacy and security of
            our users. This Privacy Policy outlines how we collect, use, and
            protect personal information from manufacturers, wholesalers,
            retailers, and drop-shippers on our platform. By using ABH, you
            agree to the terms of this policy.
          </p>

          {/* Information We Collect Section */}
          <section className="mb-10">
            <h3 className="text-2xl font-bold mb-4">Information We Collect</h3>
            <div className="mb-4">
              <h4 className="text-xl font-semibold">For Manufacturers:</h4>
              <ol className="list-decimal ml-6 mb-4">
                <li className="mb-2">
                  <strong>Business Information:</strong> We collect your company
                  name, business registration details, product catalogs, and
                  certifications to verify your legitimacy on the platform.
                </li>
                <li className="mb-2">
                  <strong>Contact Information:</strong> This includes your email
                  address, phone number, and physical address to facilitate
                  communication and logistics.
                </li>
                <li className="mb-2">
                  <strong>Financial Information:</strong> Payment details,
                  including bank account information, for secure transactions
                  and payouts.
                </li>
                <li className="mb-2">
                  <strong>Marketing Preferences:</strong> Information on how you
                  wish to be contacted for marketing, promotional activities, or
                  collaboration opportunities.
                </li>
                <li className="mb-2">
                  <strong>Usage Data:</strong> We track how you interact with
                  the platform to improve your experience.
                </li>
              </ol>
            </div>

            <div className="mb-4">
              <h4 className="text-xl font-semibold">For Wholesalers:</h4>
              <ol className="list-decimal ml-6 mb-4">
                <li className="mb-2">
                  <strong>Business Credentials:</strong> Your business name,
                  license number, and contact information for verification
                  purposes.
                </li>
                <li className="mb-2">
                  <strong>Order History:</strong> Records of your transactions,
                  including bulk purchases, to help with order management and
                  customer service.
                </li>
                <li className="mb-2">
                  <strong>Financial Information:</strong> Payment methods and
                  transaction details for processing orders and refunds.
                </li>
                <li className="mb-2">
                  <strong>Inventory Data:</strong> Information on your stock
                  levels and order management preferences to facilitate smooth
                  business operations.
                </li>
                <li className="mb-2">
                  <strong>Communication Preferences:</strong> How you prefer to
                  receive notifications and updates.
                </li>
              </ol>
            </div>

            <div className="mb-4">
              <h4 className="text-xl font-semibold">For Retailers:</h4>
              <ol className="list-decimal ml-6 mb-4">
                <li className="mb-2">
                  <strong>Personal and Business Information:</strong> Your name,
                  store name, and contact details for account creation and
                  verification.
                </li>
                <li className="mb-2">
                  <strong>Order and Purchase Data:</strong> Details of your
                  orders and purchase history for account management and
                  customer service.
                </li>
                <li className="mb-2">
                  <strong>Financial Information:</strong> Payment details for
                  transactions on the platform.
                </li>
                <li className="mb-2">
                  <strong>Marketing Preferences:</strong> Information on how you
                  would like to receive promotional offers.
                </li>
                <li className="mb-2">
                  <strong>Communication Data:</strong> Records of your
                  communications with suppliers and customers.
                </li>
              </ol>
            </div>

            <div className="mb-4">
              <h4 className="text-xl font-semibold">For Drop-shippers:</h4>
              <ol className="list-decimal ml-6 mb-4">
                <li className="mb-2">
                  <strong>Account Information:</strong> Your name, contact
                  details, and business information.
                </li>
                <li className="mb-2">
                  <strong>Order Data:</strong> Information on orders placed
                  through the platform.
                </li>
                <li className="mb-2">
                  <strong>Financial Information:</strong> Payment details,
                  including how you pay suppliers and receive payments.
                </li>
                <li className="mb-2">
                  <strong>Shipping and Logistics Data:</strong> Information on
                  your preferred logistics providers.
                </li>
                <li className="mb-2">
                  <strong>Customer Communication:</strong> Data related to your
                  interactions with customers.
                </li>
              </ol>
            </div>
          </section>

          {/* How We Use Your Information Section */}
          <section className="mb-10">
            <h3 className="text-2xl font-bold mb-4">
              How We Use Your Information
            </h3>
            <p className="mb-4">
              We use the information collected to provide services, verify
              legitimacy, and improve platform experiences. Specific uses may
              include:
            </p>
            {/* Continue adding the sub-sections for Manufacturers, Wholesalers, Retailers, and Drop-shippers */}
          </section>

          {/* Continue adding other sections like "How We Share Your Information" */}
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
