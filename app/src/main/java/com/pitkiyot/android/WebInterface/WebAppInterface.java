package com.pitkiyot.android.WebInterface;

import android.app.Activity;
import android.app.Notification;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import com.pitkiyot.android.MainActivity;
import com.pitkiyot.android.pref.PitkiyotPreferencesHelper;
import com.pitkiyot.android.notifications.PitkiyotNotificationHelper;

public class WebAppInterface {
    private final Activity mContextActivity;

    /**
     * Instantiate the interface and set the context
     */
    public WebAppInterface(Activity mainActivity) {
        this.mContextActivity = mainActivity;
    }

    /**
     * Show a toast from the web page
     * @param toast toast content
     */
    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContextActivity, toast, Toast.LENGTH_SHORT).show();
    }

    /**
     * Schedule a notification
     * @param Title task title
     * @param Description
     * @param id
     * @param time delay in ms
     */
    @JavascriptInterface
    public void createNotification(String Title, String Description, int id, long time) {
        Notification notification = PitkiyotNotificationHelper.getNotification(mContextActivity, Title, Description, MainActivity.class);
        PitkiyotNotificationHelper.scheduleNotification(mContextActivity, notification, id, time);
    }

    /**
     * Cancel Scheduled notification
     * @param id notification id (task id)
     */
    @JavascriptInterface
    public void cancelNotification(int id) {
        PitkiyotNotificationHelper.cancelScheduledNotification(mContextActivity, id);
    }


    /**
     * Open preferences activity
     */
    @JavascriptInterface
    public void openPreferences() {
        PitkiyotPreferencesHelper.openPreferences(mContextActivity);
    }

}

