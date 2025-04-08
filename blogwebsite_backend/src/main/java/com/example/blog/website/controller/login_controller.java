package com.example.blog.website.controller;

import com.example.blog.website.Service.authenticating;
import com.example.blog.website.blogDocument.authentication;
import com.example.blog.website.blogDocument.update_password;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class login_controller {

    @Autowired
   public authenticating auth_login;

    @PostMapping("/login")
    public ResponseEntity<String> check(@RequestBody authentication auth) {
        String email = auth.email;
        String password = auth.password;

        int flag = auth_login.check_login(email, password, true);
        System.out.println("Login flag: " + flag);

        if (flag == 0) {
            return ResponseEntity.ok("/blog_add.html");
        } else if (flag == 1) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("no_account");
        } else if (flag == 2) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("done");
    }

    @PutMapping("/reset")
    public ResponseEntity<?> update_password(@RequestBody update_password up_details) {
        System.out.println("Email: ");
 String email=up_details.email;
            int flag = auth_login.update_password(email, up_details.newPassword, up_details.confirmPassword);
            if (flag == 1) {
                return ResponseEntity.ok("success");
            } else if (flag == 0) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("not_match");
            }
     else if(flag==2){
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("new_old");
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("account_exist");
            }
    }


}
