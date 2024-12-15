import React from "react";

const HelpPage = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Help</h2>
      <div className="flex flex-col space-y-2">
        <p>If you need assistance, please contact support.</p>
        <ul className="list-disc list-inside">
          <li>
            Email:{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-500 hover:underline"
            >
              support@example.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href="tel:+1234567890" className="text-blue-500 hover:underline">
              +1 234 567 890
            </a>
          </li>
          <li>
            Web:{" "}
            <a
              href="https://mindx.edu.vn/"
              className="text-blue-500 hover:underline"
            >
              https://mindx.edu.vn/
            </a>
          </li>
        </ul>
        <p>
          Check our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            FAQ
          </a>{" "}
          for more information.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
