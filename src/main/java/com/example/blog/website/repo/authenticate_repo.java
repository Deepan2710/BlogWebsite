package com.example.blog.website.repo;

import com.example.blog.website.blogDocument.authentication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface authenticate_repo extends MongoRepository<authentication,String> {



  authentication findByEmailAndPassword(String email, String password);

}
