package com.channapatna.nammapride.data

data class Product(
    val id: String = "",
    val name: String = "",
    val price: Double = 0.0,
    val category: String = "",
    val imageUrl: String = "",
    val artisanId: String = "",
    val verificationCode: String = "",
    val description: String = "",
    val story: String = "",
    val rating: Double = 0.0,
    val isVerified: Boolean = true,
)

data class Artisan(
    val id: String = "",
    val name: String = "",
    val bio: String = "",
    val location: String = "",
    val rating: Double = 0.0,
    val photoUrl: String = "",
    val specialty: String = "",
    val yearsExperience: Int = 0,
)

data class VerificationCode(
    val code: String = "",
    val productId: String = "",
    val artisanId: String = "",
    val status: String = "",
)
