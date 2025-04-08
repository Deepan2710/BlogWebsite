package com.example.blog.website.repo;

import com.example.blog.website.blogDocument.user_blogs;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;

public interface userANDblogs_repo extends MongoRepository<user_blogs,String> {



    user_blogs findAllByEmail(String email);

}
