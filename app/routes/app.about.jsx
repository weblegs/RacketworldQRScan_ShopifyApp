export default function AboutPage() {
  return (
    <s-page heading="About">
      <s-section>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <img
            src="https://www.weblegs.co.uk/wp-content/uploads/2024/02/weblegs-new-logo-1-1.png"
            alt="Web Legs Logo"
            style={{ maxWidth: "200px", height: "auto" }}
          />
        </div>
        <s-paragraph>
          This Web Legs Shopify app allows you to create and manage QR codes for
          discounts directly within Shopify Admin. It simplifies the process of
          generating QR codes that customers can scan to apply discounts
          automatically.
        </s-paragraph>
        <s-paragraph>Key features include:</s-paragraph>
        <s-unordered-list>
          <s-list-item>Discount QR codes in Shopify Admin</s-list-item>
          <s-list-item>
            Generate QR codes that redirect customers with pre-applied discounts
          </s-list-item>
          <s-list-item>
            Basic tracking functionality to monitor QR code usage
          </s-list-item>
        </s-unordered-list>
        <s-paragraph>
          This app is designed as a starting point for managing discount QR codes
          and basic tracking within Shopify, providing core functionality
          tailored for your needs.
        </s-paragraph>
      </s-section>
    </s-page>
  );
}
