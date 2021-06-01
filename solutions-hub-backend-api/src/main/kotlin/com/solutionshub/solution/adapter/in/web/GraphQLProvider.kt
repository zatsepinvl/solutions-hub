package com.solutionshub.solution.adapter.`in`.web

import org.springframework.stereotype.Component


@Component
class Query : GraphQLQueryResolver {
    private val postDao: PostDao? = null
    fun getRecentPosts(count: Int, offset: Int): List<Post> {
        return postsDao.getRecentPosts(count, offset)
    }
}