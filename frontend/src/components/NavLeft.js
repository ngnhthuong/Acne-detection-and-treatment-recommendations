import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./navleft.css";
import { ReactComponent as ReportIcon } from '../assets/icons/report.svg';
import { ReactComponent as SettingIcon } from '../assets/icons/setting.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { ReactComponent as DemoIcon } from '../assets/icons/demo.svg';
import { ReactComponent as ScanIcon } from '../assets/icons/scan.svg';
import { ReactComponent as MedicalRecordIcon } from '../assets/icons/medicalrecord.svg';
import Avatar from '../assets/avatars/avatar.jpg';

const Tooltip = ({ text, children }) => {
    return (
        <div className="tooltip">
            {children}
            <div className="tooltiptext box--shadow-btn">{text}</div>
        </div>
    );
};

export default function NavLeft() {
    const navigate = useNavigate();

    const handleClickTest = () => {
        navigate('/test');
    };

    return (
        <div className="nav__left box--shadow-btn">
            <div className="nav__left--avatar">
                <div className="avatar">
                    <img src={Avatar} alt="Description of image" />
                </div>
            </div>
            <div className="nav__left--func">
                <div className="nav__left--head">
                    <Tooltip text="Demo">
                        <div className="icon">
                            <DemoIcon className="icon--element" />
                        </div>
                    </Tooltip>
                    <Tooltip text="Acne scan">
                        <div className="icon">
                            <ScanIcon className="icon--element" />
                        </div>
                    </Tooltip>
                    <Tooltip text="Medical Record">
                        <div className="icon" onClick={handleClickTest}>
                            <MedicalRecordIcon className="icon--element" />
                        </div>
                    </Tooltip>
                </div>
                <div className="nav__left--bottom">
                    <Tooltip text="Settings">
                        <div className="icon">
                            <SettingIcon className="icon--element" />
                        </div>
                    </Tooltip>
                    <Tooltip text="Logout">
                        <div className="icon">
                            <LogoutIcon className="icon--element" />
                        </div>
                    </Tooltip>
                    <Tooltip text="Report">
                        <div className="icon">
                            <ReportIcon className="icon--element" />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
