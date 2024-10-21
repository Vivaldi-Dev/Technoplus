package com.example.autjwt.service;

import com.example.autjwt.dto.BlogDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface Blogservice {

    BlogDto createBlog(BlogDto blogDto);

    BlogDto getBlogById(Long id);

    BlogDto updateBlog(Long id, BlogDto blogDto);

    void deleteBlog(Long id);

    List<BlogDto> getallBlog();
}
