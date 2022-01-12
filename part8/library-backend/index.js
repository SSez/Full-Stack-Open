const { ApolloServer, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { gql } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')

const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/book')

const pubsub = new PubSub()

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
})

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    user: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBirthYear: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`
let books

const fetchAuthor = async (name) => {
  let newAuthor = await Author.findOne({ name })
  if (!newAuthor) {
    newAuthor = new Author({ name })
    await newAuthor.save()
  }
  return newAuthor
}

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const query = {}
      if (author) {
        const getAuthor = await Author.findOne({ name: author })
        query.author = getAuthor.id
      }
      if (genre) {
        query.genres = { $in: [genre] }
      }
      return Book.find(query).populate('author')
    },
    allAuthors: async () => {
      books = await Book.find()
      return Author.find({})
    },
    user: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => books.filter(b => String(b.author) === String(root.id)).length
  },

  Mutation: {
    addBook: async (root, { title, author, published, genres }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let book = new Book({ title, published, genres })
      try {
        book.author = await fetchAuthor(author)
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { title, author, published, genres },
        })
      }

      book = await Book.findById(book.id).populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },

    editAuthor: async (root, { name, setBirthYear }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('error')
      }
      const author = await Author.findOne({ name })
      author.born = setBirthYear
      return author.save()
    },

    createUser: (root, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre })
      return user.save().catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }

  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})