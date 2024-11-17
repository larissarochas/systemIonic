import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../main";
import { ImCheckmark } from "react-icons/im";

import "./Notification.css";

export interface NotificationConfig {
    duration: number,
    status: keyof typeof NotificationCodes,
    msg: string
}

export interface NotificationContext {
    notification: NotificationConfig | null,
    setNotification: React.Dispatch<React.SetStateAction<NotificationConfig | null>>
}

const NotificationCodes = {
    accepted: "SESSÃO AGENDADA"
}

const Notification = () => {
    const notificationContext = useContext(AppContext)?.notificationContext;
    const [showing, setShowing] = useState(false);
    const [currentNotification, setCurrentNotification] = useState<NotificationConfig>();

    let currentNotificationElement = useRef<HTMLDivElement | null>(null);
    let currentNotificationLeavingTimeout = useRef<NodeJS.Timeout | null>(null);
    let currentNotificationTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (notificationContext?.notification) {
            const timer = notificationContext.notification.duration;
            setCurrentNotification(notificationContext.notification);

            notificationContext.setNotification(null);
            setShowing(true);

            if (currentNotificationTimeout.current) clearTimeout(currentNotificationTimeout.current);
            if (currentNotificationLeavingTimeout.current) clearTimeout(currentNotificationLeavingTimeout.current);

            currentNotificationLeavingTimeout.current = setTimeout(() => {
                if (currentNotificationElement.current) {
                    currentNotificationElement.current.classList.add("leaving");
                    
                }
            }, timer * 1000);
            
            currentNotificationTimeout.current = setTimeout(() => {
                setShowing(false);
            }, (timer + 1) * 1000);
        }

        return () => {
            if (currentNotificationElement.current) currentNotificationElement.current.classList.remove("leaving");
        }

    }, [notificationContext?.notification])
    
    if (showing && currentNotification) {
        return (
            <div id="notification" ref={currentNotificationElement}>
                <ImCheckmark id="notification-icon" />
                <div id="notification-content">
                    <div id="notification-content-title">
                        <h3>{NotificationCodes[currentNotification.status]}</h3>
                    </div>
                    <div id="notification-content-text">
                        <p>{currentNotification.msg}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notification;