// Diagnosis.js
import React from 'react';
import "./navleft.css";
import { ReactComponent as ReportIcon } from '../assets/icons/report.svg';
import { ReactComponent as SettingIcon } from '../assets/icons/setting.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { ReactComponent as DemoIcon } from '../assets/icons/demo.svg';
import { ReactComponent as ScanIcon } from '../assets/icons/scan.svg';
import { ReactComponent as MedicalRecordIcon } from '../assets/icons/medicalrecord.svg';
import Avatar from '../assets/avatars/avatar.jpg';
export default function NavLeft(){
  return (
    <div className="nav__left">
        <div className="nav__left--avatar">
            <div className="avatar">
                <img src={Avatar} alt="Description of image" />
            </div>
        </div>
        <div className="nav__left--func">
            <div className="nav__left--head">
                <div className="icon">
                    <DemoIcon className="icon--element" />
                </div>
                <div className="icon">
                    <ScanIcon className="icon--element" />
                </div>
                <div className="icon">
                    <MedicalRecordIcon className="icon--element" />
                </div>
            </div>
            <div className="nav__left--bottom">
                <div className="icon">
                    <SettingIcon className="icon--element" />
                </div>
                <div className="icon">
                    <LogoutIcon className="icon--element"/>
                </div>
                <div className="icon">
                    <ReportIcon className="icon--element"/>
                </div>
            </div>
        </div>
    </div>
  );
};
