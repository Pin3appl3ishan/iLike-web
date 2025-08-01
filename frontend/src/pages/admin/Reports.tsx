import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";

// Mock report data - replace with actual API calls
const mockReports = [
  {
    id: 1,
    reporter: {
      id: 101,
      name: "Aarav Sharma",
      email: "aarav.sharma@gmail.com",
    },
    reported: {
      id: 102,
      name: "Priya Adhikari",
      email: "priya.adhikari21@gmail.com",
    },
    reason: "Inappropriate content",
    status: "pending",
    date: "2024-01-15",
    details: "User posted inappropriate images in their profile.",
  },
  {
    id: 2,
    reporter: {
      id: 103,
      name: "Arjun Poudel",
      email: "arjun.poudel@gmail.com",
    },
    reported: { id: 104, name: "Sita Karki", email: "sita.karki@outlook.com" },
    reason: "Harassment",
    status: "in_review",
    date: "2024-01-14",
    details:
      "User sent multiple unsolicited messages and inappropriate comments.",
  },
  {
    id: 3,
    reporter: { id: 105, name: "Rohan Thapa", email: "rohan.thapa@gmail.com" },
    reported: {
      id: 106,
      name: "Anisha Maharjan",
      email: "anisha.mhrjn@gmail.com",
    },
    reason: "Fake profile",
    status: "resolved",
    date: "2024-01-10",
    details: "Profile is using celebrity photos and fake location information.",
  },
];

interface User {
  id: number;
  name: string;
  email: string;
}

interface Report {
  id: number;
  reporter: User;
  reported: User;
  reason: string;
  status: string;
  date: string;
  details: string;
}

const Reports = () => {
  const [reports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleStatusChange = (reportId: number, newStatus: string) => {
    // In a real app, this would be an API call
    console.log(`Changing report ${reportId} status to ${newStatus}`);
    // Update the report status in the state
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      in_review: "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
      dismissed: "bg-gray-100 text-gray-800",
    };

    const statusText = status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          statusClasses[status as keyof typeof statusClasses] || "bg-gray-100"
        }`}
      >
        {statusText}
      </span>
    );
  };

  return (
    <AdminLayout
      title="Reports Management"
      subtitle="Review and manage user reports"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Reports List */}
        <div className={`${selectedReport ? "lg:w-1/2" : "w-full"}`}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Reports
                </h3>
                <div className="flex space-x-2">
                  <select
                    className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-lg"
                    defaultValue="all"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_review">In Review</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
            <ul className="divide-y divide-gray-200">
              {reports.map((report) => (
                <li
                  key={report.id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedReport?.id === report.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-pink-600 truncate">
                        {report.reported.name} - {report.reason}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        {getStatusBadge(report.status)}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Reported by: {report.reporter.name}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Report Details */}
        {selectedReport ? (
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Report Details
                </h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500">
                    Reported User
                  </h4>
                  <div className="mt-1 flex items-center">
                    <img
                      className="h-10 w-10 rounded-full mr-3"
                      src={`https://i.pravatar.cc/150?u=${selectedReport.reported.email}`}
                      alt={selectedReport.reported.name}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedReport.reported.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedReport.reported.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500">
                    Reported By
                  </h4>
                  <div className="mt-1 flex items-center">
                    <img
                      className="h-10 w-10 rounded-full mr-3"
                      src={`https://i.pravatar.cc/150?u=${selectedReport.reporter.email}`}
                      alt={selectedReport.reporter.name}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedReport.reporter.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedReport.reporter.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500">Reason</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedReport.reason}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500">Details</h4>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                    {selectedReport.details}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <div className="mt-2">
                    {getStatusBadge(selectedReport.status)}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(selectedReport.id, "dismissed")
                      }
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      Dismiss
                    </button>
                    {selectedReport.status !== "resolved" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(selectedReport.id, "resolved")
                        }
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="text-center p-6">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No report selected
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a report from the list to view details
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Reports;
