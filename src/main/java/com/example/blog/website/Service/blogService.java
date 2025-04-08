package com.example.blog.website.Service;

import com.example.blog.website.blogDocument.blogCollection;
import com.example.blog.website.blogDocument.user_blogs;
import com.example.blog.website.repo.repository;
import com.example.blog.website.repo.userANDblogs_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class blogService {
    @Autowired
    private repository repo;

    @Autowired
    public userANDblogs_repo userandblogs_repo;
    public blogCollection getBlogByTitle(String title) {
        return repo.findByTitle(title);
    }

    public ResponseEntity<?> addBlog(blogCollection blog){
        user_blogs existing = userandblogs_repo.findById(blog.getEmail()).orElse(null);
        System.out.println(blog.title);
        if (existing != null && existing.getBlog() != null) {
            for (ArrayList<String> b : existing.getBlog()) {
                System.out.println("get "+b.get(0)+" "+ blog.title);

                if (b.get(0).toLowerCase().equals(blog.title.toLowerCase())) {
                    System.out.println("equals");
                    return (ResponseEntity<?>) ResponseEntity.badRequest();

                }
            }
        }
        blog.blogid=generateUniqueBlogId();
        System.out.println("after"+blog.blogid);
        blogCollection blogs= repo.save(blog);
      user_blog(blogs);
        return ResponseEntity.ok(blogs);
    }
    public String generateUniqueBlogId() {
        Random rand = new Random();
        int newId;
         blogCollection get_blog;
        do {
            newId = rand.nextInt(Integer.MAX_VALUE);
            get_blog= repo.findByBlogid(Integer.toString(newId));
        } while (get_blog!=null);

        return Integer.toString(newId);
    }


    public List<blogCollection> all_blogs() {
        return repo.findAll();
    }


    public void user_blog(blogCollection blog) {
        ArrayList<String>arrl=new ArrayList<>();
        arrl.add(blog.title); arrl.add(blog.content); arrl.add(blog.blog_words);
        user_blogs existing_arrl = userandblogs_repo.findById(blog.getEmail()).orElse(null);
        System.out.println("existing check "+ existing_arrl);
        if(existing_arrl==null){
            ArrayList<ArrayList<String>> arrl2=new ArrayList<>();
            arrl2.add(arrl);
            user_blogs userANDblog=new user_blogs(blog.getEmail(),arrl2);
            userandblogs_repo.save(userANDblog);
        }
        else{
              existing_arrl.getBlog().add(arrl);
              userandblogs_repo.save(existing_arrl);
        }
    }

    public Optional<user_blogs> getuser_blogs(String email) {
        System.out.println("email");
        return userandblogs_repo.findById(email) ;
    }

    public void deleteByEmailAndTitle(String email, String title) {
//        userandblogs_repo.deleteByEmailAndTitle(email,title);
        System.out.println("delete");
        repo.deleteByEmailAndTitle(email,title);

        user_blogs exists_blogs=userandblogs_repo.findById(email).orElse(null);
        ArrayList<ArrayList<String>> arrl=exists_blogs.getBlog();
        for(int i=0;i<arrl.size();i++){
            System.out.println(arrl.get(i).get(0)+" "+title);
            if(arrl.get(i).get(0).equals(title)){
                System.out.println("came in");
                arrl.remove(i);

            }
        }
        exists_blogs.setBlog(arrl);
        userandblogs_repo.save(exists_blogs);

    }

    public boolean updateBlogByEmailAndTitle(String email, String title, blogCollection updatedBlog) {

        System.out.println("check here");
        blogCollection exist_blog = repo.findByTitleAndEmail(title,email);

        if (exist_blog!=null) {
            System.out.println("Found existing blog, updating...");
            blogCollection replace_blog=repo.findByBlogid(exist_blog.blogid);
             replace_blog.setTitle(updatedBlog.title);
            replace_blog.setBlog_words(updatedBlog.getBlog_words());
            replace_blog.setContent(updatedBlog.getContent());
            System.out.println("replace content");
            System.out.println(replace_blog.content);
            repo.save(replace_blog);
        }
            user_blogs existing_blog=userandblogs_repo.findById(email).orElse(null);
        ArrayList<ArrayList<String>> arrl=existing_blog.getBlog();
        for(ArrayList<String > USer_blog : arrl){
            System.out.println("here");
            if(USer_blog.get(0).equals(title)){
                USer_blog.set(0,updatedBlog.title);
                USer_blog.set(1,updatedBlog.content);
                USer_blog.set(2,updatedBlog.blog_words);
                System.out.println("check");
                userandblogs_repo.save(existing_blog);
                return true;
            }
        }

         return false;
    }

}
