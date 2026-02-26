import { useState } from "react";
import { useLoaderData } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
      query GetDiscounts {
        codeDiscountNodes(first: 50) {
          edges {
            node {
              codeDiscount {
                ... on DiscountCodeBasic {
                  title
                }
                ... on DiscountCodeBxgy {
                  title
                }
                ... on DiscountCodeFreeShipping {
                  title
                }
              }
            }
          }
        }
      }`,
  );

  const data = await response.json();
  const discounts = data.data.codeDiscountNodes.edges
    .map(({ node }) => node.codeDiscount?.title)
    .filter(Boolean);

  return { discounts };
};

export default function Index() {
  const { discounts } = useLoaderData();
  const [selectedCode, setSelectedCode] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const handleGenerateQR = () => {
    if (selectedCode.trim() !== "") {
      const targetUrl = `https://www.racketworld.co.uk/discount/${encodeURIComponent(selectedCode)}`;
      const qrApiUrl = `https://quickchart.io/qr?text=${encodeURIComponent(targetUrl)}&size=200`;
      setQrUrl(qrApiUrl);
    }
  };

  const handlePrint = () => {
    if (qrUrl) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body { text-align: center; font-family: Arial, sans-serif; }
              .print-container { margin-top: 20px; }
              .qr-code { max-width: 200px; }
            </style>
          </head>
          <body>
            <div class="print-container">
              <img class="qr-code" src="${qrUrl}" alt="QR Code" />
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(() => window.close(), 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <s-page heading="Weblegs Discount QR Scan Code">
      <s-section heading="Generate QR Code">
        <s-stack direction="block" gap="base">
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Select Discount Code
            </label>
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #c9cccf",
                fontSize: "14px",
                width: "100%",
                maxWidth: "400px",
                background: "#fff",
              }}
            >
              <option value="">Select a discount code</option>
              {discounts.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <s-button onClick={handleGenerateQR}>Generate QR Code</s-button>

          {qrUrl && (
            <s-stack direction="block" gap="base">
              <div style={{ textAlign: "center" }}>
                <img
                  src={qrUrl}
                  alt="Generated QR Code"
                  width="200"
                  height="200"
                />
              </div>
              <s-button onClick={handlePrint}>Print QR Code</s-button>
            </s-stack>
          )}
        </s-stack>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
