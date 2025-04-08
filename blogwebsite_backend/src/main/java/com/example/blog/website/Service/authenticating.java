package com.example.blog.website.Service;

import com.example.blog.website.blogDocument.authentication;
import com.example.blog.website.repo.authenticate_repo;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.SearchStrategy;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class authenticating {

    @Autowired
    public authenticate_repo auth_repo;

    public ResponseEntity<?> save_detials(authentication authDetials) {
        System.out.println(authDetials.name);
        authentication existing_auth = auth_repo.findById(authDetials.email).orElse(null);
        System.out.println(existing_auth);
        if (existing_auth != null) {
            return (ResponseEntity<?>) ResponseEntity.badRequest();
        }
        auth_repo.save(authDetials);
        System.out.println("auth");
        return ResponseEntity.ok(authDetials);
    }

    public int check_login(String email, String password, boolean no_account) {
        authentication user = auth_repo.findByEmailAndPassword(email, password);
        authentication user_email = auth_repo.findById(email).orElse(null);

        if (user_email == null) {
            return 1;
        }

        if (user != null) {
            return 0;
        }

        return 2;
    }

    public int update_password(String email, String newpassword, String confirm_password) {
       authentication auth_det= auth_repo.findById(email).orElse(null);
     if(auth_det!=null && auth_det.password.equals(newpassword)){
         return 2;
     }
       else  if(auth_det!=null){
           if(newpassword.equals(confirm_password)) {
               System.out.println("same password");
               auth_det.setPassword(newpassword);
               auth_repo.save(auth_det);
               return 1;
           }
           else{
               return 0;
           }
       }
       if(auth_det==null){
           return -1;
       }
     return 0;
    }
}