"use client";
import { Section1 } from "./_components/Section1";
import { Section2 } from "./_components/Section2";
import { Success } from "./_components/Success";
import { Section3 } from "./_components/Section3";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 && <Section1 step={step} setStep={setStep} />}
      {step === 2 && <Section2 step={step} setStep={setStep} />}
      {step === 3 && <Section3 step={step} setStep={setStep} />}
      {step === 4 && <Success />}
    </div>
  );
}
