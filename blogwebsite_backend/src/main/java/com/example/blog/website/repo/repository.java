package com.example.blog.website.repo;

import com.example.blog.website.blogDocument.blogCollection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface repository extends MongoRepository<blogCollection,String> {

    blogCollection findByTitle(String title);

    void deleteByEmailAndTitle(String email, String title);


    blogCollection findByBlogid(String newId);


    blogCollection findByTitleAndEmail(String title, String email);



}
