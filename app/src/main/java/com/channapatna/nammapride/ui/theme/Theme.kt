package com.channapatna.nammapride.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColors = lightColorScheme(
    primary              = WoodBrown,
    onPrimary            = Color.White,
    primaryContainer     = SoftSand,
    onPrimaryContainer   = WoodBrown,
    secondary            = WarmGold,
    onSecondary          = Color.White,
    secondaryContainer   = WarmGold.copy(alpha = 0.15f),
    onSecondaryContainer = TextPrimary,
    tertiary             = LeafGreen,
    onTertiary           = Color.White,
    tertiaryContainer    = LeafGreen.copy(alpha = 0.12f),
    onTertiaryContainer  = LeafGreen,
    background           = Cream,
    onBackground         = TextPrimary,
    surface              = CardWhite,
    onSurface            = TextPrimary,
    surfaceVariant       = SoftSand,
    onSurfaceVariant     = TextSecondary,
    outline              = Divider,
    error                = Color(0xFFD32F2F),
    onError              = Color.White,
    errorContainer       = Color(0xFFFFEBEE),
    onErrorContainer     = Color(0xFFB71C1C),
)

@Composable
fun ChannapatnaTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColors,
        typography  = Typography,
        content     = content
    )
}
