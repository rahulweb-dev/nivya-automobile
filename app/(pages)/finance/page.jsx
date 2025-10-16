'use client';
import { useState } from 'react';

export default function FinancePage() {
  const [loanAmount, setLoanAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState(12);
  const [emiData, setEmiData] = useState([]);
  const [activeTab, setActiveTab] = useState('Salaried');

  const calculateEMI = () => {
    const months = [12, 24, 36, 48, 60, 72, 84];
    const results = months.map((m) => {
      const monthlyRate = interestRate / 12 / 100;
      const emi =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, m)) /
        (Math.pow(1 + monthlyRate, m) - 1);
      return { months: m, emi: Math.round(emi) };
    });
    setEmiData(results);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section
        className="relative flex items-center justify-center bg-center bg-cover h-60"
        style={{
          backgroundImage:
            "url('https://www.saboomaruti.in/assets/banners/finance-banner.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <h1 className="relative z-10 text-4xl font-bold text-white">
          Car Finance & Loan Assistance
        </h1>
      </section>

      {/* Main Content */}
      <div className="container grid grid-cols-1 gap-8 px-4 py-10 mx-auto lg:grid-cols-2">
        {/* Left Side */}
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="pb-2 mb-4 text-lg font-semibold border-b">
            My Contact Details:
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name *"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="tel"
              placeholder="Mobile No *"
              className="w-full p-2 border rounded-md"
            />
            <select className="w-full p-2 border rounded-md">
              <option>Select Outlet City *</option>
              <option>Hyderabad</option>
              <option>Secunderabad</option>
              <option>Vijayawada</option>
            </select>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <textarea
            placeholder="Comments"
            className="w-full p-2 mt-4 border rounded-md"
            rows={3}
          ></textarea>

          <h2 className="pb-2 mt-6 mb-4 text-lg font-semibold border-b">
            Share Loan Requirements:
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <select className="w-full p-2 border rounded-md">
              <option>Select Model *</option>
              <option>Swift</option>
              <option>Baleno</option>
              <option>Fronx</option>
              <option>Brezza</option>
            </select>
            <select className="w-full p-2 border rounded-md">
              <option>Select Purchase Time</option>
              <option>Immediately</option>
              <option>Within 1 Month</option>
              <option>1-3 Months</option>
            </select>
            <input
              type="number"
              placeholder="Loan Amount"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Loan Duration in Years"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button className="w-full px-6 py-2 mt-6 text-white bg-blue-700 rounded-md sm:w-auto hover:bg-blue-800">
            Get Your Car Loan Now
          </button>
        </div>

        {/* Right Side - EMI & Docs */}
        <div className="p-6 bg-white shadow rounded-xl">
          {/* EMI Calculator */}
          <h2 className="pb-2 mb-2 text-lg font-semibold border-b">
            Loan EMI Calculator:
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Looking for Car Loan? Just enter the loan amount and rate of
            interest to calculate EMI.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="p-2 border rounded-md"
              placeholder="Loan Amount"
            />
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="p-2 border rounded-md"
              placeholder="Rate Of Interest (%)"
            />
            <button
              onClick={calculateEMI}
              className="px-6 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800"
            >
              Calculate EMI
            </button>
          </div>

          {/* EMI Table */}
          {emiData.length > 0 && (
            <table className="w-full mt-4 border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left border">Months</th>
                  <th className="px-3 py-2 text-left border">EMI (₹)</th>
                </tr>
              </thead>
              <tbody>
                {emiData.map((item) => (
                  <tr key={item.months}>
                    <td className="px-3 py-2 border">{item.months}</td>
                    <td className="px-3 py-2 border">
                      ₹ {item.emi.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Documentation */}
          <h2 className="pb-2 mt-6 mb-2 text-lg font-semibold border-b">
            Documentation:
          </h2>

          {/* Tabs */}
          <div className="flex gap-4 mb-4">
            {['Salaried', 'Self Employed', 'Partnership'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1 rounded border ${
                  activeTab === tab
                    ? 'bg-red-50 text-red-600 border-red-600'
                    : 'bg-gray-50 text-gray-700 border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'Salaried' && (
            <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
              <li>4 Photographs</li>
              <li>Id Proof (PAN, Passport, etc.)</li>
              <li>Bank Statement (6 months)</li>
              <li>Repayment record for previous loans</li>
              <li>Residence Proof (Electricity Bill, Aadhaar)</li>
              <li>
                Income Proof (ITR last 2 Years, Salary Slip, Form 16 for 2 years)
              </li>
              <li>Rent Agreement (if applicable)</li>
            </ul>
          )}
          {activeTab === 'Self Employed' && (
            <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
              <li>4 Photographs</li>
              <li>Id Proof (PAN, Passport, etc.)</li>
              <li>Bank Statement (6 months)</li>
              <li>Business Registration Proof</li>
              <li>ITR for last 2 years</li>
              <li>Residence Proof</li>
            </ul>
          )}
          {activeTab === 'Partnership' && (
            <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
              <li>4 Photographs of Partners</li>
              <li>Partnership Deed</li>
              <li>Company Bank Statement (6 months)</li>
              <li>Company PAN & GST Certificate</li>
              <li>Residence Proof of Partners</li>
              <li>ITR last 2 Years</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
