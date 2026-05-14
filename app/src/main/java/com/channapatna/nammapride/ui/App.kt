package com.channapatna.nammapride.ui

import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.ElevatedButton
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.foundation.layout.size
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.produceState
import androidx.compose.runtime.rememberCoroutineScope
import kotlinx.coroutines.launch
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import coil.compose.AsyncImage
import androidx.compose.ui.layout.ContentScale
import androidx.compose.foundation.layout.Box
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import com.google.ai.client.generativeai.GenerativeModel
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material3.Icon
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.foundation.layout.width
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.channapatna.nammapride.data.Artisan
import com.channapatna.nammapride.data.MockData
import com.channapatna.nammapride.data.Product
import com.channapatna.nammapride.data.FirestoreRepository
import com.channapatna.nammapride.data.VerificationCode
import com.channapatna.nammapride.data.findArtisanById
import com.channapatna.nammapride.data.findProductById
import com.channapatna.nammapride.data.findVerificationCode

private object Routes {
    const val HOME = "home"
    const val VERIFY = "verify"
    const val STORY = "story"
    const val DETAIL = "detail"
    const val ARTISAN = "artisan"
}

@Composable
fun ChannapatnaApp() {
    val navController = rememberNavController()
    val repo = remember { FirestoreRepository() }

    val productsState = produceState(initialValue = emptyList<Product>(), key1 = repo) {
        value = try {
            repo.getProducts()
        } catch (e: Exception) {
            emptyList()
        }
    }

    NavHost(navController = navController, startDestination = Routes.HOME) {
        composable(Routes.HOME) {
            HomeScreen(
                products = productsState.value,
                onProductClick = { product ->
                    navController.navigate("${Routes.DETAIL}/${Uri.encode(product.id)}")
                },
                onVerifyClick = { navController.navigate(Routes.VERIFY) }
            )
        }
        composable(Routes.VERIFY) {
            VerificationScreen(
                products = productsState.value,
                onBack = { navController.popBackStack() },
                onProductClick = { productId ->
                    navController.navigate("${Routes.DETAIL}/${Uri.encode(productId)}")
                }
            )
        }
        composable(
            route = "${Routes.DETAIL}/{productId}",
            arguments = listOf(navArgument("productId") { type = NavType.StringType })
        ) { backStackEntry ->
            val productId = backStackEntry.arguments?.getString("productId").orEmpty()
            val product = productsState.value.firstOrNull { it.id == productId }

            if (product == null) {
                EmptyState(message = "Product not found")
            } else {
                val artisanState = produceState<com.channapatna.nammapride.data.Artisan?>(initialValue = null, key1 = product.artisanId) {
                    value = try {
                        repo.getArtisan(product.artisanId)
                    } catch (e: Exception) {
                        null
                    }
                }

                ProductDetailScreen(
                    product = product,
                    artisan = artisanState.value,
                    onBack = { navController.popBackStack() },
                    onArtisanClick = { artisanId ->
                        navController.navigate("${Routes.ARTISAN}/${Uri.encode(artisanId)}")
                    },
                    onReadStory = {
                        navController.navigate("${Routes.STORY}/${Uri.encode(product.id)}")
                    }
                )
            }
        }
        composable(
            route = "${Routes.ARTISAN}/{artisanId}",
            arguments = listOf(navArgument("artisanId") { type = NavType.StringType })
        ) { backStackEntry ->
            val artisanId = backStackEntry.arguments?.getString("artisanId").orEmpty()
            val artisanState = produceState<com.channapatna.nammapride.data.Artisan?>(initialValue = null, key1 = artisanId) {
                value = try {
                    repo.getArtisan(artisanId)
                } catch (e: Exception) {
                    null
                }
            }

            val artisan = artisanState.value

            if (artisan == null) {
                EmptyState(message = "Artisan not found")
            } else {
                val productsForArtisan = productsState.value.filter { it.artisanId == artisan.id }

                ArtisanScreen(
                    artisan = artisan,
                    products = productsForArtisan,
                    onBack = { navController.popBackStack() },
                    onProductClick = { product ->
                        navController.navigate("${Routes.DETAIL}/${Uri.encode(product.id)}")
                    }
                )
            }
        }
        composable(
            route = "${Routes.STORY}/{productId}",
            arguments = listOf(navArgument("productId") { type = NavType.StringType })
        ) { backStackEntry ->
            val productId = backStackEntry.arguments?.getString("productId").orEmpty()
            val product = productsState.value.firstOrNull { it.id == productId }

            if (product == null) {
                EmptyState(message = "Story not found")
            } else {
                StoryScreen(
                    product = product,
                    onBack = { navController.popBackStack() }
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun HomeScreen(
    products: List<Product>,
    onProductClick: (Product) -> Unit,
    onVerifyClick: () -> Unit,
) {
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Channapatna Namma Pride") })
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
                shape = RoundedCornerShape(24.dp)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.AutoAwesome,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            "Authentic wooden toys & decor", 
                            style = MaterialTheme.typography.titleLarge, 
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Browse products, verify codes, and meet the artisan behind each piece.")
                    Spacer(modifier = Modifier.height(16.dp))
                    Button(
                        onClick = onVerifyClick,
                        shape = RoundedCornerShape(12.dp)
                    ) { 
                        Text("Verify a Product") 
                    }
                }
            }

            Text("Featured Products", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)

            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                contentPadding = PaddingValues(bottom = 16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(products) { product ->
                    ProductCard(product = product, onClick = { onProductClick(product) })
                }
            }
        }
    }
}

@Composable
private fun ProductCard(product: Product, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Column {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(130.dp)
                    .background(MaterialTheme.colorScheme.secondaryContainer)
            ) {
                if (product.imageUrl.isNotEmpty()) {
                    AsyncImage(
                        model = product.imageUrl,
                        contentDescription = product.name,
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )
                } else {
                    Text(
                        text = product.category,
                        modifier = Modifier.align(Alignment.Center),
                        style = MaterialTheme.typography.labelLarge
                    )
                }
            }
            Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(product.name, fontWeight = FontWeight.Bold, maxLines = 1)
                Text("₹${product.price}", color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.titleMedium)
                Text(
                    text = "ID: ${product.verificationCode}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.outline
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ProductDetailScreen(
    product: Product,
    artisan: Artisan?,
    onBack: () -> Unit,
    onArtisanClick: (String) -> Unit,
    onReadStory: () -> Unit,
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(product.name) },
                navigationIcon = { TextButton(onClick = onBack) { Text("Back") } }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                AsyncImage(
                    model = product.imageUrl,
                    contentDescription = product.name,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(250.dp)
                        .clip(RoundedCornerShape(16.dp))
                        .background(MaterialTheme.colorScheme.secondaryContainer),
                    contentScale = ContentScale.Crop
                )
            }
            item {
                Text(product.name, style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
                Text("₹${product.price}", style = MaterialTheme.typography.titleLarge, color = MaterialTheme.colorScheme.primary)
                Text(product.description)
            }
            item {
                Card {
                    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text("Verification Code", fontWeight = FontWeight.Bold)
                        Text(product.verificationCode)
                        Text("Use this code in the Verify screen to confirm the product is authentic.")
                    }
                }
            }
            item {
                Card(modifier = Modifier.clickable { artisan?.let { onArtisanClick(it.id) } }) {
                    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text("Artisan", fontWeight = FontWeight.Bold)
                        Text(artisan?.name ?: "Artisan not found")
                        Text(artisan?.location ?: "")
                    }
                }
            }
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    Button(onClick = onReadStory, modifier = Modifier.weight(1f)) { Text("Read Story") }
                    ElevatedButton(onClick = onBack, modifier = Modifier.weight(1f)) { Text("Back") }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun VerificationScreen(
    products: List<Product>,
    onBack: () -> Unit,
    onProductClick: (String) -> Unit,
) {
    var code by remember { mutableStateOf("") }
    var resultText by remember { mutableStateOf<String?>(null) }
    var matchedProduct by remember { mutableStateOf<Product?>(null) }

    val repo = remember { FirestoreRepository() }
    val scope = rememberCoroutineScope()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Verify Product") },
                navigationIcon = { TextButton(onClick = onBack) { Text("Back") } }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            OutlinedTextField(
                value = code,
                onValueChange = { code = it.take(6) },
                label = { Text("6-digit code") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )
            Button(
                onClick = {
                    if (code.length == 6) {
                        scope.launch {
                            val verification = try {
                                repo.verifyCode(code)
                            } catch (e: Exception) {
                                null
                            }
                            val product = verification?.let { v -> products.firstOrNull { it.id == v.productId } }
                            matchedProduct = product
                            resultText = if (matchedProduct != null) {
                                "✅ Authenticity Verified!"
                            } else {
                                "❌ Invalid or Unrecognized Code"
                            }
                        }
                    }
                },
                modifier = Modifier.fillMaxWidth(),
                enabled = code.length == 6
            ) {
                Text("Verify Authenticity")
            }

            resultText?.let { message ->
                Card(
                    colors = CardDefaults.cardColors(
                        containerColor = if (matchedProduct != null) 
                            MaterialTheme.colorScheme.primaryContainer 
                        else 
                            MaterialTheme.colorScheme.errorContainer
                    ),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp), 
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Text(
                            text = message, 
                            fontWeight = FontWeight.Bold,
                            style = MaterialTheme.typography.titleMedium,
                            color = if (matchedProduct != null)
                                MaterialTheme.colorScheme.onPrimaryContainer
                            else
                                MaterialTheme.colorScheme.onErrorContainer
                        )
                        
                        matchedProduct?.let { product ->
                            HorizontalDivider(color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.2f))
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                AsyncImage(
                                    model = product.imageUrl,
                                    contentDescription = null,
                                    modifier = Modifier.size(60.dp).clip(RoundedCornerShape(8.dp)),
                                    contentScale = ContentScale.Crop
                                )
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(product.name, fontWeight = FontWeight.Bold)
                                    Text(product.category, style = MaterialTheme.typography.bodySmall)
                                }
                                Button(onClick = { onProductClick(product.id) }) {
                                    Text("View")
                                }
                            }
                        }
                    }
                }
            }

            Card {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Text("Demo tip", fontWeight = FontWeight.Bold)
                    Text("Try 847291 or 956234 to show a successful verification.")
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ArtisanScreen(
    artisan: Artisan,
    products: List<Product>,
    onBack: () -> Unit,
    onProductClick: (Product) -> Unit,
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(artisan.name) },
                navigationIcon = { TextButton(onClick = onBack) { Text("Back") } }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                Card(
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.primaryContainer
                    ),
                    shape = RoundedCornerShape(24.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(20.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Text(
                            text = artisan.name,
                            style = MaterialTheme.typography.headlineMedium,
                            fontWeight = FontWeight.Bold
                        )
                        
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "📍 ${artisan.location}",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.8f)
                            )
                            Spacer(modifier = Modifier.width(12.dp))
                            Text(
                                text = "⭐ ${artisan.rating}",
                                style = MaterialTheme.typography.bodyMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        
                        HorizontalDivider(color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.2f))
                        
                        Text(
                            text = artisan.bio,
                            style = MaterialTheme.typography.bodyLarge,
                            lineHeight = 24.sp
                        )
                    }
                }
            }
            
            item {
                Text(
                    text = "Crafted by ${artisan.name.split(" ")[0]}",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(top = 8.dp)
                )
            }
            
            items(products.size) { index ->
                ProductCard(
                    product = products[index],
                    onClick = { onProductClick(products[index]) }
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun StoryScreen(
    product: Product,
    onBack: () -> Unit,
) {
    val coroutineScope = rememberCoroutineScope()
    var storyText by remember { mutableStateOf(product.story) }
    var isLoading by remember { mutableStateOf(false) }

    // Initialize Gemini (Replace with your API Key)
    val generativeModel = remember {
        GenerativeModel(
            modelName = "gemini-1.5-flash",
            apiKey = "AIzaSyCe550boFy3vD_Mr65av8hBsUNqIRNl3To"
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Magic Storyteller") },
                navigationIcon = { TextButton(onClick = onBack) { Text("Back") } },
                actions = {
                    if (isLoading) {
                        CircularProgressIndicator(
                            modifier = Modifier.padding(end = 16.dp),
                            strokeWidth = 2.dp,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            AsyncImage(
                model = product.imageUrl,
                contentDescription = product.name,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .clip(RoundedCornerShape(16.dp)),
                contentScale = ContentScale.Crop
            )

            Text(
                text = product.name,
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold
            )

            Card(
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.5f)
                ),
                shape = RoundedCornerShape(20.dp)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Text(
                        "The Living Legend",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = storyText,
                        style = MaterialTheme.typography.bodyLarge,
                        lineHeight = 24.sp
                    )
                }
            }

            Spacer(modifier = Modifier.weight(1f))

            Button(
                onClick = {
                    isLoading = true
                    coroutineScope.launch {
                        try {
                            val prompt = "Write a 3-sentence magical folk tale for a child about a Channapatna toy named ${product.name}. Mention its vibrant natural colors and the artisan's skill. Make it feel legendary."
                            val response = generativeModel.generateContent(prompt)
                            storyText = response.text ?: "The spirits of Channapatna are quiet today. Try again soon!"
                        } catch (e: Exception) {
                            storyText = "Error connecting to the magical realm: ${e.localizedMessage}"
                        } finally {
                            isLoading = false
                        }
                    }
                },
                modifier = Modifier.fillMaxWidth(),
                enabled = !isLoading,
                shape = RoundedCornerShape(12.dp)
            ) {
                Text("Generate New Story")
            }
        }
    }
}

@Composable
private fun EmptyState(message: String) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(message, style = MaterialTheme.typography.titleLarge)
    }
}
