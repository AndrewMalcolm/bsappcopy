import { User } from './user';
import { Comment } from './comment';
import { userlist } from './userlist';
import { Article } from './article';
import { articlelist } from './articlelist';

export const commentlist: Comment[] = [
    {user: userlist[1],time:"11:34.22/01/2019",content:"testcomment: Do you see me?",article: articlelist[1]},
    {user: userlist[2],time:"11:36.22/01/2019",content:"testcomment: Yes, i see you",article: articlelist[1]},
    {user: userlist[0],time:"11:36.22/01/2019",content:"Created this new article",article: articlelist[0]}
];