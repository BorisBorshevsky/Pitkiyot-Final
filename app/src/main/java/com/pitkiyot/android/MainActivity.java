package com.pitkiyot.android;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.pitkiyot.android.pref.PitkiyotPreferencesHelper;
import com.pitkiyot.android.WebInterface.WebAppInterface;

public class MainActivity extends Activity {

    private static final String FILE_ANDROID_ASSET_PREFIX = "file:///android_asset/";
    private static final String MAIN_HTML_FILE = "index.html";

    private WebView webView;
    private AdView adView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = (WebView) findViewById(R.id.webview);


        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        webSettings.setDomStorageEnabled(true); //enable dom storage api
        webSettings.setDatabaseEnabled(true); //enable database storage api
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT); //disable screen rotation

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.JELLY_BEAN) {
            webSettings.setAllowFileAccessFromFileURLs(true);
            webSettings.setAllowUniversalAccessFromFileURLs(true);
        }

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        }

        //Ad part
        adView = (AdView) findViewById(R.id.adView);
        AdRequest adRequest = new AdRequest.Builder().build();
        adView.loadAd(adRequest);
        // end ad part

        webView.addJavascriptInterface(new WebAppInterface(this), "Android");
        webView.loadUrl(FILE_ANDROID_ASSET_PREFIX + MAIN_HTML_FILE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        PitkiyotPreferencesHelper.setPreferences(this);
    }


    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);

        // Save the state of the WebView
        webView.saveState(outState);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);

        // Restore the state of the WebView
        webView.restoreState(savedInstanceState);
    }
}
