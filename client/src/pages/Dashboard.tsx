import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { FileCheck, Clock, CheckCircle, XCircle } from 'lucide-react';
import { fetchKYCStatus } from '../api/kyc';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [kycStatus, setKycStatus] = useState<string | null>(null);

  useEffect(() => {
    async function fetchKycStatus() {
      if (!user) return;

      const { data } = await fetchKYCStatus(user.id);

      if (data) {
        setKycStatus(data.kyc.status);
      }
    }

    fetchKycStatus();
  }, [user]);

  const getStatusDisplay = () => {
    if (!kycStatus) {
      return {
        icon: <FileCheck className="h-12 w-12 text-blue-500" />,
        text: 'Submit KYC',
        description: 'Complete your KYC verification to access all features',
        action: (
          <Link
            to="/kyc-submission"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Start KYC Process
          </Link>
        ),
      };
    }

    const statusConfig = {
      pending: {
        icon: <Clock className="h-12 w-12 text-yellow-500" />,
        text: 'KYC Pending',
        description: 'Your KYC submission is being reviewed',
      },
      approved: {
        icon: <CheckCircle className="h-12 w-12 text-green-500" />,
        text: 'KYC Approved',
        description: 'Your identity has been verified',
      },
      rejected: {
        icon: <XCircle className="h-12 w-12 text-red-500" />,
        text: 'KYC Rejected',
        description: 'Please submit a new KYC application',
        action: (
          <Link
            to="/kyc-submission"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Resubmit KYC
          </Link>
        ),
      },
    }[kycStatus];

    return statusConfig;
  };

  const status = getStatusDisplay();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">{status?.icon}</div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{status?.text}</h3>
              <p className="mt-1 text-sm text-gray-500">{status?.description}</p>
              {status?.action && <div className="mt-4">{status?.action}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}