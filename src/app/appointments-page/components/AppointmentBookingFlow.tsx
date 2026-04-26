'use client';
import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import Step1ServiceSelection from './Step1ServiceSelection';
import Step2PatientDetails from './Step2PatientDetails';
import Step3Confirmation from './Step3Confirmation';

export type BookingData = {
  service: string;
  dentistId: string;
  dentistName: string;
  date: string;
  timeSlot: string;
  patientName: string;
  email: string;
  phone: string;
  notes: string;
  isExistingPatient: boolean;
  consentGiven: boolean;
};

const initialData: BookingData = {
  service: '',
  dentistId: '',
  dentistName: '',
  date: '',
  timeSlot: '',
  patientName: '',
  email: '',
  phone: '',
  notes: '',
  isExistingPatient: false,
  consentGiven: false,
};

export default function AppointmentBookingFlow() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>(initialData);
  const [confirmationRef, setConfirmationRef] = useState('');

  const updateDataAction = (partial: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...partial }));
  };

  const goToStep = (s: number) => setStep(s);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-10 lg:py-14">
      <StepIndicator currentStep={step} />

      <div className="mt-8">
        {step === 1 && (
          <Step1ServiceSelection
            data={bookingData}
            updateDataAction={updateDataAction}
            onNextAction={() => goToStep(2)}
          />
        )}
        {step === 2 && (
          <Step2PatientDetails
            data={bookingData}
            updateDataAction={updateDataAction}
            onBackAction={() => goToStep(1)}
            onNextAction={(ref: string) => { setConfirmationRef(ref); goToStep(3); }}
          />
        )}
        {step === 3 && (
          <Step3Confirmation
            data={bookingData}
            confirmationRef={confirmationRef}
            onBookAnotherAction={() => { setBookingData(initialData); setStep(1); }}
          />
        )}
      </div>
    </div>
  );
}