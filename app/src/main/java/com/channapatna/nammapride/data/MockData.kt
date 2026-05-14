package com.channapatna.nammapride.data

object MockData {

    val artisans = listOf(
        Artisan(
            id = "artisan_001",
            name = "Nagaraj K.",
            bio = "A third-generation master craftsman from Channapatna, Nagaraj has spent 28 years perfecting the traditional lacquering technique passed down by his grandfather. His work has been exhibited in Delhi and London.",
            location = "Channapatna, Karnataka",
            rating = 5.0,
            photoUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop",
            specialty = "Lacquered Dolls & Figurines",
            yearsExperience = 28
        ),
        Artisan(
            id = "artisan_002",
            name = "Shobha Devi",
            bio = "Shobha is celebrated for her vibrant hand-painted decor. Running a small family workshop in Mysuru, she specialises in intricate floral motifs and heirloom-quality vases that blend tradition with modern aesthetics.",
            location = "Mysuru, Karnataka",
            rating = 4.8,
            photoUrl = "https://images.unsplash.com/photo-1494790108755-2616b612b5d5?w=200&q=80&auto=format&fit=crop",
            specialty = "Painted Decor & Vases",
            yearsExperience = 15
        ),
        Artisan(
            id = "artisan_003",
            name = "Ravi Shankar",
            bio = "Ravi's spinning tops and rocking horses have delighted children across Karnataka for two decades. He uses only sustainably sourced ivory wood and natural dyes, keeping the Channapatna tradition alive.",
            location = "Channapatna, Karnataka",
            rating = 4.9,
            photoUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop",
            specialty = "Toys & Moving Figurines",
            yearsExperience = 20
        )
    )

    val products = listOf(
        Product(
            id = "prod_001",
            name = "Lacquered Gombe Doll",
            price = 12.00,
            category = "Dolls",
            imageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
            artisanId = "artisan_001",
            verificationCode = "847291",
            description = "A stunning hand-lacquered Gombe doll crafted using ivory wood. Each layer of vibrant colour is applied with natural dyes and polished to a mirror shine using a traditional lathe technique unique to Channapatna.",
            story = "In a sunlit workshop on the outskirts of Channapatna, Nagaraj begins each morning by selecting the finest piece of ivory wood. Over three days, he shapes, sands, and lacquers this little doll by hand — each coat dried in the Karnataka sun before the next is applied. She is not just a toy; she is a letter from a craftsman to a child, written in colour.",
            rating = 4.9,
            isVerified = true
        ),
        Product(
            id = "prod_002",
            name = "Wooden Rocking Horse",
            price = 34.50,
            category = "Toys",
            imageUrl = "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80&auto=format&fit=crop",
            artisanId = "artisan_003",
            verificationCode = "731456",
            description = "A beautifully crafted rocking horse made from sustainably sourced ivory wood. Hand-painted with non-toxic natural dyes in the signature Channapatna style. A timeless heirloom for children and collectors alike.",
            story = "Ravi carves each rocking horse from a single block of ivory wood, shaping the mane and tail with a small hand chisel. The gentle rocking motion is the result of precisely balanced runners, a technique Ravi learned from his father at the age of twelve.",
            rating = 4.7,
            isVerified = true
        ),
        Product(
            id = "prod_003",
            name = "Handcrafted Elephant",
            price = 18.50,
            category = "Toys",
            imageUrl = "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80&auto=format&fit=crop",
            artisanId = "artisan_001",
            verificationCode = "956234",
            description = "This majestic wooden elephant celebrates the cultural significance of elephants in Karnataka. Detailed trunk, tusks and a ceremonial cloth painted in gold and red make it a showstopper on any shelf.",
            story = "The elephant holds a sacred place in Karnataka's heart. Nagaraj spends an entire afternoon shaping the trunk alone — the slight upward curve that signifies good luck is the last detail he adds before signing the base.",
            rating = 4.6,
            isVerified = true
        ),
        Product(
            id = "prod_004",
            name = "Traditional Gombe",
            price = 12.00,
            category = "Dolls",
            imageUrl = "https://images.unsplash.com/photo-1596461402482-97faab703822?w=600&q=80&auto=format&fit=crop",
            artisanId = "artisan_001",
            verificationCode = "612847",
            description = "A classic Channapatna Gombe doll in vibrant red and gold. These dolls have been part of Karnataka's Dasara tradition for centuries and make for a meaningful cultural gift.",
            story = "Every year during Dasara, thousands of Gombe dolls are arranged in homes across Karnataka. This doll is Nagaraj's tribute to that tradition — a small keeper of memory, bright enough to light up any room.",
            rating = 4.9,
            isVerified = true
        ),
        Product(
            id = "prod_005",
            name = "Colorful Spinning Top",
            price = 9.99,
            category = "Toys",
            imageUrl = "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&q=80&auto=format&fit=crop",
            artisanId = "artisan_003",
            verificationCode = "382901",
            description = "A perfectly balanced spinning top hand-turned on a traditional lathe. When spun, the concentric rings of natural colour merge into a mesmerising swirl — pure physics and pure craft in one.",
            story = "The spinning top is Ravi's favourite piece to make. He says the secret is in the tip — a tiny brass point he hammers in himself. 'A bad tip,' he laughs, 'and the top dances drunk.'",
            rating = 4.5,
            isVerified = true
        ),
        Product(
            id = "prod_006",
            name = "Decorative Vase",
            price = 24.99,
            category = "Home Decor",
            imageUrl = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80&auto=format&fit=crop",
            artisanId = "artisan_002",
            verificationCode = "495673",
            description = "An elegant hand-painted vase by Shobha Devi. Featuring her signature floral motifs in gold, red and green on a cream base, this vase blends traditional Karnataka folk art with contemporary home decor sensibilities.",
            story = "Shobha paints each flower petal freehand, without a stencil. She says her mother taught her that a flower drawn with a ruler has no soul. Every petal on this vase was placed with a breath held and a steady hand.",
            rating = 4.7,
            isVerified = true
        )
    )

    val verificationCodes = listOf(
        VerificationCode(code = "847291", productId = "prod_001", artisanId = "artisan_001", status = "active"),
        VerificationCode(code = "731456", productId = "prod_002", artisanId = "artisan_003", status = "active"),
        VerificationCode(code = "956234", productId = "prod_003", artisanId = "artisan_001", status = "active"),
        VerificationCode(code = "612847", productId = "prod_004", artisanId = "artisan_001", status = "active"),
        VerificationCode(code = "382901", productId = "prod_005", artisanId = "artisan_003", status = "active"),
        VerificationCode(code = "495673", productId = "prod_006", artisanId = "artisan_002", status = "active"),
    )
}

fun findProductById(productId: String): Product? =
    MockData.products.firstOrNull { it.id == productId }

fun findArtisanById(artisanId: String): Artisan? =
    MockData.artisans.firstOrNull { it.id == artisanId }

fun findVerificationCode(code: String): VerificationCode? =
    MockData.verificationCodes.firstOrNull { it.code == code }
