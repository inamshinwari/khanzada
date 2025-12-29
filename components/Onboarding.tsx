
import React, { useState } from 'react';
import { BusinessType, BusinessConfig } from '../types';
import { BUSINESS_MODELS } from '../constants';

interface OnboardingProps {
  onComplete: (config: BusinessConfig) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BusinessConfig>>({
    name: '',
    type: BusinessType.RETAIL_SHOP,
    currency: 'USD',
    modules: []
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const finish = () => {
    const model = BUSINESS_MODELS.find(m => m.id === formData.type);
    onComplete({
      ...formData as BusinessConfig,
      modules: model?.modules || []
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-blue-600 p-10 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Welcome to BizScale</h2>
            <p className="text-blue-100 mb-8 opacity-80">Let's set up your business workspace. This takes less than 2 minutes.</p>
            
            <div className="space-y-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= s ? 'bg-white text-blue-600' : 'border-blue-400 text-blue-400'}`}>
                    {s}
                  </div>
                  <span className={step >= s ? 'font-bold' : 'opacity-50'}>
                    {s === 1 ? 'Identity' : s === 2 ? 'Business Type' : 'Ready!'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs opacity-50">© 2024 BizScale AI. All rights reserved.</div>
        </div>

        <div className="md:w-2/3 p-10">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold mb-6">Tell us about your business</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Legal Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Fresh Garden Market"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>
              <button
                disabled={!formData.name}
                onClick={handleNext}
                className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg"
              >
                Continue <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold mb-2">What's your industry?</h3>
              <p className="text-gray-500 mb-6">We'll customize your dashboard based on this selection.</p>
              <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-1">
                {BUSINESS_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setFormData({...formData, type: model.id})}
                    className={`p-4 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all ${
                      formData.type === model.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-100 hover:border-blue-200'
                    }`}
                  >
                    <div className="text-3xl">{model.icon}</div>
                    <span className="text-xs font-bold text-center leading-tight">{model.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={handleBack} className="flex-1 border border-gray-300 py-4 rounded-xl font-bold hover:bg-gray-50">Back</button>
                <button onClick={handleNext} className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg">Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in flex flex-col items-center justify-center text-center h-full">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">
                <i className="fas fa-check"></i>
              </div>
              <h3 className="text-3xl font-bold mb-4">All Set!</h3>
              <p className="text-gray-500 mb-8 max-w-sm">
                Your <b>{formData.name}</b> dashboard is ready. We've enabled <b>{BUSINESS_MODELS.find(m => m.id === formData.type)?.modules.length} modules</b> based on your business type.
              </p>
              <button
                onClick={finish}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-xl transition-all"
              >
                Launch Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
