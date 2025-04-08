package com.example.blog.website.controller;

import com.example.blog.website.Service.authenticating;
import com.example.blog.website.blogDocument.authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class sign_in_controller {

    @Autowired
    public authenticating auth;

    @PostMapping("/signin")
    public void get_cred(@RequestBody authentication auth_detials){
        System.out.println(auth_detials);
          auth.save_detials(auth_detials);
    }
}
