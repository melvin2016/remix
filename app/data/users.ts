// Types
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Geo {
    lat: string;
    lng: string;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface PostWithoutId {
    userId: number;
    title: string;
    body: string;
}

interface Post extends PostWithoutId {
    id: number;
}




/**
 * Get all the users
 */
const getUsers = async () => {
    const users = await fetch("https://jsonplaceholder.typicode.com/users");
    return users;
}

/**
 * Get a single user by id
 * @param id number
 */
const getUserById = async (id: number) => {
    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return user;
}

/**
 * Get all posts for a user
 * @param userId number
 */
const getPostsByUserId = async (userId: number) => {
    const userPosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return userPosts;
}

/**
 * Creates a post for a user
 * @param data PostWithoutId
 */
const createPostByUserId = async (data: PostWithoutId) => {
    const userCreatedPost = await fetch('https://jsonplaceholder.typicode.com/posts',
        {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    return userCreatedPost
}

export { getUsers, getUserById, getPostsByUserId, createPostByUserId };
export type { User, Post };