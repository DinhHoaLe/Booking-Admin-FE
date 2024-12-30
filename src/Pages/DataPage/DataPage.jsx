import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { downloadExcel } from "react-export-table-to-excel";
import { fetchUsers } from "../../Redux/Slide/userSlice";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";

const DataPage = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log(results.data);
          setData(results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error.message);
        },
      });
    }
  };

  const exelUser = () => {
    const header = [
      "ID",
      "Email",
      "First Name",
      "Last Name",
      "Phone",
      "Birthday",
      "Gender",
      "Nationality",
      "Country",
      "City",
      "District",
      "Ward",
      "Street",
      "Rank",
      "Point",
    ];

    const mapDataToHeader = (item) => {
      return {
        ID: item._id,
        Email: item.email,
        "First Name": item.firstName,
        "Last Name": item.lastName,
        Phone: item.phone,
        Birthday: item.DOB.slice(0, 10),
        Gender: item.gender ? "Male" : "Female",
        Nationality: item.nationality,
        Country: item.address.country,
        City: item.address.city,
        District: item.address.district,
        Ward: item.address.ward,
        Street: item.address.street,
        Rank: item.membershipLevel,
        Point: item.loyaltyPoints,
      };
    };

    const sortedData = users.data.map(mapDataToHeader);

    function handleDownloadExcel() {
      downloadExcel({
        fileName: "exelUser -> downloadExcel method",
        sheet: "rexelUser",
        tablePayload: {
          header,
          // accept two different data structures
          body: sortedData,
        },
      });
    }
    handleDownloadExcel();
  };

  return (
    <div className="p-6 bg-gray-100 flex-grow overflow-auto">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Backup & Restore Data
        </h2>

        {/* Export User Data */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-xl font-medium mb-4 text-gray-700">
            📤 Export User Data
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Export user data to a CSV file for backup or analysis.
            </p>
            <button
              onClick={exelUser}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 focus:outline-none"
            >
              <DownloadOutlined />
              Export CSV
            </button>
          </div>
        </div>

        {/* Upload User Data */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-medium mb-4 text-gray-700">
            📥 Upload User Data
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Upload a CSV file to restore or update user data.
            </p>
            <label
              htmlFor="fileUpload"
              className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              <UploadOutlined />
              Upload CSV
              <input
                id="fileUpload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
