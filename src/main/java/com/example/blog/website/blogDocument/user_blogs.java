package com.example.blog.website.blogDocument;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
@Document
public class user_blogs {

    @Id
    public String email;
    public ArrayList<ArrayList<String>> blog=new ArrayList<>();

    public user_blogs(String email,ArrayList<ArrayList<String>>blog){
        this.email=email;
        this.blog=blog;
    }

    public ArrayList<ArrayList<String>> getBlog() {
        return blog;
    }

    public void setBlog(ArrayList<ArrayList<String>> blog) {
        this.blog = blog;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
