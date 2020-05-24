package com.example.pandemino

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import com.google.firebase.auth.FirebaseAuth
import kotlinx.android.synthetic.main.activity_main.*

private val TAG = "MainActivity"

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)



        register_button_register.setOnClickListener {


            val username = username_edittext_register.text.toString()
            val email = email_edittext_register.text.toString()
            val password = password_edittext_register.text.toString()

            Log.d(TAG, "UTWORZONE KONTO: $username , $email, $password")

            FirebaseAuth.getInstance().createUserWithEmailAndPassword(email,password)
                .addOnCompleteListener {
                    if(!it.isSuccessful) return@addOnCompleteListener

                    Log.d(TAG,"NOWY UZYTKOWNIK O UID ${it.result?.user?.uid}")
                }
        }




    }
}
