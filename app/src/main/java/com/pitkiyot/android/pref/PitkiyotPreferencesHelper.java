package com.pitkiyot.android.pref;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.pitkiyot.android.notifications.NotificationReceiver;

/**
 * PitkiyotPreferencesHelper
 */
public class PitkiyotPreferencesHelper {

    public static void openPreferences(Activity mContextActivity) {
        Intent intent = new Intent();
        intent.setClass(mContextActivity, SetPreferenceActivity.class);
        mContextActivity.startActivityForResult(intent, 0);
    }

    public static void setPreferences(Activity mContextActivity){
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(mContextActivity);
        NotificationReceiver.setNotificationsDisabled(sharedPreferences.getBoolean("notifications_disabled", false));
    }


}
