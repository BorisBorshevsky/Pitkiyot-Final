package com.pitkiyot.android.pref;

import android.os.Bundle;
import android.preference.PreferenceFragment;
import com.pitkiyot.android.R;

/**
 * PitkiyotPreferencesFragment
 */
public class PitkiyotPreferencesFragment extends PreferenceFragment {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        addPreferencesFromResource(R.xml.preference);
    }
}