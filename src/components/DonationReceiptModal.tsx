import React from 'react';
import { X, CheckCircle, Printer, Download, Heart, ShieldCheck } from 'lucide-react';
import { Donation } from '../types';

interface DonationReceiptModalProps {
  donation: Donation | null;
  onClose: () => void;
}

export const DonationReceiptModal: React.FC<DonationReceiptModalProps> = ({ donation, onClose }) => {
  if (!donation) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-modal-title"
      >
        {/* Top Banner */}
        <div className="bg-emerald-600 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white hover:bg-emerald-700 rounded-full transition-colors"
            aria-label="Close receipt"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-7 h-7 text-white" />
          </div>

          <h2 id="receipt-modal-title" className="text-xl font-extrabold tracking-tight">
            Thank You for Changing Lives!
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            Your generous gift is securely recorded on the FEEDLINK ledger.
          </p>
        </div>

        {/* Printable Official Receipt Body */}
        <div id="printable-receipt" className="p-6 space-y-5 text-slate-800">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">
                Official Receipt Number
              </span>
              <span className="text-base font-extrabold font-mono text-slate-900">
                {donation.receiptNumber}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Date &amp; Time</span>
              <span className="text-xs font-semibold text-slate-700">
                {new Date(donation.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Amount details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Contribution Amount</span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                £{donation.amount.toFixed(2)}
              </span>
            </div>
            {donation.giftAid && (
              <div className="flex items-center justify-between text-xs text-emerald-700 pt-1 border-t border-slate-200">
                <span>Gift Aid Reclaim (+25% value)</span>
                <span className="font-bold font-mono tabular-nums">+£{(donation.amount * 0.25).toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Frequency</span>
              <span className="capitalize font-medium text-slate-700">{donation.frequency}</span>
            </div>
          </div>

          {/* Donor & Allocation Details */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Donor Name</span>
              <span className="font-semibold text-slate-800">{donation.donorName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Donor Email</span>
              <span className="font-semibold text-slate-800">{donation.donorEmail}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Designated Initiative</span>
              <span className="font-semibold text-slate-800 text-right max-w-xs truncate">
                {donation.projectTitle}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Payment Reference</span>
              <span className="font-mono text-slate-700 capitalize">{donation.paymentMethod.replace('_', ' ')} (Verified)</span>
            </div>
            {donation.message && (
              <div className="pt-2">
                <span className="text-slate-500 block mb-1">Donor Note:</span>
                <p className="italic text-slate-700 bg-orange-50/70 p-2.5 rounded-lg border border-orange-100">
                  "{donation.message}"
                </p>
              </div>
            )}
          </div>

          {/* Legal / Assurance note */}
          <div className="pt-2 flex items-start gap-2 text-2xs text-slate-500 leading-tight">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              FEEDLINK is committed to absolute community transparency. 100% of public contributions are allocated directly to project equipment, fresh ingredients, and community coordination.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-xl hover:bg-white transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
