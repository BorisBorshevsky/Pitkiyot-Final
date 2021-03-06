package com.pitkiyot.android.notifications;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.SystemClock;

import com.pitkiyot.android.R;

public class PitkiyotNotificationHelper {

    /**
     * Schedule Notification
     *
     * @param mContext       context
     * @param notification   notification
     * @param notificationId notification id -> same as task id
     * @param delay          in ms
     */
    public static void scheduleNotification(Context mContext, Notification notification, int notificationId, long delay) {
        Intent notificationIntent = new Intent(mContext, NotificationReceiver.class);
        notificationIntent.putExtra(NotificationReceiver.NOTIFICATION_ID, notificationId);
        notificationIntent.putExtra(NotificationReceiver.NOTIFICATION, notification);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(mContext, notificationId, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        long futureInMillis = SystemClock.elapsedRealtime() + delay;
        AlarmManager alarmManager = (AlarmManager) mContext.getSystemService(Context.ALARM_SERVICE);
        alarmManager.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, futureInMillis, pendingIntent);
    }

    /**
     * Create a notification
     *
     * @param mContext     context
     * @param contentTitle title
     * @param contentText  desc
     * @param clazz        the activity to go on click
     * @return
     */
    public static Notification getNotification(Context mContext, String contentTitle, String contentText, Class clazz) {
        Notification.Builder builder = new Notification.Builder(mContext);
        builder.setContentTitle(contentTitle);
        builder.setContentText(contentText);
        builder.setAutoCancel(true); //close on click
        builder.setSmallIcon(R.drawable.logo_pitkiyot);
        builder.setContentIntent(PendingIntent.getActivity(mContext, 0, new Intent(mContext, clazz), 0));
        return builder.build();
    }

    /**
     * cancel Scheduled Notification
     *
     * @param mContext context
     * @param notificationId notification ID
     */
    public static void cancelScheduledNotification(Context mContext, int notificationId) {
        Intent notificationIntent = new Intent(mContext, NotificationReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(mContext, notificationId, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        AlarmManager alarmManager = (AlarmManager) mContext.getSystemService(Context.ALARM_SERVICE);
        alarmManager.cancel(pendingIntent);
    }


}
