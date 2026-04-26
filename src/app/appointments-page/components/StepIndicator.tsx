import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  { num: 1, label: 'Service & Doctor' },
  { num: 2, label: 'Your Details' },
  { num: 3, label: 'Confirmed' },
];

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-0">
        {steps.map((step, i) => (
          <React.Fragment key={`step-${step.num}`}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  currentStep > step.num
                    ? 'bg-teal-500 text-white'
                    : currentStep === step.num
                    ? 'bg-navy-600 text-white ring-4 ring-navy-100' :'bg-slate-200 text-slate-400'
                }`}
              >
                {currentStep > step.num ? <Check size={16} /> : step.num}
              </div>
              <span
                className={`mt-2 text-xs font-medium whitespace-nowrap ${
                  currentStep >= step.num ? 'text-navy-700' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-24 lg:w-40 h-0.5 mb-5 mx-2 transition-all duration-300 ${
                  currentStep > step.num ? 'bg-teal-500' : 'bg-slate-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}