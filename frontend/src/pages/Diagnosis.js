// Diagnosis.js
import React from 'react';
import NavLeft from '../components/NavLeft';
import RightDiagnosis from '../components/RightDiagnosis';
import './diagnosis.css';
export default function Diagnosis(){
  return (
    <div className="diagnosis">
      <div className="area__left">
        <NavLeft/>
      </div>
      <div className="area__right">
        <RightDiagnosis/>
      </div>
    </div>
  );
};
