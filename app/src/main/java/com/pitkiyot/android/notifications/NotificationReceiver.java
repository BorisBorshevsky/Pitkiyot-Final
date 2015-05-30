package com.pitkiyot.android.notifications;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class NotificationReceiver extends BroadcastReceiver {

    public static final String NOTIFICATION_ID = "notification-id";
    public static final String NOTIFICATION = "notification";

    private static boolean notificationsDisabled = false;

    /**
     * set notification disabled
     * @param notificationsDisabled is disabled
     */
    public static void setNotificationsDisabled(boolean notificationsDisabled) {
        NotificationReceiver.notificationsDisabled = notificationsDisabled;
    }

    /**
     *  is Notifications Disabled
     * @return is Notifications Disabled
     */
    public static boolean isNotificationsDisabled() {
        return notificationsDisabled;
    }


    @Override
    public void onReceive(Context context, Intent intent) {
        if (!isNotificationsDisabled()) {
            NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            Notification notification = intent.getParcelableExtra(NOTIFICATION);
            notification.flags |= Notification.FLAG_AUTO_CANCEL;
            int id = intent.getIntExtra(NOTIFICATION_ID, 1);
            notificationManager.notify(id, notification);
        }
    }
}