package com.pitkiyot.pitkiyot;

import android.app.Notification;
import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by user on 5/20/2015.
 */
public class WebAppInterface {
    Context mContext;

    /**
     * Instantiate the interface and set the context
     */
    WebAppInterface(Context context) {
        mContext = context;
    }

    /**
     * Show a toast from the web page
     * @param toast
     */
    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

    /**
     * Schedule a notification
     * @param Title
     * @param Description
     * @param id
     * @param time delay in ms
     */
    @JavascriptInterface
    public void createNotification(String Title, String Description, int id, long time) {
        Notification notification = PitkiyotNotificationHelper.getNotification(mContext, Title, Description, MainActivity.class);
        PitkiyotNotificationHelper.scheduleNotification(mContext, notification, id, time);
    }

    /**
     * Cancel Scheduled notification
     * @param id notification id (task id)
     */
    @JavascriptInterface
    public void cancelNotification(int id) {
        PitkiyotNotificationHelper.cancelScheduledNotification(mContext, id);
    }

}

