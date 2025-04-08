package com.example.blog.website.controller;

import com.example.blog.website.Service.blogService;
import com.example.blog.website.blogDocument.blogCollection;
import com.example.blog.website.blogDocument.user_blogs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class blogController {

    @Autowired
    public blogService blogservice;

    List<blogCollection> list = new ArrayList<>();

    @GetMapping("/getallblogs")
    public List<blogCollection> getAllBlogs() {
        list = blogservice.all_blogs(); // assign the fetched list here
        System.out.println(list);
        return list;
    }

    @GetMapping("/blogs/{title}")
    public blogCollection getBlogByTitle(@PathVariable String title) {
        blogCollection blog = blogservice.getBlogByTitle(title);
       return blog;

    }

    @GetMapping("/getblogsbyemail/{email}")
    public Optional<user_blogs> getUserBlogs(@PathVariable String email) {
       return   blogservice.getuser_blogs(email);
    }


    @PostMapping ("/addblog")
    public void addBlog(@RequestBody blogCollection blog){

         blogservice.addBlog(blog);
    }

    @PutMapping("/updateblog/{email}/{title}")
    public ResponseEntity<String> updateBlog(
            @PathVariable String email,
            @PathVariable String title,
            @RequestBody blogCollection updatedBlog
    ) {
        boolean updated = blogservice.updateBlogByEmailAndTitle(email, title, updatedBlog);
        System.out.println(updated);
        if (updated) {
            return ResponseEntity.ok("Blog updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blog not found or could not be updated");
        }
    }


    @DeleteMapping("/deleteblog/{email}/{title}")
    public ResponseEntity<?> deleteBlog(@PathVariable String email, @PathVariable String title) {
        try {
            System.out.println("deleting");
            blogservice.deleteByEmailAndTitle(email, title);

            return ResponseEntity.ok("Blog deleted successfully.");
        } catch (Exception e) {
            return (ResponseEntity<?>) ResponseEntity.badRequest();
        }
    }

}
