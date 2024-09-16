import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navleft.css";
import { ReactComponent as ReportIcon } from '../assets/icons/report.svg';
import { ReactComponent as SettingIcon } from '../assets/icons/setting.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { ReactComponent as DemoIcon } from '../assets/icons/demo.svg';
import { ReactComponent as ScanIcon } from '../assets/icons/scan.svg';
import { ReactComponent as MedicalRecordIcon } from '../assets/icons/medicalrecord.svg';
import Avatar from '../assets/avatars/avatar.jpg';
import Tooltip from './Tooltip';
import YesNoDialog from './YesNoDialog';
export default function NavLeft() {
    const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
    const [notification, setNotification] = React.useState("");
    const navigate = useNavigate();

    const handleClickTest = () => {
        navigate('/test');
    };

    const handleClickLogout = () => {
        setOpenLogoutDialog(true);
        setNotification("Do you want to logout");
    };

    const handleAccept = (value) => {
        if (value) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            window.location.href = "/";
        } else if (!value) {
            setOpenLogoutDialog(false);
        }
    };
    
    return (
        <>
        { openLogoutDialog ? <YesNoDialog notification = {notification} handleAccept = {handleAccept}/> : ""}
        <div className="nav__left box--shadow-btn">
            <div className="nav__left--avatar">
                <div className="avatar">
                    <img src={Avatar} alt="Description of image" />
                </div>
            </div>
            <div className="nav__left--func">
                <div className="nav__left--head">
                    <Tooltip text="Acne scan daily">
                        <div className="icon">
                            <ScanIcon className="icon--element" />
                        </div>
                    </Tooltip>
                    <Tooltip text="Skin health monitoring">
                        <div className="icon" onClick={handleClickTest}>
                            <MedicalRecordIcon className="icon--element" />
                        </div>
                    </Tooltip>
                    <Tooltip text="Demo">
                        <div className="icon">
                            <DemoIcon className="icon--element" />
                        </div>
                    </Tooltip>
                </div>
                <div className="nav__left--bottom">
                    <Tooltip text="Settings">
                        <div className="icon">
                            <SettingIcon className="icon--element" />
                        </div>
                    </Tooltip>
                    <Tooltip text="Feedback">
                        <div className="icon">
                            <ReportIcon className="icon--element" />
                        </div>
                    </Tooltip>
                    <Tooltip text="Logout" >
                        <div className="icon" onClick={() => handleClickLogout()}>
                            <LogoutIcon className="icon--element" />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
        </>
    );
}
