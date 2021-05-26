describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
      const user = {
        name: 'admin',
        username: 'root',
        password: 'secret'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3003')
    })

    it('Login form is shown', function() {
      cy.contains('Blog')
    })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('admin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('qwerty123')
      cy.get('#login-button').click()
      cy.contains('invalid username or password.')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'secret' })
    })

    it('A blog can be created', function() {
     cy.contains('new blog').click()
     cy.get('#title').type('new blog stuff')
     cy.get('#author').type('Tester')
     cy.get('#url').type('https://github.com')
     cy.get('#create-blog').click()
     cy.contains('view').click()
     cy.contains('new blog stuff')
    })
  })

  describe('When several blogs creaded by many people exist', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'secret' })
      cy.createBlog({ author: 'Tester', title: 'blog1', url: 'https://github.com' })
      cy.createBlog({ author: 'Tester', title: 'blog2', url: 'https://github.com' })
      cy.contains('logout').click()
      cy.login({ username: 'test', password: 'secret' })
      cy.createBlog({ author: 'Tester', title: 'blog3', url: 'https://github.com' })

      cy.contains('blog1').parent().parent().as('blog1')
      cy.contains('blog2').parent().parent().as('blog2')
      cy.contains('blog3').parent().parent().as('blog3')
    })

    it('Blogs can be liked', function() {
      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').contains('like').click()
      cy.get('@blog2').contains('likes: 1')
    })

    it('The creator can delete a blog', function() {
      cy.get('@blog3').contains('view').click()
      cy.get('@blog3').contains('remove').click()
      cy.contains('Blog: blog3')
      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').should('not.contain', 'remove')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.get('@like1').click()
      cy.get('@like1').click()
      cy.get('@like3').click()
      cy.get('@like3').click()
      cy.get('@like3').click()

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('likes 3')
        cy.wrap(blogs[1]).contains('likes 2')
        cy.wrap(blogs[2]).contains('likes 1')
      })
    })
  })
})