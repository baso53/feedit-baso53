package com.feedit.feeditbaso53;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

public interface ArticleRepository extends PagingAndSortingRepository<Article, Long> {

    List<Article> findByTitleIgnoreCaseContaining(@Param("title") String title);

}
