package com.example.blog.website.blogDocument;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class blogCollection {
    @Id
    public String blogid;
    public String title;
    public String content;
    public String blog_words;
    private String email; // added email field
     public String name;
    public blogCollection() {}

    public blogCollection(String blog_id,String title, String content, String blog_words, String email,String name) {

        this.blogid=blog_id;
        this.title = title;
        this.content = content;
        this.blog_words = blog_words;
        this.email = email;
        this.name=name;
    }

    public String getBlogid() {
        return blogid;
    }

    public void setBlogid(String blog_id) {
        this.blogid = blog_id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBlog_words() { return blog_words; }
    public void setBlog_words(String blog_words) { this.blog_words = blog_words; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
