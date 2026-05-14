package com.channapatna.nammapride.data

import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.tasks.await

class FirestoreRepository {

    private val db = FirebaseFirestore.getInstance()

    suspend fun getProducts(): List<Product> {
        return db.collection("products")
            .get()
            .await()
            .documents
            .mapNotNull { it.toObject(Product::class.java) }
    }

    suspend fun getArtisan(artisanId: String): Artisan? {
        // assume artisan documents use the artisan id as the document id
        return try {
            db.collection("artisans")
                .document(artisanId)
                .get()
                .await()
                .toObject(Artisan::class.java)
        } catch (e: Exception) {
            null
        }
    }

    suspend fun verifyCode(code: String): VerificationCode? {
        return db.collection("verificationCodes")
            .whereEqualTo("code", code)
            .get()
            .await()
            .documents
            .firstOrNull()
            ?.toObject(VerificationCode::class.java)
    }
}