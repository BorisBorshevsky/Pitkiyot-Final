package com.pitkiyot.android.pref;

import android.app.Activity;
import android.os.Bundle;

/**
 * SetPreferenceActivity
 */
public class SetPreferenceActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getFragmentManager().beginTransaction().replace(android.R.id.content, new PitkiyotPreferencesFragment()).commit();
    }
}
