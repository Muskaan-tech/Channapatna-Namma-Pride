package com.channapatna.nammapride

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.channapatna.nammapride.ui.ChannapatnaApp
import com.channapatna.nammapride.ui.theme.ChannapatnaTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ChannapatnaTheme {
                ChannapatnaApp()
            }
        }
    }
}
