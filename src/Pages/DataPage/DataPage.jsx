import React, { useState } from "react";

const DataPage = () => {
  const [backupPath, setBackupPath] = useState("");
  const [autoBackup, setAutoBackup] = useState(false);
  const [backupInterval, setBackupInterval] = useState(7);

  const handleBackup = () => {
    console.log("Backup saved to:", backupPath);
  };

  const handleRestore = () => {
    console.log("Restoring from:", backupPath);
  };

  const handleAutoBackupToggle = () => {
    setAutoBackup(!autoBackup);
  };

  return (
    <div className="p-6 bg-gray-50 flex-grow overflow-auto">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Backup and Restore</h2>

        {/* Save File Path */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Backup File Path
          </label>
          <input
            type="text"
            placeholder="Select or enter path"
            value={backupPath}
            onChange={(e) => setBackupPath(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Backup & Restore Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={handleBackup}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Save Backup
          </button>
          <button
            onClick={handleRestore}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
          >
            Restore Backup
          </button>
        </div>

        {/* Auto Backup Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span>Enable Auto Backup</span>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={autoBackup}
                onChange={handleAutoBackupToggle}
              />
              <span className="ml-2 text-gray-700">Enabled</span>
            </label>
          </div>
        </div>

        {/* Auto Backup Interval */}
        {autoBackup && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Backup Interval (days)
            </label>
            <input
              type="number"
              value={backupInterval}
              onChange={(e) => setBackupInterval(e.target.value)}
              className="mt-2 p-2 w-20 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        )}

        <div className="text-right">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
