import React, { useState } from 'react';
import { Heart, ShieldCheck, Lock, CreditCard, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Project, Donation } from '../types';

interface DonationSectionProps {
  projects: Project[];
  preselectedProjectId?: string;
  onDonationSuccess: (donation: Donation) => void;
  recentDonations: Donation[];
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  projects,
  preselectedProjectId,
  onDonationSuccess,
  recentDonations
}) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState<number>(30);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string>(preselectedProjectId || 'general');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [giftAid, setGiftAid] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'digital_wallet'>('card');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const presetAmounts = [15, 30, 60, 120, 250];

  const currentAmount = isCustom ? Number(customAmount) || 0 : amount;

  // Tangible Impact calculation
  const getImpactDescription = (amt: number) => {
    if (amt >= 250) {
      return 'Powers refrigerated mobile delivery van transport for up to 50 homebound neighbors and disabled residents.';
    }
    if (amt >= 120) {
      return 'Funds ingredients, curriculum, and equipment for a 4-week youth scratch-cooking cohort.';
    }
    if (amt >= 60) {
      return 'Supplies organic seeds, compost beds, and durable hand tools for an entire urban garden season.';
    }
    if (amt >= 30) {
      return 'Provides a family fresh produce box packed with crisp seasonal greens, whole grains, and cold-pressed oil.';
    }
    return 'Prepares and serves 5 hot, wholesome scratch-made meals in our open community kitchen.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount <= 0) return;

    setIsSubmitting(true);

    try {
      // Simulate secure processing delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const effectiveName = isAnonymous ? 'Anonymous Supporter' : (donorName.trim() || 'Generous Supporter');
      const effectiveEmail = donorEmail.trim() || 'supporter@feedlink.org';

      const res = await (await import('../services/api')).api.processDonation({
        donorName: effectiveName,
        donorEmail: effectiveEmail,
        amount: currentAmount,
        frequency,
        projectId,
        giftAid,
        message: message.trim() || undefined,
        paymentMethod
      });

      if (res.success && res.donation) {
        onDonationSuccess(res.donation);
        // Reset form
        setMessage('');
      }
    } catch (err) {
      console.error('Donation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="donate" className="py-16 sm:py-20 bg-slate-100/60 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
            Transparent Giving
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Support Local Food &amp; Connection
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Every contribution directly powers hot meals, seed banks, and neighborhood distribution. 100% of public funds are accounted for in our real-time ledger.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Donation Form (8 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Frequency Selector */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Donation Schedule
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                      frequency === 'one-time'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    One-Time Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      frequency === 'monthly'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>Monthly Supporter</span>
                    <span className="text-2xs bg-orange-100 text-orange-700 font-semibold px-1.5 py-0.5 rounded">
                      Vital
                    </span>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Select Amount (GBP)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setAmount(preset);
                        setIsCustom(false);
                      }}
                      className={`py-3 px-2 text-sm sm:text-base font-extrabold rounded-xl border transition-all font-mono tabular-nums ${
                        !isCustom && amount === preset
                          ? 'border-orange-600 bg-orange-50 text-orange-700 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                      }`}
                    >
                      £{preset}
                    </button>
                  ))}
                </div>

                {/* Custom Amount option */}
                <div className="mt-3">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono">
                      £
                    </span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Or enter custom amount..."
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setIsCustom(true);
                      }}
                      className={`w-full pl-8 pr-4 py-2.5 text-sm font-semibold rounded-xl border ${
                        isCustom
                          ? 'border-orange-500 ring-2 ring-orange-500/20'
                          : 'border-slate-200'
                      } text-slate-900 bg-white focus:outline-none`}
                    />
                  </div>
                </div>
              </div>

              {/* Live Impact Calculator Box */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50/70 to-amber-50/70 border border-orange-200/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-800 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>Your Tangible Community Impact</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-800">
                  {getImpactDescription(currentAmount)}
                </p>
                {giftAid && (
                  <p className="text-2xs text-emerald-700 pt-1">
                    + With Gift Aid, your £{currentAmount} becomes <strong className="font-mono tabular-nums">£{(currentAmount * 1.25).toFixed(2)}</strong> at zero extra cost to you.
                  </p>
                )}
              </div>

              {/* Project Designation */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Designate Your Gift
                </label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-slate-800 font-medium"
                >
                  <option value="general">General Community Fund (Where Needed Most)</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Donor Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder={isAnonymous ? 'Anonymous Donor' : 'e.g. Jane Doe'}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-slate-900 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Email for Official Receipt
                  </label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-slate-900"
                  />
                </div>
              </div>

              {/* Checkboxes: Anonymous & Gift Aid */}
              <div className="space-y-3 pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-orange-600 rounded border-slate-300 focus:ring-orange-500"
                  />
                  <span>Keep my name anonymous on the public community ledger</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    checked={giftAid}
                    onChange={(e) => setGiftAid(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-slate-900">Add 25% Gift Aid declaration</span>
                    <p className="text-2xs text-slate-500 mt-0.5">
                      I am a UK taxpayer. Boost my donation by 25p for every £1 given at no extra cost to me.
                    </p>
                  </div>
                </label>
              </div>

              {/* Optional message */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Words of Support (Optional)
                </label>
                <input
                  type="text"
                  maxLength={120}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Thank you to all the kitchen volunteers!"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-slate-900"
                />
              </div>

              {/* Secure Payment Simulation */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Payment Method
                  </label>
                  <span className="text-2xs text-slate-400 flex items-center gap-1 font-mono">
                    <Lock className="w-3 h-3 text-emerald-600" /> 256-Bit SSL Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-2 text-xs font-bold rounded-lg border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-orange-600 bg-orange-50 text-orange-700'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('digital_wallet')}
                    className={`py-2 px-2 text-xs font-bold rounded-lg border text-center transition-all ${
                      paymentMethod === 'digital_wallet'
                        ? 'border-orange-600 bg-orange-50 text-orange-700'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Apple / Google Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`py-2 px-2 text-xs font-bold rounded-lg border text-center transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-orange-600 bg-orange-50 text-orange-700'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Bank Transfer
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                    <div>
                      <input
                        type="text"
                        placeholder="Card Number (e.g. 4242 •••• •••• 4242)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="CVC"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'digital_wallet' && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 text-center">
                    Instant 1-Click checkout will authorize via your device's biometric authentication upon submission.
                  </div>
                )}

                {paymentMethod === 'bank_transfer' && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                    <div className="font-semibold text-slate-800">FEEDLINK Community Account (Simulated):</div>
                    <div className="font-mono text-2xs">Sort Code: 20-44-08 · Account: 71094823</div>
                    <div className="text-2xs text-slate-500">Your unique reference will be generated on receipt.</div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || currentAmount <= 0}
                className="w-full py-4 bg-orange-600 hover:bg-orange-500 active:scale-98 disabled:opacity-50 text-white font-extrabold text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Secure Payment...
                  </span>
                ) : (
                  <>
                    <Heart className="w-5 h-5 fill-white" />
                    <span>
                      Complete {frequency === 'monthly' ? 'Monthly' : ''} Gift of £{currentAmount}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Side Info & Live Ledger (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Trust & Transparency card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Our Community Promise
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                FEEDLINK operates under strict financial stewardship. We publish all project expenses, equipment receipts, and distribution tallies directly to our platform so you can track where every penny goes.
              </p>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Immediate digital tax receipt and ledger reference</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Opt-out of public display with one click</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero administrative deduction on project donations</span>
                </div>
              </div>
            </div>

            {/* Live Transparent Donation Ledger */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">
                  Live Public Ledger
                </h3>
                <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">
                  Verified Entries
                </span>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {recentDonations.slice(0, 5).map((don) => (
                  <div
                    key={don.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{don.donorName}</span>
                      <span className="font-extrabold font-mono tabular-nums text-slate-950">
                        £{don.amount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-2xs text-slate-500">
                      <span className="truncate max-w-[180px]">{don.projectTitle}</span>
                      <span className="font-mono">{don.receiptNumber}</span>
                    </div>
                    {don.message && (
                      <p className="italic text-slate-600 text-2xs pt-1 border-t border-slate-200/60">
                        "{don.message}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
