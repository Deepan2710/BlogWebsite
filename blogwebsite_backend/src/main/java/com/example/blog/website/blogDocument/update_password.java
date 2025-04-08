package com.example.blog.website.blogDocument;

public class update_password {

    public String email;
    public String newPassword;
    public String confirmPassword;

    public update_password(String email,String newPassword,String confirmPassword){
        this.email=email;
        this.newPassword=newPassword;
        this.confirmPassword=confirmPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
