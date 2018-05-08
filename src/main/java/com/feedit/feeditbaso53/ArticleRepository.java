package com.feedit.feeditbaso53;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArticleRepository extends PagingAndSortingRepository<Article, Long> {

    List<Article> findByTitleIgnoreCaseContaining(@Param("title") String title);
    Page<Article> findByUsernameid(@Param("usernameid") Long usernameid, Pageable p);
    Page<Article> findByTitleIgnoreCaseContainingAndUsernameid(@Param("title") String title, @Param("usernameid") Long usernameid, Pageable p);
}
