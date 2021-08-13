const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const title = process.argv[3] || null
const author = process.argv[4] || null

// node mongo.js <password>
const mongoURI = `mongodb+srv://fullstack:${password}@cluster0.lsmd4.mongodb.net/blog?retryWrites=true`

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model("Blog", blogSchema);

if(!title || !author) {
    Blog.find({}).then((result) => {
        console.log("Blog:")
        result.forEach((blog) => {
            console.log(`${blog.title} ${blog.author}`)
        })
        mongoose.connection.close()
    }).catch((error) => {
        throw error
    })
} else {
    const blog = new Blog({
        title: title,
        author: author,
        url: null,
        likes: 0
    })
    blog.save().then(() => {
        console.info(`Added ${title} : ${author} to blog`)
        mongoose.connection.close()
    }).catch((error) => {
        throw error
    })
}